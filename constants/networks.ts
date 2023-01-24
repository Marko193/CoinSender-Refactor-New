import { SupportedChainId } from './chains';

/**
 * Fallback JSON-RPC endpoints.
 * These are used if the integrator does not provide an endpoint, or if the endpoint does not work.
 *
 * MetaMask allows switching to any URL, but displays a warning if it is not on the "Safe" list:
 * https://github.com/MetaMask/metamask-mobile/blob/bdb7f37c90e4fc923881a07fca38d4e77c73a579/app/core/RPCMethods/wallet_addEthereumChain.js#L228-L235
 * https://chainid.network/chains.json
 *
 * These "Safe" URLs are listed first, followed by other fallback URLs, which are taken from chainlist.org.
 */
export const FALLBACK_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: [
    // "Safe" URLs
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
  ],
  [SupportedChainId.POLYGON]: [
    // "Safe" URLs
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
  ],
  [SupportedChainId.POLYGON_MUMBAI]: [
    // "Safe" URLs
    'https://matic-mumbai.chainstacklabs.com',
    'https://rpc-mumbai.maticvigil.com',
    'https://matic-testnet-archive-rpc.bwarelabs.com',
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    // "Safe" URLs
    'https://arb1.arbitrum.io/rpc',
    // "Fallback" URLs
    'https://arbitrum.public-rpc.com',
  ],
  [SupportedChainId.ARBITRUM_RINKEBY]: [
    // "Safe" URLs
    'https://rinkeby.arbitrum.io/rpc',
  ],
  [SupportedChainId.OPTIMISM]: [
    // "Safe" URLs
    'https://mainnet.optimism.io/',
    // "Fallback" URLs
    'https://rpc.ankr.com/optimism',
  ],
  [SupportedChainId.OPTIMISM_GOERLI]: [
    // "Safe" URLs
    'https://goerli.optimism.io',
  ],
  [SupportedChainId.CELO]: [
    // "Safe" URLs
    `https://forno.celo.org`,
  ],
  [SupportedChainId.CELO_ALFAJORES]: [
    // "Safe" URLs
    `https://alfajores-forno.celo-testnet.org`,
  ],
  [SupportedChainId.BSC]: [
    // "Safe" URLs
    `https://bsc-dataseed1.defibit.io`,
    `https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3`,
    `https://rpc-bsc.bnb48.club`,
    `https://bsc-dataseed4.binance.org`,
    `https://bsc-dataseed1.binance.org/`,
  ],
  [SupportedChainId.BSC_TEST]: [
    // "Safe" URLs
    `https://data-seed-prebsc-1-s3.binance.org:8545/`,
    `https://data-seed-prebsc-2-s3.binance.org:8545`,
    `https://bsc-testnet.public.blastapi.io`,
    `https://endpoints.omniatech.io/v1/bsc/testnet/public`,
    `https://data-seed-prebsc-2-s1.binance.org:8545`,
  ],
};

/**
 * Known JSON-RPC endpoints.
 * These are the URLs used by the interface when there is not another available source of chain data.
 */
export const RPC_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: [...FALLBACK_URLS[SupportedChainId.MAINNET]],
  [SupportedChainId.OPTIMISM]: [...FALLBACK_URLS[SupportedChainId.OPTIMISM]],
  [SupportedChainId.OPTIMISM_GOERLI]: [...FALLBACK_URLS[SupportedChainId.OPTIMISM_GOERLI]],
  [SupportedChainId.ARBITRUM_ONE]: [...FALLBACK_URLS[SupportedChainId.ARBITRUM_ONE]],
  [SupportedChainId.ARBITRUM_RINKEBY]: [...FALLBACK_URLS[SupportedChainId.ARBITRUM_RINKEBY]],
  [SupportedChainId.POLYGON]: [...FALLBACK_URLS[SupportedChainId.POLYGON]],
  [SupportedChainId.POLYGON_MUMBAI]: [...FALLBACK_URLS[SupportedChainId.POLYGON_MUMBAI]],
  [SupportedChainId.CELO]: FALLBACK_URLS[SupportedChainId.CELO],
  [SupportedChainId.CELO_ALFAJORES]: FALLBACK_URLS[SupportedChainId.CELO_ALFAJORES],
  [SupportedChainId.BSC]: FALLBACK_URLS[SupportedChainId.BSC],
  [SupportedChainId.BSC_TEST]: FALLBACK_URLS[SupportedChainId.BSC_TEST],
};
