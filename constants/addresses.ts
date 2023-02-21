import { SupportedChainId } from './chains';

export type AddressMap = { [chainId: number]: string };

export const MULTI_SEND_CONTRACTS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  [SupportedChainId.OPTIMISM]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  // [SupportedChainId.OPTIMISM_GOERLI]: '',
  // [SupportedChainId.ARBITRUM_ONE]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  // [SupportedChainId.ARBITRUM_RINKEBY]: '',
  [SupportedChainId.POLYGON]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  // [SupportedChainId.POLYGON_MUMBAI]: '',
  [SupportedChainId.CELO]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  // [SupportedChainId.CELO_ALFAJORES]: '',
  [SupportedChainId.BSC]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  // [SupportedChainId.BSC_TEST]: '0x45Bb2366E0b43e1e45aDb7128C0150339FCc4729',
  [SupportedChainId.AVALANCHE]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  [SupportedChainId.GODWOKEN]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  // [SupportedChainId.GODWOKEN]: '0xA4b86a26A1C6751D9dc320416F30ff2fcbCdC946',
  [SupportedChainId.FANTOM]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  [SupportedChainId.GNOSIS]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  [SupportedChainId.MOONBEAM]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  [SupportedChainId.OASIS_EMERALD]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
  // [SupportedChainId.FUSE]: '0x1bb79e75a062ff90F8E79FE281f41324C3052afc',
};
