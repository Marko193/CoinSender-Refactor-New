'use client';

import { getConnection, getConnectionName } from '@/connection/utils';
import {
  coinbaseWalletConnection,
  injectedConnection,
  walletConnectConnection,
} from '@/connection';
import { useWeb3React } from '@web3-react/core';
import { Connector } from '@web3-react/types';

import { updateSelectedWallet } from '@/state/user/reducer';
import { updateConnectionError } from '@/state/connection/reducer';
import { useAppDispatch } from '@/state/hooks';
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';

// import { isMobile } from 'utils/userAgent';

const Wallet = () => {
  const { account } = useWeb3React();

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
                  <Button size="large" onClick={() => tryActivation(walletConnector.connector)}>
                    {getConnectionName(walletConnector.type)}
                  </Button>
                </Stack>
              );
            })}
          </>
        ) : null}
      </Stack>
    </div>
  );
};

export default Wallet;
