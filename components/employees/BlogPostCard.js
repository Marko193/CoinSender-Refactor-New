import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import MoreMenuEmployees from './MoreMenuEmployees';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AVATAR_URL } from 'src/constants/defaultURL';
import { stringAvatar } from 'src/utils/stringAvatar';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  fontSize: 14,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});
const TitleRole = styled(TitleStyle)({
  fontSize: 12,
  fontWeight: 400,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 100,
  height: 100,
  // position: 'absolute',
  // left: 0,
  // right: 0,
  margin: 'auto',
  // bottom: theme.spacing(-3)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  padding: '20px',
  top: 0,
  width: '100%',
  height: '92%',
  // objectFit: 'cover',
  position: 'absolute',
  backgroundColor: '#212529',
});

// ----------------------------------------------------------------------

export const BlogPostCard = ({ post, employees, handleOpen }) => {
  const { t } = useTranslation('common');

  const {
    name,
    // company: { role },
    // contacts: { corporateEmail, phone },
    email,
    phone,
    second_name,
    surname,
    id,
    avatar_url,
  } = post;

  const dispatch = useDispatch();
  const authData = localStorage.getItem('authorization_login');
  // let user = employees?.find(({ _id }) => _id === authObj.user.id);
  // user = { ...user, role: "admin" };

  return (
    <Grid item xs={12} sm={4} md={4} sx={{ position: 'relative' }}>
      <Stack
        sx={{
          position: 'absolute',
          color: 'white',
          zIndex: 1000,
          right: '2%',
          top: '20%',
        }}
      >
        <MoreMenuEmployees handleOpen={handleOpen} id={id} user={post} />
      </Stack>
      <Card sx={{ position: 'relative' }}>
        <Stack
          sx={{
            display: 'flex',
            p: 3,
            pb: 2,
            gap: 1,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
            ':hover p': {
              textDecoration: 'underline',
            },
          }}
          // component={RouterLink}
          // to={`/application/employees/${id}/profile`}
        >
          <Avatar
            src={AVATAR_URL + avatar_url || '/images/example.jpg'}
            style={{
              margin: '10px',
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              position: 'relative',
              fontSize: '25px',
            }}
            {...stringAvatar(name, second_name)}
          />
          <TitleStyle sx={{ mt: 2, color: 'black' }} variant="subtitle2" component={Typography}>
            {name && second_name ? name + ' ' + second_name : 'No data'}
          </TitleStyle>
          <Stack>
            <Typography
              gutterBottom
              variant="caption"
              sx={{
                color: 'text.disabled',
                display: 'block',
                fontSize: '12px',
              }}
            >
              {email}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{
                color: 'text.disabled',
                display: 'block',
                fontSize: '12px',
              }}
            >
              {phone}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};
