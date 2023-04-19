import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { PageTitle } from '@/components/pageTitle';
import { Button, Stack, styled, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmployeeProfileTab from '@/components/employeeProfile/employeeProfileTab';
import { getRecipientById } from '@/services/recipients';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

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

  const MainLayout = dynamic(
    () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
    {
      ssr: false,

      loading: () => <span> Loading... </span>,
    },
  );

  const [value, setValue] = useState('1');
  const [recipient, setRecipient] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log('recipientId', recipientId);
    if (recipientId !== undefined) {
      (async () => {
        const response = await getRecipientById(recipientId);
        // console.log('value', response);
        if (response.status === 200) {
          try {
            setRecipient(response.data.data);
            setIsLoading(false);
          } catch (error: any) {
            toast.error(error.response.data.message);
          }
        }
      })();
    }
  }, [recipientId]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  console.log('recipientId', recipientId);

  return (
    <>
      <Head>
        <title>Recipient profile</title>
        <meta name='description' content='Recipient profile' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <MainLayout>
        {
          (!isLoading && recipientId) && (
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
                      <Tab
                        icon={<AccountBoxIcon />}
                        iconPosition='start'
                        label='Profile'
                        value='1'
                        sx={{
                          color: '#007994 !important',
                          fontSize: '14px',
                          fontFamily: '__Inter_01180f, __Inter_Fallback_01180f, sans-serif',
                        }}
                      />
                    </AntTabs>
                    <Stack>
                      <Link href={`http://localhost:3000/recipients/${recipientId}/edit`}>
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
          )}
        <ToastContainer />
      </MainLayout>
    </>
  );
}
