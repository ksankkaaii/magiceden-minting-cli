const ENVIRONMENT = "production";
const SERVER_URL = "https://cmbot-3dboogles-server-tomas.herokuapp.com";

const CORS_PROXY_API = `https://hades.ksanalex.workers.dev?u=`;
const CORS_BUY_PROXY = `https://me-cli.boogle-cors.workers.dev/`;

const MAGICEDEN_API = {
    POPULAR_COLLECTION : 'https://api-mainnet.magiceden.io/popular_collections?timeRange=1d&edge_cache=true',
    NEW_COLLECTION: `https://api-mainnet.magiceden.io/new_collections`,
    ALL_COLLECTION: `https://api-mainnet.magiceden.io/all_collections_with_escrow_data`,
    COLLECTION: `https://api-mainnet.magiceden.io/collections/`,
    COLLECTION_DETAIL: `https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/`,
    NFTS: `https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q=`,
    ITEMDETAIL:`https://api-mainnet.magiceden.io/rpc/getGlobalActivitiesByQuery?q=`,
    BUY_V2: `https://api-mainnet.magiceden.io/v2/instructions/buy_now?`,
};
const DEFAULT_RPC_API = `https://phantasia.genesysgo.net/`;

export {
  ENVIRONMENT,
  SERVER_URL,
  CORS_PROXY_API,
  CORS_BUY_PROXY,
  MAGICEDEN_API,
  DEFAULT_RPC_API
}