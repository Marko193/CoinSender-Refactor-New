import { useEffect, useState } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Autocomplete,
  TextField,
} from '@mui/material';
import { BNBCoins, ETHCoins, GODCoins, networks } from '@/mocks/mock-data';
import { useWeb3React } from '@web3-react/core';
import useSelectChain from '@/hooks/useSelectChain';
import useSyncChain from '@/hooks/useSyncChain';
import { TOKENS, TokensMap } from '@/constants/tokens';
import { SupportedChainId } from '@/constants/chains';
import { MULTISEND_DIFF_DIFF_TOKEN } from '@/constants/queryKeys';
import { useMultiSendContract } from '@/hooks/useContract';
import useTokenData from '@/hooks/useTokenData';
import {
  buildQuery,
  getNonHumanValue,
  getHumanValue,
  geTokensByChainId,
  getChainNameById,
} from '@/utils';
import { useMutation } from 'react-query';

interface TransfersProps {
  title: string;
  closeModal: () => void;
  openModal: () => void;
}

const searchCurrentNetwork = (networkId: number | null): any => {
  switch (networkId) {
    case 1:
      return ETHCoins;
    case 71402:
      return GODCoins;
    case 56:
      return BNBCoins;
    default:
      break;
  }
};

const wallets = [
  '0x91Bbc2A6C3C7006e26Cd1CF6e27B0FeBA94377cE',
  // '0x91Bbc2A6C3C7006e26Cd1CF6e27B0FeBA94377cE',
  // '0x519af7175AccA8976DF567dA46b4aFb0C5201303',
];
const amounts = ['0.1'];
// const amounts = ['0.1', '0.1'];

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

export const TransfersComponent = ({ title, openModal, closeModal }: TransfersProps) => {
  const [networkId, setNetworkId] = useState(71402);
  const [coin, setCoin] = useState<string | null>(null);
  const { account, chainId, provider } = useWeb3React();
  const selectChain = useSelectChain();
  useSyncChain();

  const [tokens, setTokens] = useState<TokensMap[SupportedChainId] | null>(null);
  const [tokenAddress, setTokenAddress] = useState<string>('');

  const setNetwork = async (targetChainId: SupportedChainId) => {
    await selectChain(targetChainId);
  };

  const { approve, isAllowed, refetchAllowance, tokenDecimals } = useTokenData(tokenAddress);

  const {
    multiSendDiffToken: multiSendDiffTokenQuery,
    estimateGas: { multiSendDiffToken: multiSendDiffTokenEstimate },
  } = useMultiSendContract();

  const { mutateAsync: multiSendDiffToken } = useMutation(
    `${MULTISEND_DIFF_DIFF_TOKEN}_${tokenAddress}`,
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
      onError: (err) => console.log(err, `${MULTISEND_DIFF_DIFF_TOKEN}_${tokenAddress}`),
    },
  );

  const sendTransfer = async () => {
    if (!account) {
      alert('wallet not connected');
      return;
    }

    if (!isAllowed) {
      await approve();
      refetchAllowance();
    }

    const employeesWallets = wallets.map((wallet) => wallet);

    const employeesParsedAmounts = amounts.map((amount) =>
      getNonHumanValue(amount, tokenDecimals).toString(),
    );

    const tx = await multiSendDiffToken({ employeesWallets, employeesParsedAmounts });

    const receipt = await tx.wait();

    console.log('receipt', receipt);

    if (provider) {
      const balance = (await provider.getBalance(account)).toString();
      console.log('balance', getHumanValue(balance, tokenDecimals).toString());
    }
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
    <Grid container mt={5}>
      <Stack mb={3} sx={{ width: '100%' }}>
        <Typography>{title}</Typography>
      </Stack>
      <Grid item container alignItems="center" spacing={2}>
        <Grid sx={{ display: { xs: 'none', sm: 'grid', md: ' grid' } }} item xs={6} sm={3} md={1.5}>
          <Button
            sx={{ fontSize: { xs: '10px', md: '12px' } }}
            fullWidth
            onClick={() => openModal()}
            variant="contained"
          >
            Upload
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel id="wallet-address-label">Network</InputLabel>
            {/* <Select
              labelId="wallet-address-label"
              id="wallet-address"
              name="serviceType"
              value={networkId}
              defaultValue={71402}
              onChange={() => console.log('selected')}
              label="Network"
            >
              {NETWORK_SELECTOR_CHAINS?.map((chain, i) => (
                <MenuItem key={chain} value={chain}>
                  {getChainNameById(chain)}{' '}
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Grid>
        <Grid sx={{ display: { xs: 'grid', sm: 'none', md: ' none' } }} item xs={6} sm={3} md={1.5}>
          <Button fullWidth onClick={() => openModal()} variant="contained">
            Upload
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={1.5}>
          <FormControl fullWidth size="small">
            <Autocomplete
              disabled={!networkId}
              disablePortal
              value={coin}
              id="combo-box-demo"
              onChange={(e, value) => setCoin(value)}
              options={searchCurrentNetwork(networkId)}
              size="small"
              renderInput={(params) => <TextField label="Coin" {...params} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={2}>
          <Button
            sx={{ fontSize: { xs: '10px', md: '12px' } }}
            fullWidth
            variant="contained"
            disabled={!(networkId && coin)}
          >
            Make a transfer
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
