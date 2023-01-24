import { Connector } from '@web3-react/types';
import { networkConnection, walletConnectConnection } from 'connection';
import { getChainInfo } from 'constants/chainInfo';
import { isSupportedChain, SupportedChainId } from 'constants/chains';
import { FALLBACK_URLS, RPC_URLS } from 'constants/networks';

function getRpcUrl(chainId: SupportedChainId): string {
  switch (chainId) {
    case SupportedChainId.MAINNET:
    case SupportedChainId.BSC:
    case SupportedChainId.BSC_TEST:
    case SupportedChainId.POLYGON:
    case SupportedChainId.POLYGON_MUMBAI:
      return RPC_URLS[chainId][0];

    default:
      return FALLBACK_URLS[chainId][0];
  }
}

export const switchChain = async (connector: Connector, chainId: SupportedChainId) => {
  if (!isSupportedChain(chainId)) {
    throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`);
  } else if (
    connector === walletConnectConnection.connector ||
    connector === networkConnection.connector
  ) {
    await connector.activate(chainId);
  } else {
    const info = getChainInfo(chainId);
    const addChainParameter = {
      chainId,
      chainName: info.label,
      rpcUrls: [getRpcUrl(chainId)],
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer],
    };
    await connector.activate(addChainParameter);
  }
};
