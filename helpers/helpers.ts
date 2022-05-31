import {
  Keypair,
  PublicKey,
  SystemProgram,
  AccountInfo,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

import * as anchor from '@project-serum/anchor';
import fs from 'fs';

import { web3 } from '@project-serum/anchor';
import log from 'loglevel';
import { AccountLayout, u64 } from '@solana/spl-token';

export function parsePrice(price: string, mantissa: number = LAMPORTS_PER_SOL) {
  return Math.ceil(parseFloat(price) * mantissa);
}

export function startProcessing(message: string = ``) {
  log.info(message ? `\n${message}\n` : `\nProcessing...\n`);
}