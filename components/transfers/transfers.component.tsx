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
  const [networkId, setNetworkId] = useState(71402);
  const [coin, setCoin] = useState<string | null>(null);

  return (
    <Grid container mt={5}>
      <Stack mb={3} sx={{ width: "100%" }}>
        <Typography>{title}</Typography>
      </Stack>
      <Grid item container alignItems="center" spacing={2}>
        <Grid
          sx={{ display: { xs: "none", sm: "grid", md: " grid" } }}
          item
          xs={6}
          sm={3}
          md={1.5}
        >
          <Button
            sx={{ fontSize: { xs: "10px", md: "12px" } }}
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
            <Select
              labelId="wallet-address-label"
              id="wallet-address"
              name="serviceType"
              value={networkId}
              defaultValue=""
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
        </Grid>
        <Grid
          sx={{ display: { xs: "grid", sm: "none", md: " none" } }}
          item
          xs={6}
          sm={3}
          md={1.5}
        >
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
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={2}>
          <Button
            sx={{ fontSize: { xs: "10px", md: "12px" } }}
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
