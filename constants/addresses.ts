import { SupportedChainId } from './chains';

export type AddressMap = { [chainId: number]: string };

export const MULTI_SEND_CONTRACTS: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.OPTIMISM]: '',
  [SupportedChainId.OPTIMISM_GOERLI]: '',
  [SupportedChainId.ARBITRUM_ONE]: '',
  [SupportedChainId.ARBITRUM_RINKEBY]: '',
  [SupportedChainId.POLYGON]: '',
  [SupportedChainId.POLYGON_MUMBAI]: '',
  [SupportedChainId.CELO]: '',
  [SupportedChainId.CELO_ALFAJORES]: '',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSC_TEST]: '0x9bf8b59323097d4db3bd4368d01c8fe8598b48b2',
};
