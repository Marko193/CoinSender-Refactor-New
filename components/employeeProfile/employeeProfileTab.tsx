import * as React from "react";
import { styled } from "@mui/material/styles";
import { Stack, Grid, Box } from "@mui/material";
import ProfileLeftSide from "./ProfileLeftSide";
import Divider from "@mui/material/Divider";

const BlockWrapper = styled(Box)({
  boxShadow:
    "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
});

const CustomDivider = styled(Divider)({
  margin: "10px 0",
});

export default function EmployeeProfileTab({ user, params }: any) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Grid container spacing={2}>
        <ProfileLeftSide user={user} />
        <Grid item xs={12} md={6} lg={8}>
          <BlockWrapper
            sx={{
              paddingX: 4,
              paddingY: 4,
              mb: 3,
            }}
          >
            Wallet: {user?.wallet_address || "No data..."}
            <CustomDivider />
            Amount: {user?.amount || "No data..."}
            <CustomDivider />
            Additional information: {user?.add_info || "No data..."}
            <CustomDivider />
            Position: {user?.position || "No data..."}
          </BlockWrapper>
        </Grid>
      </Grid>
    </Stack>
  );
}
