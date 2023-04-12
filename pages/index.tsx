import Head from 'next/head';
import { RouteGuard } from '@/components/routeGuard/routeGuard';
import { TransfersComponent } from '@/components/transfers/transfers.component';
import DashboardSidebar from '@/components/sidebar';
import { useState } from 'react';
import { Header } from '@/components/header/header.component';
import styles from '@/layouts/main-layout.module.scss';
import { Box, Container } from '@mui/material';
import dynamic from 'next/dynamic';

export default function Home() {

  // @ts-ignore
  const MainLayout = dynamic(
    () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
    {
      ssr: false,

      loading: () => <span> </span>,
    },
  );

  return (
    <>
      <Head>
        <title>Coinsender</title>
        <meta name='description' content='Make a paymets in crypto with Coinsender' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

        <MainLayout>
          <TransfersComponent />
        </MainLayout>
    </>
  );
}
