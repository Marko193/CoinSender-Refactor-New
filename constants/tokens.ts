import { SupportedChainId } from './chains';

export const DEFAULT_ERC20_DECIMALS = 18;

export interface TokensMap {
  [chainId: number]: { address: string; name: string }[];
}

export const TOKENS: TokensMap = {
  [SupportedChainId.BSC_TEST]: [
    { address: '0x3084f20bd972Cec3d4Ba5561B91F9761844Dcd04', name: 'tPol' },
    { address: '0xF813970f9d18a8E8260D902F1719d47B707327A9', name: 'black' },
  ],
};
