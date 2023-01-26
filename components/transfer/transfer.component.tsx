import { geTokensByChainId, getChainNameById } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import styles from './transfer.module.scss';

import { TOKENS, TokensMap } from '@/constants/tokens';
import { SupportedChainId } from '@/constants/chains';
import useSelectChain from '@/hooks/useSelectChain';
import useSyncChain from '@/hooks/useSyncChain';

const NETWORK_SELECTOR_CHAINS = [
  SupportedChainId.BSC,
  SupportedChainId.BSC_TEST,
  SupportedChainId.MAINNET,
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.OPTIMISM,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.CELO,
];

const Transfer = () => {
  const { account, chainId, provider } = useWeb3React();

  const selectChain = useSelectChain();

  useSyncChain();

  const [tokens, setTokens] = useState<TokensMap[SupportedChainId] | null>(null);

  const [tokenAddress, setTokenAddress] = useState<string>('');

  const setNetwork = async (targetChainId: SupportedChainId) => {
    await selectChain(targetChainId);
  };

  useEffect(() => {
    if (chainId) {
      setTokens(geTokensByChainId(TOKENS, chainId));
    }
  }, [chainId]);

  useEffect(() => {
    if (tokens && tokens.length) {
      setTokenAddress(tokens[0].address);
    }
  }, [tokens]);

  return (
    <div className={styles.container}>
      <div className={styles.transfer}>
        {account ? (
          <select onChange={(event) => setNetwork(+event.target.value)} name="tokens">
            {NETWORK_SELECTOR_CHAINS?.map((chain, i) => (
              <option key={chain} value={chain}>
                {getChainNameById(chain)}
              </option>
            ))}
          </select>
        ) : null}
        {account && tokens && tokens.length ? (
          <select onChange={(event) => setTokenAddress(event.target.value)} name="tokens">
            {tokens?.map((token, i) => (
              <option key={i} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
        ) : null}
        {account && tokens && tokens.length ? (
          <button onClick={sendTransfer}>{isAllowed ? 'Make a transfer' : 'Approve'}</button>
        ) : null}
      </div>
    </div>
  );
};

export default Transfer;
