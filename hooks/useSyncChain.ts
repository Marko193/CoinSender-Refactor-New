import { getConnection } from '@/connection/utils';
import { DEFAULT_CHAIN_ID, isSupportedChain } from 'constants/chains';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

import useSelectChain from './useSelectChain';
import { updateConnectionError } from '@/state/connection/reducer';
import { useAppDispatch } from '@/state/hooks';

export default function useSyncChain() {
  const { chainId, connector } = useWeb3React();

  const selectChain = useSelectChain();

  const connectionType = getConnection(connector).type;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chainId) {
      // only for prod with BSC only network
      if (chainId !== DEFAULT_CHAIN_ID) {
        selectChain(DEFAULT_CHAIN_ID);
        return;
      }
      if (!isSupportedChain(chainId)) {
        dispatch(updateConnectionError({ connectionType, error: `Network not supported` }));
        return;
      }
      selectChain(chainId);
    }
  }, [chainId]);
}
