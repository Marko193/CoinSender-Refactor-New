import { StatisticComponent } from '@/components/statistic/statistic';
import dynamic from 'next/dynamic';
import Head from 'next/head';

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
        <title>Statistic</title>
        <meta name="description" content="Statistic page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <MainLayout>
        <StatisticComponent />
      </MainLayout>
    </>
  );
}
