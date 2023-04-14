import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography, Link } from '@mui/material';
import Page from '../../components/page/Page.js';
import ArrowRight from '../../assets/sign-in/ArrowRightAuth.svg';
import SignInLogo from '../../assets/sign-in/sign-in.svg';
import ChangePasswordForm from '../../components/changePasswordForm';
import Logo from '../../assets/Logo.svg';
import Image from 'next/image';

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

export default function RestorePasswordPage () {

  const router = useRouter();
  const { restorePasswordToken } = router.query;

  return (
    <RootStyle title="Login">
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Stack top="40px" left="32px" position="absolute">
          <Link href="https://coinsender.io/">
            <Image src={Logo} height='100' alt='logo' />
          </Link>
        </Stack>
        <Stack justifyContent="center" width="100%">
          <Image
            style={{ width: '496px', height: '454px', marginLeft: '-20px' }}
            src={SignInLogo}
            alt="login"
          />
        </Stack>
      </SectionStyle>

      <Container
        sx={{ background: 'white', borderRadius: '25px 0 0 25px', position: 'relative' }}
        maxWidth="md"
      >
        <Stack position="absolute" top="24px" left="32px">
          <Link href={'/auth'}>
            <Image src={ArrowRight} alt="go_back" />
          </Link>
        </Stack>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography
              variant="h4"
              sx={{ fontFamily: '__Inter_01180f, __Inter_Fallback_01180f, sans-serif', fontSize: '24px', fontWeight: 700 }}
              gutterBottom
            >
              Change password!
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', fontFamily: '__Inter_01180f, __Inter_Fallback_01180f, sans-serif', fontSize: '18px', fontWeight: 700 }}
            >
              Enter your email and password below.
            </Typography>
          </Stack>
          <ChangePasswordForm restorePasswordToken={restorePasswordToken}/>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
