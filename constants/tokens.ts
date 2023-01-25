import { SupportedChainId } from './chains';

export const DEFAULT_ERC20_DECIMALS = 18;

export interface TokensMap {
  [chainId: number]: { address: string; name: string; decimals: number; symbol?: string }[];
}

export const TOKENS: TokensMap = {
  [SupportedChainId.BSC]: [],
  [SupportedChainId.BSC_TEST]: [],
  [SupportedChainId.MAINNET]: [],
  [SupportedChainId.POLYGON]: [],
  [SupportedChainId.OPTIMISM]: [],
  [SupportedChainId.ARBITRUM_ONE]: [],
  [SupportedChainId.CELO]: [],
  [SupportedChainId.BSC_TEST]: [
    {
      address: '0x64544969ed7EBf5f083679233325356EbE738930',
      symbol: 'USDC',
      name: 'USDC Token',
      decimals: 18,
    },
    {
      address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
      symbol: 'USDT',
      name: 'USDT Token',
      decimals: 18,
    },
  ],
};
