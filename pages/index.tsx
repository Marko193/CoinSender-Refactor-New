import Head from 'next/head';

import { MainLayout } from '@/layouts/main-layout.component';
import DocumentParserComponent from '@/components/document-parcer/document-parser.component';
import { TransfersComponent } from '@/components/transfers/transfers.component';
import { useState } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Head>
        <title>Coinsender</title>
        <meta name="description" content="Make a paymets in crypto with Coinsender" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MainLayout>
        <TransfersComponent openModal={openModal} closeModal={closeModal} title="Transfers" />
        <DocumentParserComponent openModal={openModal} closeModal={closeModal} open={modalOpen} />
      </MainLayout>
    </>
  );
}
