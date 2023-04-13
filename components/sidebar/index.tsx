import { Box, Link, Drawer, Typography, Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '@/assets/Logo.svg';
import useResponsive from '@/hooks/useResponsive';
import Scrollbar from '@/components/scrollbar';
import { stringAvatar } from '@/helpers/stringUtils';
import userFromStorage from '@/mocks/currentUser.json';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import sidebarConfig from './config.js';
import NavSection from '@/components/navbarSection';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: 280,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: '#ECEFF1',
}));

interface DashboardSidebarProps {
  isOpenSidebar: any;
  onCloseSidebar: any;
}

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const router = useRouter();
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [router.pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        sx={{
          py: 3.0625,
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image src={Logo} height="60" alt='logo' />
      </Stack>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link href='/' underline="none" >
          <AccountStyle>
            <Avatar
              src={'https://app.coinsender.io/public/avatars/' + userFromStorage?.avatar_url || '/images/example.jpg'}
              {...stringAvatar(userFromStorage?.name, userFromStorage?.second_name)}
              alt="photoURL"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {userFromStorage?.name + ' ' + userFromStorage?.second_name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userFromStorage?.role || ''}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      {/*<Box sx={{ flexGrow: 1 }} />*/}
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: 280 },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 280,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
