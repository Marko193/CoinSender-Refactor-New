import styles from "@/components/header/header.module.scss";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";
import { Button } from "@/components/button/button.component";
import { Grid, Stack, Typography } from "@mui/material";

interface TransfersProps {
  title: string;
}

export const TransfersComponent = ({ title }: TransfersProps) => {
  return (
    <Grid container>
      <Stack>
        <Typography>{title}</Typography>
      </Stack>
      {/* <Grid item xs={6}>
        1
      </Grid>
      <Grid item xs={6}>
        2
      </Grid> */}
    </Grid>
  );
};
