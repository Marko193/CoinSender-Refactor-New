import { useMultiSendContract } from '@/hooks/useContract';
import { buildQuery, getNonHumanValue, geTokensByChainId } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Wallet from '../Wallet/wallet.component';
import styles from './transfer.module.scss';
import { useMutation } from 'react-query';
import { TOKENS } from '@/constants/tokens';

const wallets = [
  '0x91Bbc2A6C3C7006e26Cd1CF6e27B0FeBA94377cE',
  // '0x91Bbc2A6C3C7006e26Cd1CF6e27B0FeBA94377cE,0x519af7175AccA8976DF567dA46b4aFb0C5201303',
];
const amounts = ['0.1'];
// const amounts = ['0.5', '0.5'];

const Transfer = () => {
  const { account, chainId, provider } = useWeb3React();

  const [tokens, setTokens] = useState<{ address: string; name: string }[] | null>(null);

  const [tokenAddress, setTokenAddress] = useState<string>('');

  useEffect(() => {
    if (chainId) {
      setTokens(geTokensByChainId(TOKENS, chainId));
    }
  }, [chainId]);

  useEffect(() => {
    if (tokens) {
      setTokenAddress(tokens[0].address);
    }
  }, [tokens]);

  const {
    multiSendDiffToken: multiSendDiffTokenQuery,
    estimateGas: { multiSendDiffToken: multiSendDiffTokenEstimate },
  } = useMultiSendContract();

  const { mutateAsync: multiSendDiffToken } = useMutation(
    `multiSendDiffEth2`,
    ({
      employeesWallets,
      employeesParsedAmounts,
    }: {
      employeesWallets: string[];
      employeesParsedAmounts: number[];
    }): Promise<any> =>
      buildQuery(
        multiSendDiffTokenQuery,
        [employeesWallets, employeesParsedAmounts, tokenAddress],
        multiSendDiffTokenEstimate,
      ),
    {
      onError: (err) => console.log(err, `multiSendDiffEth2`),
    },
  );

  const sendTransfer = async () => {
    if (!account) {
      alert('wallet not connected');
      return;
    }

    const employeesWallets = wallets.map((wallet) => wallet);

    const employeesParsedAmounts = amounts.map((amount) => +getNonHumanValue(amount, 10));

    const tx = await multiSendDiffToken({ employeesWallets, employeesParsedAmounts });

    const receipt = await tx.wait();

    console.log('receipt', receipt);

    if (provider) {
      const balance = (await provider.getBalance(account)).toString();
      console.log('balance', balance);
    }
  };

  return (
    <div className={styles.container}>
      <Wallet />
      <div className={styles.transfer}>
        {tokens ? (
          <select onChange={(event) => setTokenAddress(event.target.value)} name="tokens">
            {tokens?.map((token, i) => (
              <option key={i} value={token.address}>
                {token.name}
              </option>
            ))}
          </select>
        ) : null}
        <button onClick={sendTransfer}>Make a transfer</button>
      </div>
    </div>
  );
};

export default Transfer;
