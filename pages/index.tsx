import dynamic from 'next/dynamic';
import Head from 'next/head';

import { TransfersComponent } from '@/components/transfers/transfers.component';

// @ts-ignore
const MainLayout = dynamic(
  () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
  {
    ssr: false,

    loading: () => <span> </span>,
  },
);

import { RouteGuard } from '../components/roleGuard/roleGuard';

export default function Home() {
  return (
    <>

      <Head>
        <title>Coinsender</title>
        <meta name='description' content='Make a paymets in crypto with Coinsender' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <div>
        <RouteGuard>
          <MainLayout>
            <TransfersComponent />
          </MainLayout>
        </RouteGuard>
      </div>


    </>
  );
}
