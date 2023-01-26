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
  Autocomplete,
  TextField,
} from '@mui/material';
import { BNBCoins, ETHCoins, GODCoins } from '@/mocks/mock-data';
import { useWeb3React } from '@web3-react/core';
import useSelectChain from '@/hooks/useSelectChain';
import useSyncChain from '@/hooks/useSyncChain';
import { TOKENS, TokensMap } from '@/constants/tokens';
import { SupportedChainId } from '@/constants/chains';

import { geTokensByChainId, getChainNameById } from '@/utils';

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
  const { chainId } = useWeb3React();
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

        {chainId && (
          <Grid item xs={6} sm={3} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="wallet-address-label">Network</InputLabel>
              <Select
                labelId="wallet-address-label"
                id="wallet-address"
                name="serviceType"
                value={`${chainId}`}
                defaultValue={`${chainId}`}
                onChange={(event) => setNetwork(+event.target.value)}
                label="Network"
              >
                {NETWORK_SELECTOR_CHAINS?.map((chain, i) => (
                  <MenuItem key={chain} value={chain}>
                    {getChainNameById(chain)}{' '}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>{' '}
          </Grid>
        )}

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
