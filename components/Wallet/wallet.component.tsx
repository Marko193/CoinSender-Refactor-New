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
    <>
      {!account ? (
        <ul>
          {getOptions().map((walletConnector, i) => {
            return (
              <li key={i}>
                <button onClick={() => tryActivation(walletConnector.connector)}>
                  Connect {getConnectionName(walletConnector.type)}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <div>{account}</div>
          <button onClick={disconnectHandler}>Disconnect</button>
        </>
      )}
    </>
  );
};

export default Wallet;
