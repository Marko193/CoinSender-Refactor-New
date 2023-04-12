import Head from 'next/head';
import { RouteGuard } from '@/components/routeGuard/routeGuard';
import { TransfersComponent } from '@/components/transfers/transfers.component';
import DashboardSidebar from '@/components/sidebar';
import { useState } from 'react';
import { Header } from '@/components/header/header.component';
import { Container } from '@mui/material';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Coinsender</title>
        <meta name='description' content='Make a paymets in crypto with Coinsender' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <RouteGuard>
        <Header onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <Container>
          <TransfersComponent />
        </Container>
      </RouteGuard>
    </>
  );
}
