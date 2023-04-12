import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Stack, Box, Grid, Typography, Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import RemoteIcon from '../../../assets/icons/remote-not-colored.svg';
import RemoteColoredIcon from '../../../assets/icons/home-icon.svg';
import SickIcon from '../../../assets/icons/sick-leave-not-colored.svg';
import HeartIcon from '../../../assets/icons/heart-not-colored.svg';
import WeekendsIcon from '../../../assets/icons/vacation-not-colored.svg';
import AvatarUpload from '../../../layouts/Avatar';
import { AVATAR_URL } from 'src/constants/defaultURL';
import { stringAvatar } from 'src/utils/stringAvatar';

const EventWrapper = styled(Box)({
  width: '60px',
  height: '60px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const BlockWrapper = styled(Box)({
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
});

export default function ProfileLeftSide({ user }) {
  const { t } = useTranslation('common');

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
            src={AVATAR_URL + user?.avatar || '/images/example.jpg'}
            style={{
              margin: '10px',
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              position: 'relative',
            }}
            {...stringAvatar(user?.name)}
          />
          <Typography variant="h8" gutterBottom>
            {user?.name ? user?.name : 'No data'}
          </Typography>
        </Stack>
      </BlockWrapper>
    </Grid>
  );
}
