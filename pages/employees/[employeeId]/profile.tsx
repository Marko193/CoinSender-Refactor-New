import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';

export default function EmployeeProfile() {

  const MainLayout = dynamic(
    () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
    {
      ssr: false,

      loading: () => <span> Loading... </span>,
    },
  );

  const router = useRouter();
  const { employeeId } = router.query;

  return (
    <>
      <Head>
        <title>Employees</title>
        <meta name='description' content='Employees page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <MainLayout>
        <div>{employeeId}</div>
      </MainLayout>
    </>
  );
}

