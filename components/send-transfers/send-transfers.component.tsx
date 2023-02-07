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
  Tooltip,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import useSelectChain from '@/hooks/useSelectChain';
import useSyncChain from '@/hooks/useSyncChain';
import { TOKENS, TokensMap } from '@/constants/tokens';
import { SupportedChainId } from '@/constants/chains';
import { formatNetworks } from '@/helpers/stringUtils';

import { geTokensByChainId, getChainNameById, buildQuery, getNonHumanValue } from '@/utils';

import { MULTISEND_DIFF_ETH, MULTISEND_DIFF_TOKEN } from '@/constants/queryKeys';
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
  // SupportedChainId.BSC_TEST,
  SupportedChainId.MAINNET,
  // SupportedChainId.POLYGON,
  // SupportedChainId.OPTIMISM,
  // SupportedChainId.ARBITRUM_ONE,
  // SupportedChainId.CELO,
  SupportedChainId.AVALANCHE,
  // SupportedChainId.GODWOKEN,
  // SupportedChainId.FANTOM,
  // SupportedChainId.GNOSIS,
  // SupportedChainId.MOONBEAM,
  // SupportedChainId.OASIS_EMERALD,
  // SupportedChainId.FUSE,
];

interface TransfersProps {
  title: string;
  transactionData: any;
  handleUploadModal: () => void;
  setTransactionSuccessMessage: () => void;
  setSelectedRows: () => void;
  handleShoto: () => void;
}

