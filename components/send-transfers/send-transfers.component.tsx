'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { BNBCoins, ETHCoins, GODCoins } from '@/mocks/mock-data';
import { useWeb3React } from '@web3-react/core';
import useSelectChain from '@/hooks/useSelectChain';
import useSyncChain from '@/hooks/useSyncChain';
import { filterEmptyToken, TOKENS, TokensMap } from '@/constants/tokens';
import { SupportedChainId } from '@/constants/chains';
import { formatNetworks } from '@/helpers/stringUtils';

import {
  geTokensByChainId,
  getChainNameById,
  buildQuery,
  getHumanValue,
  getNonHumanValue,
} from '@/utils';

import { MULTISEND_DIFF_DIFF_TOKEN } from '@/constants/queryKeys';
import { useMultiSendContract } from '@/hooks/useContract';
import useTokenData from '@/hooks/useTokenData';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { AlertComponent } from '../alert/alert';
import { useDispatch } from 'react-redux';
import { updateConnectionError } from '@/state/connection/reducer';
import { getConnection } from '@/connection/utils';

const NETWORK_SELECTOR_CHAINS = [
  SupportedChainId.BSC,
  SupportedChainId.BSC_TEST,
  // SupportedChainId.MAINNET,
  // SupportedChainId.POLYGON,
  // SupportedChainId.POLYGON_MUMBAI,
  // SupportedChainId.OPTIMISM,
  // SupportedChainId.ARBITRUM_ONE,
  // SupportedChainId.CELO,
];

const wallets = ['0x75FDDa48740D0ED4906e247F84442841EFc270dF'];
const amounts = ['0.005'];

interface TransfersProps {
  title: string;
  transactionData: any;
  handleUploadModal: () => void;
  setTransactionSuccessMessage: () => void;
  setSelectedRows: () => void;
}

const searchCurrentNetwork = (networkId: number | null): any => {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return ETHCoins;
    case SupportedChainId.BSC:
      return BNBCoins;
    case SupportedChainId.BSC_TEST:
      return BNBCoins;
    default:
      return [];
  }
};

export const SendTransferComponent: FunctionComponent<any> = ({
  title,
  handleUploadModal,
  setSelectedRows,
  transactionData,
}: TransfersProps) => {
  const { chainId, provider, account, connector } = useWeb3React();
  const selectChain = useSelectChain();
  useSyncChain();
  const [tokens, setTokens] = useState<TokensMap[SupportedChainId] | null>(null);
  const [tokenAddress, setTokenAddress] = useState<any>({});
  const [transactionSuccessMessage, setTransactionSuccessMessage] = useState('');
  const error = useSelector(
    ({ connection }: any) =>
      connection?.errorByConnectionType?.WALLET_CONNECT ||
      connection?.errorByConnectionType?.INJECTED ||
      connection?.errorByConnectionType?.UNPREDICTABLE_GAS_LIMIT,
  );
  const connectionType = getConnection(connector).type;

  const dispatch = useDispatch();

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

  const { approve, isAllowed, refetchAllowance, tokenDecimals } = useTokenData(
    tokenAddress.address,
  );

  const {
    multiSendDiffToken: multiSendDiffTokenQuery,
    estimateGas: { multiSendDiffToken: multiSendDiffTokenEstimate },
  } = useMultiSendContract();

  const {
    mutateAsync: multiSendDiffToken,
    error: hookErrors,
    isError,
  } = useMutation(
    `${MULTISEND_DIFF_DIFF_TOKEN}_${tokenAddress.address}`,
    ({
      employeesWallets,
      employeesParsedAmounts,
    }: {
      employeesWallets: string[];
      employeesParsedAmounts: string[];
    }): Promise<any> =>
      buildQuery(
        multiSendDiffTokenQuery,
        [employeesWallets, employeesParsedAmounts, tokenAddress.address],
        multiSendDiffTokenEstimate,
      ),
    {
      onError: (err) => console.log(err, `${MULTISEND_DIFF_DIFF_TOKEN}_${tokenAddress.address}`),
    },
  );

  const sendTransfer = async () => {
    console.log({ account });
    console.log({ isAllowed });

    if (!account) {
      alert('wallet not connected');
      return;
    }

    if (!isAllowed) {
      await approve();
      refetchAllowance();
    }

    const employeesParsedAmounts = transactionData.amount.map((amount: any) =>
      getNonHumanValue(amount, tokenDecimals).toString(),
    );

    const tx = await multiSendDiffToken({
      employeesWallets: transactionData.wallets,
      employeesParsedAmounts,
    });

    if (tx?.wait) {
      const receipt = await tx.wait();

      if (receipt) {
        setTransactionSuccessMessage('Transaction success');
      }

      if (provider) {
        const _ = (await provider.getBalance(account)).toString();
      }
    } else {
      dispatch(updateConnectionError({ connectionType, error: tx.message }));
    }
  };

  const handleCloseAlert = () => {
    if (!connector) return;

    dispatch(updateConnectionError({ connectionType, error: undefined }));
  };

  const handleSuccessAlert = () => {
    setTransactionSuccessMessage('');
  };

  return (
    <Grid container mt={5}>
      <Stack mb={3} sx={{ width: '100%' }}>
        <Typography>{title}</Typography>
      </Stack>
      {error && (
        <Stack mb={3} sx={{ width: '100%' }}>
          <AlertComponent onClose={handleCloseAlert} severity="error">
            {error}
          </AlertComponent>
        </Stack>
      )}
      {transactionSuccessMessage && (
        <Stack mb={3} sx={{ width: '100%' }}>
          <AlertComponent onClose={handleSuccessAlert} severity="success">
            {transactionSuccessMessage}
          </AlertComponent>
        </Stack>
      )}

      <Grid item container alignItems="center" spacing={2}>
        <Grid sx={{ display: { xs: 'none', sm: 'grid', md: ' grid' } }} item xs={6} sm={3} md={1.5}>
          <Button
            sx={{ fontSize: { xs: '10px', md: '12px' } }}
            fullWidth
            onClick={handleUploadModal}
            variant="contained"
          >
            Upload
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel id="wallet-address-label">Network</InputLabel>
            <Select
              labelId="wallet-address-label"
              id="wallet-address"
              name="serviceType"
              value={`${chainId ? chainId : ''}`}
              onChange={(event) => setNetwork(+event.target.value)}
              label="Network"
              disabled={!chainId}
            >
              {NETWORK_SELECTOR_CHAINS?.map((chain, i) => (
                <MenuItem key={chain} value={chain}>
                  {formatNetworks(getChainNameById(chain))}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid sx={{ display: { xs: 'grid', sm: 'none', md: ' none' } }} item xs={6} sm={3} md={1.5}>
          <Button fullWidth onClick={handleUploadModal} variant="contained">
            Upload
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Coins</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Coins"
              placeholder="Coins"
              // value={token}
              onChange={(event) => setTokenAddress(event.target.value)}
            >
              {tokens?.map((token, i) => (
                <MenuItem key={`token-${i}`} value={token as any}>
                  {token.symbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={2}>
          <Button
            sx={{ fontSize: { xs: '10px', md: '12px' } }}
            fullWidth
            variant="contained"
            disabled={!(chainId && tokenAddress.address && transactionData.wallets.length)}
            onClick={sendTransfer}
          >
            Make a transfer
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
