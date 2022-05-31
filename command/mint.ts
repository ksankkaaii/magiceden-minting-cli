#!/usr/bin/env ts-node
import { InvalidArgumentError, program } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import log from 'loglevel';
import axios from 'axios'

import * as anchor from '@project-serum/anchor';
import { PublicKey, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js';

import {
  startProcessing
} from './../helpers/helpers';

import { MintToken, MintMEToken, loadWalletKey } from './../utils/Solana';
import {
  ENVIRONMENT,
  SERVER_URL,
  CORS_PROXY_API,
  MAGICEDEN_API,
  DEFAULT_RPC_API
} from "./../config/prod"

const setLogLevel = (value: any, prev:any) => {
  if (value === undefined || value === null) {
    return;
  }
  log.setLevel(value);
  log.info('\nSetting the log value to: ' + value + `\n`);
}

const programCommand = (name: string) => {

  let cmProgram = program.command(name)
                  .requiredOption(
                    '-k, --keypair <string>',
                    'Solana wallet location'
                  ).requiredOption(
                    '-m, --machine <string>',
                    `Machine ID`
                  ).requiredOption(
                    '-p, --platform <string>',
                    `CandyMachine2 or MagicEden`
                  );

  return cmProgram;
}

const scrapeMEInfo = async (candyMachineId: any) => {

  try{
      let meInfo = await axios({
          method: 'get',
          url: `${CORS_PROXY_API}https://api-mainnet.magiceden.io/launchpad_collections`
      });
      for (let i = 0; i < meInfo.data.length; i++) {
          if (meInfo.data[i]?.mint && meInfo.data[i]?.mint?.candyMachineId && meInfo.data[i]?.mint?.candyMachineId == candyMachineId) {
              return {
                state: true,
                data: meInfo.data[i]
              }
          }
      }
  }
  catch(error: any) {
    return {
      state: false,
      data: error.message
    }
  }
  return {
    state: false,
    data: 'Not found collection. Please check the collection ID.'
  }
}

const minting = async (walletKeyPair: anchor.web3.Keypair, platform: string, machine: string) => {
  startProcessing(`Getting machine........`);
    
  switch (platform) {
    case 'CMV2':
        const cmv2MintTokenResponse = await MintToken(machine, DEFAULT_RPC_API, false, walletKeyPair.secretKey);
        return cmv2MintTokenResponse;
    case 'MEL':
        const meInfo = await scrapeMEInfo(machine);
        if(!meInfo.state) {
            return {
                state: false,
                txn: null,
                msg: meInfo.data
            };
        }

        return await MintMEToken(machine, DEFAULT_RPC_API, walletKeyPair.secretKey);
    default:
        return {
            state: 0,
            txn: null,
            msg: `Invalid Platform. Please select platform correctly.`
        };
  }
}

program.version('0.0.2');
setLogLevel(2,2);

programCommand('mint')
  .action(async (options, cmd) => {
    const {
      keypair,
      platform,
      machine
    } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);

    if(platform && machine) {
      const res = await minting(walletKeyPair, platform, machine);
      if(res.state == true) {
        log.info(res.msg? res.msg : `Sorry, Unexpected error! Please try again later.`);
      }
      else {
        log.error(res.msg? res.msg : `Sorry, Unexpected error! Please try again later.`);
      }
    }
    else {
      log.error(`\nError: Invalid Input!\n`);
    }
    process.exit(1);
  });

program.parse(process.argv);
