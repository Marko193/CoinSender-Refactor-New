'use client';

import { CONNECTIONS, getConnection, getConnectionName } from '@/connection/utils';
import {
  coinbaseWalletConnection,
  injectedConnection,
  walletConnectConnection,
} from '@/connection';
import { useWeb3React } from '@web3-react/core';
import { Connector } from '@web3-react/types';

import styles from './wallet.module.scss';
import { updateSelectedWallet } from '@/state/user/reducer';
import { updateConnectionError } from '@/state/connection/reducer';
import { useAppDispatch } from '@/state/hooks';
import { Button, ButtonGroup } from '@mui/material';
import dynamic from 'next/dynamic';
import { makeShortenWalletAddress } from '@/helpers/stringUtils';
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
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {!account ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',

              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            <span style={{ marginRight: '5px' }}>Connect with:</span>
            {getOptions().map((walletConnector, i) => {
              return (
                <Button
                  size="small"
                  key={`wallet-button-${i}`}
                  onClick={() => tryActivation(walletConnector.connector)}
                >
                  {getConnectionName(walletConnector.type)}
                </Button>
              );
            })}
          </div>
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
      </ButtonGroup>
    </div>
  );
};

export default Wallet;
