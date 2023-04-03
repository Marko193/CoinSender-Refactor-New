import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Page from '@/components/page/Page.js';
import ArrowRight from '@/assets/sign-in/ArrowRightAuth.svg';
import SignInLogo from '@/assets/sign-in/sign-in.svg';
import ForgotForm from '@/components/forgotPasswordForm';
import Logo from '@/assets/Logo.svg';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  background: 'rgba(34, 214,255,0.03)',
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'inherit',
  boxShadow: 'none',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 390,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export default function ForgotPassword() {
  return (
    <RootStyle title="Login">
      {/*<SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>*/}
      {/*  <Stack*/}
      {/*    display="flex"*/}
      {/*    alignItems="center"*/}
      {/*    top="10px"*/}
      {/*    left="-32px"*/}
      {/*    position="absolute"*/}
      {/*    sx={{ width: '100%' }}*/}
      {/*    justifyContent="center"*/}
      {/*  >*/}
      {/*    <a href="https://coinsender.io/">*/}
      {/*      <Logo height="100" />*/}
      {/*    </a>*/}
      {/*  </Stack>*/}
      {/*  <Stack justifyContent="center" width="100%" mt={20}>*/}
      {/*    <Image*/}
      {/*      style={{ width: '496px', height: '454px', marginLeft: '-20px' }}*/}
      {/*      src={SignInLogo}*/}
      {/*      alt="login"*/}
      {/*    />*/}
      {/*  </Stack>*/}
      {/*</SectionStyle>*/}

      <Container
        sx={{
          background: 'white',
          borderRadius: '25px 0 0 25px',
          position: 'relative',
          maxWidth: { lg: '100%' },
        }}
        maxWidth="md"
      >
        <Stack position="absolute" top="24px" left="32px">
          {/*<RouterLink to={SIGN_IN}>*/}
          {/*  <img src={ArrowRight} alt="go_back" />*/}
          {/*</RouterLink>*/}
        </Stack>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Futura Md BT', fontSize: '24px' }}
              gutterBottom
            >
              Forgot password?
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', fontFamily: 'Futura Md BT', fontSize: '18px' }}
            >
              Enter your email below.
            </Typography>
          </Stack>
          <ForgotForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
