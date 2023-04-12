import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Box, Grid, Typography, Avatar } from '@mui/material';
import { stringAvatar } from '@/helpers/stringUtils';

const BlockWrapper = styled(Box)({
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
});

export default function ProfileLeftSide({ user }: any) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <BlockWrapper
        sx={{
          paddingX: 4,
          paddingY: 4,
          mb: 3,
        }}
      >
        <Stack alignItems="center" justifyContent="center" gap="10px">
          <Avatar
            src={'https://app.coinsender.io/public/avatars/' + user?.avatar_url || '/images/example.jpg'}
            style={{
              margin: '10px',
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              position: 'relative',
            }}
            {...stringAvatar(user?.name, user?.second_name)}
          />
          <Typography gutterBottom>
            {user?.name + ' ' + user?.second_name}
          </Typography>
        </Stack>
      </BlockWrapper>
    </Grid>
  )
}
