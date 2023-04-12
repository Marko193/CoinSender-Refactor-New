import dynamic from 'next/dynamic';
import Head from 'next/head';
import { RouteGuard } from '@/components/routeGuard/routeGuard';
import { TransfersComponent } from '@/components/transfers/transfers.component';
import DashboardSidebar from '@/components/sidebar';
import { useState } from 'react';

// @ts-ignore
const MainLayout = dynamic(
  () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
  {
    ssr: false,

    loading: () => <span> </span>,
  },
);

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
          <MainLayout>
            <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
            <TransfersComponent />
          </MainLayout>
        </RouteGuard>
    </>
  );
}