export const SendTransferComponent: FunctionComponent<any> = ({
                                                                title,
                                                                handleUploadModal,
                                                                transactionData,
                                                                handleShoto,
                                                              }: TransfersProps) => {
  const { chainId, provider, account, connector } = useWeb3React();
  const selectChain = useSelectChain();
  useSyncChain();
  const [tokens, setTokens] = useState<TokensMap[SupportedChainId] | null>(null);
  const [tokenAddress, setTokenAddress] = useState<any>('');
  const [transactionSuccessMessage, setTransactionSuccessMessage] = useState('');
  const error = useSelector(
    ({ connection }: any) =>
      connection?.errorByConnectionType?.WALLET_CONNECT ||
      connection?.errorByConnectionType?.INJECTED ||
      connection?.errorByConnectionType?.UNPREDICTABLE_GAS_LIMIT,
  );
  const connectionType = getConnection(connector).type;

  const dispatch = useDispatch();
  const [isNativeToken, setIsNativeToken] = useState<boolean>(true);
  const [isNativeTokenSelected, setIsNativeTokenSelected] = useState<boolean>(false);

  const setNetwork = async (targetChainId: SupportedChainId) => {
    await selectChain(targetChainId);
  };

  useEffect(() => {
    if (chainId) {
      console.log('geTokensByChainId(TOKENS, chainId)', geTokensByChainId(TOKENS, chainId));

      setTokens(geTokensByChainId(TOKENS, chainId));
    }
  }, [chainId]);

  useEffect(() => {
    if (tokens && tokens.length) {
      if (tokens[0].address === 'native') {
        setIsNativeToken(true);
        setIsNativeTokenSelected(true);
        setTokenAddress('');
      } else {
        setIsNativeTokenSelected(false);
        setTokenAddress(tokens[0].address);
        setIsNativeToken(false);
      }
    }
  }, [tokens]);

  const { approve, isAllowed, refetchAllowance, tokenDecimals } = useTokenData(tokenAddress);

  const {
    multiSendDiffToken: multiSendDiffTokenQuery,
    multiSendDiffEth: multiSendDiffEthQuery,
    estimateGas: {
      multiSendDiffToken: multiSendDiffTokenEstimate,
      multiSendDiffEth: multiSendDiffEthEstimate,
    },
  } = useMultiSendContract();

  const { mutateAsync: multiSendDiffEth } = useMutation(
    `${MULTISEND_DIFF_ETH}`,
    ({
       employeesWallets,
       employeesParsedAmounts,
       value,
     }: {
      employeesWallets: string[];
      employeesParsedAmounts: string[];
      value: string;
    }): Promise<any> =>
      buildQuery(
        multiSendDiffEthQuery,
        [employeesWallets, employeesParsedAmounts],
        multiSendDiffEthEstimate,
        {
          value,
        },
      ),
    {
      onError: (err) => console.log(err, `${MULTISEND_DIFF_ETH}`),
    },
  );

  const { mutateAsync: multiSendDiffToken } = useMutation(
    `${MULTISEND_DIFF_TOKEN}_${tokenAddress}`,
    ({
       employeesWallets,
       employeesParsedAmounts,
     }: {
      employeesWallets: string[];
      employeesParsedAmounts: string[];
    }): Promise<any> =>
      buildQuery(
        multiSendDiffTokenQuery,
        [employeesWallets, employeesParsedAmounts, tokenAddress],
        multiSendDiffTokenEstimate,
      ),
    {
      onError: (err) => console.log(err, `${MULTISEND_DIFF_TOKEN}_${tokenAddress}`),
    },
  );

  const approveHandler = async () => {
    if (!account) {
      alert('wallet not connected');
      return;
    }
    try {
      await approve();
      refetchAllowance();
    } catch (error) {
      console.log(`Token ${tokenAddress} approve error: `, error);
    }
  };

  const sendTransfer = async () => {
    console.log('TRANS', transactionData);
    if (!account) {
      alert('wallet not connected');
      return;
    }

    const employeesParsedAmounts = transactionData.amount.map((amount: number) =>
      getNonHumanValue(amount, tokenDecimals).toString(),
    );

    const employeesTotalAmounts = transactionData.amount
      .map((amount: string) => +amount)
      .reduce(function(a: number, b: number) {
        return a + b;
      })
      .toString();

    let receipt;

    if (isNativeToken) {
      const value = getNonHumanValue(employeesTotalAmounts, 18);

      if (provider) {
        const balance = (await provider.getBalance(account)).toString();
        if (+value > +balance) {
          dispatch(updateConnectionError({ connectionType, error: 'Insufficient funds' }));
          return;
        }
      }

      const tx = await multiSendDiffEth({
        employeesWallets: transactionData.wallets,
        employeesParsedAmounts,
        value,
      });

      if (tx?.wait) {
        receipt = await tx.wait();
        if (receipt) {
          setTransactionSuccessMessage('Transaction success');
        }

        if (provider) {
          const _ = (await provider.getBalance(account)).toString();
          handleShoto();
        }
      } else {
        dispatch(updateConnectionError({ connectionType, error: tx.message }));
      }
    } else {
      const tx = await multiSendDiffToken({
        employeesWallets: transactionData.wallets,
        employeesParsedAmounts,
      });

      if (tx?.wait) {
        receipt = await tx.wait();

        if (receipt) {
          setTransactionSuccessMessage('Transaction success');
        }

        if (provider) {
          const _ = (await provider.getBalance(account)).toString();
          handleShoto();
        }
      } else {
        dispatch(updateConnectionError({ connectionType, error: tx.message }));
      }
    }
  };

  const handleCloseAlert = () => {
    if (!connector) return;

    dispatch(updateConnectionError({ connectionType, error: undefined }));
  };

  const handleSuccessAlert = () => {
    setTransactionSuccessMessage('');
  };

  const setTokenAddressHandler = (address: any) => {
    if (address === 'native') {
      setIsNativeToken(true);
      setIsNativeTokenSelected(true);
      setTokenAddress('');
    } else {
      setIsNativeTokenSelected(false);
      setTokenAddress(address);
      setIsNativeToken(false);
    }
  };

  return (
    <Grid container mt={5}>
      <Stack mb={3} sx={{ width: '100%' }}>
        <Typography>{title}</Typography>
      </Stack>
      {error && (
        <Stack mb={3} sx={{ width: '100%' }}>
          <AlertComponent onClose={handleCloseAlert} severity='error'>
            {error}
          </AlertComponent>
        </Stack>
      )}
      {transactionSuccessMessage && (
        <Stack mb={3} sx={{ width: '100%' }}>
          <AlertComponent onClose={handleSuccessAlert} severity='success'>
            {transactionSuccessMessage}
          </AlertComponent>
        </Stack>
      )}

      <Grid item container alignItems='center' spacing={2}>
        <Grid sx={{ display: { xs: 'none', sm: 'grid', md: ' grid' } }} item xs={6} sm={3} md={1.5}>
          <Button
            sx={{ fontSize: { xs: '10px', md: '12px' } }}
            fullWidth
            onClick={handleUploadModal}
            variant='contained'
          >
            Upload
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={1.5}>
          <FormControl fullWidth size='small'>
            <InputLabel id='wallet-address-label'>Network</InputLabel>
            {!chainId ? (
              <Tooltip title='Please connect your wallet' placement='top'>
                <Select
                  labelId='wallet-address-label'
                  id='wallet-address'
                  name='serviceType'
                  value={`${chainId ? chainId : ''}`}
                  onChange={(event) => setNetwork(+event.target.value)}
                  label='Network'
                  disabled={!chainId}
                >
                  {NETWORK_SELECTOR_CHAINS?.map((chain) => (
                    <MenuItem key={chain} value={chain}>
                      {formatNetworks(getChainNameById(chain))}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            ) : (
              <Select
                labelId='wallet-address-label'
                id='wallet-address'
                name='serviceType'
                placeholder='Network'
                value={`${chainId ? chainId : ''}`}
                onChange={(event) => setNetwork(+event.target.value)}
                label='Network'
                disabled={!chainId}
              >
                {NETWORK_SELECTOR_CHAINS?.map((chain) => (
                  <MenuItem key={chain} value={chain}>
                    {formatNetworks(getChainNameById(chain))}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>

        <Grid sx={{ display: { xs: 'grid', sm: 'none', md: ' none' } }} item xs={6} sm={3} md={1.5}>
          <Button fullWidth onClick={handleUploadModal} variant='contained'>
            Upload
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={1.5}>
          <FormControl fullWidth size='small'>
            <InputLabel id='demo-simple-select-label'>Coins</InputLabel>

            {!chainId ? (
              <Tooltip title='Please connect your wallet' placement='top'>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Coins'
                  placeholder='Coins'
                  value={tokenAddress}
                  disabled={!chainId}
                  onChange={(event) => setTokenAddress(event.target.value)}
                >
                  {tokens?.map((token, i) => (
                    <MenuItem key={`token-${i}`} value={token.address}>
                      {token.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            ) : (
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Coins'
                placeholder='Coins'
                value={tokenAddress ? tokenAddress : 'native'}
                disabled={!chainId}
                onChange={(event) => setTokenAddressHandler(event.target.value)}
              >
                {tokens?.map((token, i) => (
                  <MenuItem key={`token-${i}`} value={token.address}>
                    {token.symbol}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={2}>
          <Button
            sx={{ fontSize: { xs: '10px', md: '12px' } }}
            fullWidth
            variant='contained'
            disabled={
              !(
                (chainId && tokenAddress && transactionData.wallets.length) ||
                (chainId && isNativeTokenSelected && transactionData.wallets.length)
              )
            }
            onClick={isAllowed || isNativeToken ? sendTransfer : approveHandler}
          >
            {isAllowed || isNativeToken ? 'Make a transfer' : 'Approve token'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
