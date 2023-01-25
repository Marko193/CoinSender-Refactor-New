import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

import useSelectChain from './useSelectChain';

export default function useSyncChain() {
  const { chainId } = useWeb3React();

  const selectChain = useSelectChain();

  useEffect(() => {
    if (chainId) {
      selectChain(chainId);
    }
  }, [chainId]);
}
