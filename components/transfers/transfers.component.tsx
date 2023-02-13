import { useCallback, useEffect, useState } from 'react';
import { SendTransferComponent } from '@/components/send-transfers/send-transfers.component';
import DocumentParserComponent from '@/components/document-parcer/document-parser.component';
import useLocalStorage from '@/hooks/useLocalStorage';
import useFileImport from '@/hooks/useFileImport';

export interface LoaderStateInterface {
  loading: boolean;
  text?: string;
}

const validHeaders: string[] = ['name', 'wallet', 'amount'];

export const TransfersComponent = () => {
  const { error, handleFileImport, localStorage } = useFileImport(validHeaders);
  const [selectedRows, setSelectedRows] = useState([]);
  const [transactionData, setTransactionData] = useState({ amount: [], wallets: [] });
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [value, setValue] = useLocalStorage('fileData', localStorage);
  const [tableData, setTableData] = useState<any>(localStorage);
  const [isLoading, setIsLoading] = useState<LoaderStateInterface>({
    loading: false,
    text: '',
  });

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
    setValue(localStorage);
  }, [localStorage]);

  useEffect(() => {
    setTableData(value);
  }, [value]);

  const successTransactionDate = () => {
    const zxc = selectedRows.map((item: any) => ({ ...item, date: new Date() }));

    const results = Array.from(value)
      .map((item: any, index: number) => ({
        id: index,
        ...item,
      }))
      .filter(({ id: id1 }: any) => !selectedRows.some(({ id: id2 }) => id2 === id1));
    setValue([...results, ...zxc] as any);
  };

  return (
    <>
      <SendTransferComponent
        title="Transfers"
        handleUploadModal={handleUploadModal}
        transactionData={transactionData}
        setSelectedRow={setSelectedRows}
        successTransactionDate={successTransactionDate}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <DocumentParserComponent
        open={uploadModalOpen}
        handleUploadModal={handleUploadModal}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        tableData={tableData}
        isLoading={isLoading}
        handleFileImport={handleFileImport}
        error={error}
      />
    </>
  );
};
