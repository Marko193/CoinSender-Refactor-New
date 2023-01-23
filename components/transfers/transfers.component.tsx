import { useState } from "react";
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
} from "@mui/material";
import { BNBCoins, ETHCoins, GODCoins, networks } from "@/mocks/mock-data";

interface TransfersProps {
  title: string;
  closeModal: () => void;
  openModal: () => void;
}

const searchCurrentNetwork = (networkId: number): string[] => {
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

export const TransfersComponent = ({
  title,
  openModal,
  closeModal,
}: TransfersProps) => {
  const [networkId, setNetworkId] = useState(null);
  const [coin, setCoin] = useState<string | null>(null);

  return (
    <Grid container mt={5}>
      <Stack mb={3} sx={{ width: "100%" }}>
        <Typography>{title}</Typography>
      </Stack>
      <Stack flexDirection="row" gap={2} alignItems="center" height="50px">
        <Stack>
          <Button onClick={() => openModal()} variant="contained">
            Upload
          </Button>
        </Stack>
        <Stack>
          <FormControl sx={{ minWidth: "190px" }} size="small">
            <InputLabel id="wallet-address-label">Network</InputLabel>
            <Select
              labelId="wallet-address-label"
              id="wallet-address"
              name="serviceType"
              value={networkId}
              onChange={({ target: { value } }: SelectChangeEvent<any>) => {
                setNetworkId(value);
                setCoin(null);
              }}
              label="Network"
            >
              {networks.map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <FormControl sx={{ minWidth: "190px" }} size="small" margin="dense">
            <Autocomplete
              disabled={!networkId}
              disablePortal
              value={coin}
              id="combo-box-demo"
              onChange={(e, value) => setCoin(value)}
              options={searchCurrentNetwork(networkId)}
              size="small"
              renderInput={(params) => <TextField {...params} label="Coin" />}
            />
          </FormControl>
        </Stack>
        <Stack>
          <Button variant="contained" disabled={!(networkId && coin)}>
            Make a transfer
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};
