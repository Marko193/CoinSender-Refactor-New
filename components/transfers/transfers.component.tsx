import { useCallback, useEffect, useState } from 'react';
import { SendTransferComponent } from '@/components/send-transfers/send-transfers.component';
import DocumentParserComponent from '@/components/document-parcer/document-parser.component';
import { useWeb3React } from '@web3-react/core';
import useLocalStorage from '@/hooks/useLocalStorage';
import useFileImport from '@/hooks/useFileImport';

const validHeaders: string[] = ['name', 'wallet', 'amount'];

export const TransfersComponent = () => {
  const [_, isLoading, error, handleFileImport, localStorage] = useFileImport(validHeaders);
  const [selectedRows, setSelectedRows] = useState([]);
  const [transactionData, setTransactionData] = useState({ amount: [], wallets: [] });
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [rowsForDeleting, setRowsForDeleting] = useState([]);
  const [value, setValue] = useLocalStorage('fileData', {});
  const [tableData, setTableData] = useState<any>(localStorage);

  const handleUploadModal = useCallback(() => {
    setUploadModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const amount: any = selectedRows.map((item: any) => item.amount);
    const wallets: any = selectedRows.map((item: any) => item.wallet);

    setTransactionData({ amount, wallets });
    return () => {};
  }, [selectedRows]);

  useEffect(() => {
    setTableData(localStorage);
  }, [localStorage]);

  useEffect(() => {
    setTableData(value);
  }, [value]);

  const deleteTransfers = () => {
    const results = value
      .map((item: any, index: number) => ({
        id: index,
        ...item,
      }))
      .filter(({ id: id1 }) => !selectedRows.some(({ id: id2 }) => id2 === id1));
    setValue(results);
  };

  const handleShoto = () => {
    const results = value
      .map((item: any, index: number) => ({
        id: index,
        ...item,
      }))
      .filter(({ id: id1 }) => !selectedRows.some(({ id: id2 }) => id2 === id1));
    const zxc = selectedRows.map((item: any) => ({ ...item, date: new Date() }));
    setValue([...results, ...zxc]);
  };

  return (
    <>
      <SendTransferComponent
        title="Transfers"
        handleUploadModal={handleUploadModal}
        transactionData={transactionData}
        setSelectedRow={setSelectedRows}
        handleShoto={handleShoto}
      />
      <DocumentParserComponent
        open={uploadModalOpen}
        handleUploadModal={handleUploadModal}
        setSelectedRows={setSelectedRows}
        deleteTransfers={deleteTransfers}
        setRowsForDeleting={setRowsForDeleting}
        selectedRows={selectedRows}
        tableData={tableData}
        handleFileImport={handleFileImport}
        error={error}
      />
    </>
  );
};
