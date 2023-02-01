import { useCallback, useEffect, useState } from 'react';
import { SendTransferComponent } from '@/components/send-transfers/send-transfers.component';
import DocumentParserComponent from '@/components/document-parcer/document-parser.component';

export const TransfersComponent = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [transactionData, setTransactionData] = useState({ amount: [], wallets: [] });
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const handleUploadModal = useCallback(() => {
    setUploadModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const amount: any = selectedRows.map((item: any) => item.amount);
    const wallets: any = selectedRows.map((item: any) => item.wallet);

    setTransactionData({ amount, wallets });
    return () => {};
  }, [selectedRows]);

  return (
    <>
      <SendTransferComponent
        title="Transfers"
        handleUploadModal={handleUploadModal}
        transactionData={transactionData}
        setSelectedRow={setSelectedRows}
      />
      <DocumentParserComponent
        open={uploadModalOpen}
        handleUploadModal={handleUploadModal}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
      />
    </>
  );
};
