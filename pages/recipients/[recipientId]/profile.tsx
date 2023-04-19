import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { PageTitle } from '@/components/pageTitle';
import { Button, Container, Stack, Typography, Tab, styled } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmployeeProfileTab from '@/components/employeeProfile/employeeProfileTab';
import employees from '@/mocks/employees.json';

const AntTabs = styled(TabList)({
  '& .MuiTabs-indicator': {
    background: '#FD9B28',
  },
  '& .css-1da5c08-MuiButtonBase-root-MuiTab-root.Mui-selected': {
    color: '#FD9B28',
  },
});
export default function EmployeeProfile() {

  const MainLayout = dynamic(
    () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
    {
      ssr: false,

      loading: () => <span> Loading... </span>,
    },
  );

  const router = useRouter();
  const { recipientId } = router.query;

  const [value, setValue] = useState('1');

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Recipient`s profile</title>
        <meta name='description' content='Employees page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <MainLayout>
        {
          // !employee.isLoading &&
          recipientId ? (
          <Stack>
            <PageTitle title="Receipent's profile" path={'/recipients'} />
            <Stack>
              <TabContext value={value}>
                <Stack
                  display="flex"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <AntTabs
                    variant="scrollable"
                    scrollButtons={false}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      icon={<AccountBoxIcon />}
                      iconPosition="start"
                      label='profile'
                      value="1"
                      sx={{
                        color: '#007994',
                      }}
                    />
                  </AntTabs>
                  <Stack>
                    <Button
                      // component={Link}
                      // to={`/application/recipients/${params}/edit`}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </Stack>
                </Stack>

                <TabPanel sx={{ px: 0, py: 2 }} value="1">
                  <EmployeeProfileTab params={recipientId} user={employees[0]} />
                </TabPanel>
                <TabPanel sx={{ px: 0, py: 2 }} value="2">
                  {/*<RecentTransaction wallets={wallets.walletList} data={payments.paymentList} />*/}
                </TabPanel>
              </TabContext>
            </Stack>
          </Stack>
        ) : null}
      </MainLayout>
    </>
  );
}

