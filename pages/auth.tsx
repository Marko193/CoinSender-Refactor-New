import Head from 'next/head';

import { styled } from '@mui/material/styles';
import { Card, Stack, Typography, Grid, Button, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Logo from '@/assets/Logo.svg';
import SignInLogo from '@/assets/sign-in/sign-in.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Coinsender</title>
        <meta name="description" content="Make a paymets in crypto with Coinsender" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Grid container height="100vh" sx={{ background: 'rgba(34, 214,255,0.1)' }}>
        <Grid item xs={5} sx={{ display: { xs: 'none', lg: 'flex' } }}>
          <Stack position="relative" justifyContent="center" alignItems="center" height="100%">
            <Stack
              display="flex"
              alignItems="center"
              top="20px"
              left="-65px"
              position="absolute"
              sx={{ width: '100%' }}
              justifyContent="center"
            >
              <a href="https://coinsender.io/">
                <Image src={Logo} alt="Logo" height="85" />
              </a>
            </Stack>
            <Stack justifyContent="center" width="100%">
              <Image
                src={SignInLogo}
                alt="Logo"
                style={{ width: '496px', height: '454px', marginLeft: '-50px' }}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          lg={7}
          sx={{ background: 'white', borderRadius: '25px 0 0 25px' }}
          justifyContent="center"
        >
          <Stack maxWidth="390px" sx={{ margin: '0 auto' }} justifyContent="center" height="100%">
            <Typography
              variant="h4"
              sx={{ fontSize: '24px', fontWeight: '700' }}
              gutterBottom
              mb={2}
            >
              Sign in to CoinSender
            </Typography>
            <Stack width="100%">
              <Stack>
                <Link style={{ textDecoration: 'none' }} href="/">
                  <Button fullWidth variant="contained">
                    Go to decentralized application
                  </Button>
                </Link>
              </Stack>

              <Stack>
                <Divider sx={{ my: 3 }}>or</Divider>
              </Stack>
              <Stack gap={2}>
                <Stack sx={{ background: 'rgb(229, 246, 253)', p: 2, borderRadius: '8px' }}>
                  <Stack mb={2} alignItems="center" flexDirection="row" gap={2}>
                    <InfoIcon color="info" />
                    <Typography>In process</Typography>
                  </Stack>
                  <Stack gap={2}>
                    <Button disabled fullWidth variant="contained">
                      Login to decentralized application
                    </Button>
                    <Button disabled fullWidth variant="contained">
                      Registrate in decentralized application
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
