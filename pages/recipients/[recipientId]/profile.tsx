import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { PageTitle } from '@/components/pageTitle';
import { Button, CircularProgress, Stack, styled, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import EmployeeProfileTab from '@/components/employeeProfile/employeeProfileTab';
import { getRecipientById } from '@/services/recipients';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { ROOT_URL } from '@/constants/general';
import { Header } from '@/components/header/header.component';
import DashboardSidebar from '@/components/sidebar';
import styles from '@/layouts/main-layout.module.scss';
import { RouteGuard } from '@/components/routeGuard/routeGuard';

const AntTabs = styled(TabList)({
  '& .MuiTabs-indicator': {
    background: '#FD9B28',
    fontSize: '14px',
  },
  '& .css-1da5c08-MuiButtonBase-root-MuiTab-root.Mui-selected': {
    color: 'rgb(0, 121, 148) !important',
  },
});
export default function EmployeeProfile() {

  const router = useRouter();
  const { recipientId } = router.query;

  const [value, setValue] = useState('1');
  const [recipient, setRecipient] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (recipientId !== undefined) {
      (async () => {
        const response = await getRecipientById(recipientId);
        // console.log('value', response);
        if (response.status === 200) {
          try {
            setRecipient(response.data.data);
          } catch (error: any) {
            toast.error(error.response.data.message);
          } finally {
            setIsLoading(false);
          }
        }
      })();
    }
  }, [recipientId]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Recipient profile</title>
        <meta name='description' content='Recipient profile' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <RouteGuard>
        <Header onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <div className={styles.main_layout}>
          {
            (!isLoading && recipientId) ? (
              <Stack>
                <PageTitle title='Recipient profile' path={'/recipients'} />
                <Stack>
                  <TabContext value={value}>
                    <Stack
                      display='flex'
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <AntTabs
                        variant='scrollable'
                        scrollButtons={false}
                        onChange={handleChange}
                        aria-label='lab API tabs example'
                      >
                      </AntTabs>
                      <Stack>
                        <Link href={`${ROOT_URL}/recipients/${recipientId}/edit`}>
                          <Button variant='contained' style={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontFamily: '__Inter_01180f, __Inter_Fallback_01180f, sans-serif',
                          }}>
                            Edit
                          </Button>
                        </Link>
                      </Stack>
                    </Stack>

                    <TabPanel sx={{ px: 0, py: 2 }} value='1'>
                      <EmployeeProfileTab params={recipientId} user={recipient} />
                    </TabPanel>
                    <TabPanel sx={{ px: 0, py: 2 }} value='2'>
                      {/*<RecentTransaction wallets={wallets.walletList} data={payments.paymentList} />*/}
                    </TabPanel>
                  </TabContext>
                </Stack>
              </Stack>
            ) :
              <Typography mt='20%' textAlign='center' variant='subtitle2'>
                <CircularProgress />
              </Typography>
          }
          <ToastContainer />
        </div>
      </RouteGuard>
    </>
  );
}

