import Head from "next/head";

import { MainLayout } from "@/layouts/main-layout.component";
import DocumentParserComponent from "@/components/document-parcer/document-parser.component";
import { linkClasses } from "@mui/material";
import { TransfersComponent } from "@/components/transfers/transfers.component";

export default function Home() {
  return (
    <>
      <Head>
        <title>Coinsender</title>
        <meta
          name="description"
          content="Make a paymets in crypto with Coinsender"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MainLayout>
        {/* <TransfersComponent title="Transfers" /> */}
        <DocumentParserComponent />
      </MainLayout>
    </>
  );
}
