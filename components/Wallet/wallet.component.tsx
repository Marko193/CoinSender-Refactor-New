'use client';

import { CONNECTIONS, getConnection, getConnectionName } from '@/connection/utils';
import {
  coinbaseWalletConnection,
  injectedConnection,
  walletConnectConnection,
} from '@/connection';
import { useWeb3React } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import Image from 'next/image';
import styles from './wallet.module.scss';
import { updateSelectedWallet } from '@/state/user/reducer';
import { updateConnectionError } from '@/state/connection/reducer';
import { useAppDispatch } from '@/state/hooks';
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { makeShortenWalletAddress } from '@/helpers/stringUtils';
import MetamaskLogo from '@/assets/wallet-icons/metamask.svg';
import WalletConnectLogo from '@/assets/wallet-icons/wallet-connect.svg';
import CoinbaseLogo from '@/assets/wallet-icons/coinbase.svg';
// import { isMobile } from 'utils/userAgent';

const Wallet = () => {
  const { connector, account } = useWeb3React();

  const dispatch = useAppDispatch();

  function getOptions() {
    // if (isMobile) {
    //   return [walletConnectConnection, coinbaseWalletConnection];
    // }

    return [injectedConnection, walletConnectConnection, coinbaseWalletConnection];
  }

  const tryActivation = async (walletConnector: Connector) => {
    const connectionType = getConnection(walletConnector).type;

    try {
      dispatch(updateConnectionError({ connectionType, error: undefined }));
      await walletConnector.activate();
      dispatch(updateSelectedWallet({ wallet: connectionType }));
    } catch (error: any) {
      console.debug(`web3-react connection error: ${error}`);
      dispatch(updateConnectionError({ connectionType, error: error.message }));
    }
  };

  const disconnectHandler = () => {
    if (connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();
    dispatch(updateSelectedWallet({ wallet: undefined }));
  };

  return (
    <div>
      <Stack gap={1} mb={3}>
        <Typography fontSize="24px" textAlign="center">
          Connect your wallet
        </Typography>
        <Typography fontSize="14px" textAlign="center">
          In order for you to use all the advantages of our service, connect your wallet to your
          account
        </Typography>
      </Stack>
      <Stack flexDirection="column" gap={2}>
        {!account ? (
          <>
            {getOptions().map((walletConnector, i) => {
              return (
                <Stack key={`wallet-button-${i}`}>
                  <Button
                    sx={{ display: 'flex', justifyContent: 'start', gap: 2 }}
                    size="large"
                    variant="outlined"
                    onClick={() => tryActivation(walletConnector.connector)}
                  >
                    {getConnectionName(walletConnector.type) === 'MetaMask' && (
                      <Image src={MetamaskLogo} alt="Metamask" />
                    )}
                    {getConnectionName(walletConnector.type) === 'WalletConnect' && (
                      <Image src={WalletConnectLogo} alt="Wallet Connect" />
                    )}
                    {getConnectionName(walletConnector.type) === 'Coinbase Wallet' && (
                      <Image src={CoinbaseLogo} alt="Wallet Connect" />
                    )}
                    Connect {getConnectionName(walletConnector.type)}
                  </Button>
                </Stack>
              );
            })}
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            Disconnect:
            <Button size="small" onClick={disconnectHandler}>
              {makeShortenWalletAddress(account)}
            </Button>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default Wallet;
