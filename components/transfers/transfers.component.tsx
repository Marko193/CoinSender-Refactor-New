import React, { useCallback, useEffect, useState } from 'react';
import { SendTransferComponent } from '@/components/send-transfers/send-transfers.component';
import DocumentParserComponent from '@/components/document-parcer/document-parser.component';
import useFileImport from '@/hooks/useFileImport';
import { useSelector } from 'react-redux';
import { LoaderState } from '@/state/loader/reducer';
import { addMultipleTransfer, getTransfers } from '@/services/transfers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRecipients } from '@/services/recipients';
import { removeExistingObjectsByWalletId } from '@/helpers/parser';

const validHeaders: string[] = ['employee_name', 'wallet_address', 'amount'];

export const TransfersComponent = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [transactionData, setTransactionData] = useState({ amount: [], wallets: [] });
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [filteredRecipientsList, setFilteredRecipientsList] = useState<any>([]);
  const [value, setValue] = useState<any>([]);
  const [recipients, setRecipients] = useState<any>([]);
  const [processedTransfersList, setProcessedTransfersList] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const transfers = await getTransfers();
        const recipients = await getRecipients();
        setRecipients(recipients.data.data);
        setTableData(transfers.data.data.filter((el: any) => {
          return el.paid_at == null;
        }));
        setProcessedTransfersList(transfers.data.data.filter((el: any) => {
          return el.paid_at !== null;
        }));

      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const filteredData = removeExistingObjectsByWalletId(recipients, tableData);
    setFilteredRecipientsList(filteredData);

  }, [recipients, tableData]);

  const { error, handleFileImport, localStorage, fileData } = useFileImport(validHeaders, tableData);
  const loaderState: LoaderState = useSelector(({ loader }: any) => loader);

  useEffect(() => {
    if (fileData.length !== 0) {
      setTableData(fileData);
    }
  }, [fileData]);

  const processedTransfers = (processedTransfers: any) => {
    console.log('processedTransfers', processedTransfers);
    //add init completed transfers list on page load - filter list if paid_at not null value
    setProcessedTransfersList(processedTransfers);
  };

  const handleUploadModal = useCallback(() => {
    setUploadModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    let amount: any = [];
    let wallets: any = [];
    if (selectedRows && selectedRows.length > 0) {
      amount = selectedRows.map((item: any) => item.amount);
      wallets = selectedRows.map((item: any) => item.wallet_address);
    }
    setTransactionData({ amount, wallets });
    return () => {
    };
  }, [selectedRows]);

  useEffect(() => {
    if (!localStorage) {
      setTableData([]);
      setValue([]);
      return;
    }
    setTableData(
      (localStorage as any).map((item: any, index: number) => ({
        isEdit: false,
        isNew: false,
        id: index + 1,
        ...item,
      })),
    );
    setValue(
      (localStorage as any).map((item: any, index: number) => ({
        isEdit: false,
        isNew: false,
        id: index + 1,
        ...item,
      })),
    );
  }, [localStorage]);

  useEffect(() => {
    setTableData(value);
  }, [value]);

  const successTransactionDate = () => {
    const filteredIncompleteTransfers = [].concat(
      tableData.filter((obj2: any) =>
        selectedRows.every((obj1: any) => obj2.wallet_address !== obj1.wallet_address),
      ),
    );

    setValue(filteredIncompleteTransfers);
  };

  const importFromRecipients = async () => {
    try {
      const { data } = await getRecipients();

      const filteredRecipientsList = removeExistingObjectsByWalletId(data.data, tableData);

      const response = await addMultipleTransfer(filteredRecipientsList);

      if (response.status === 201) {
        setTableData([...response.data.data, ...tableData]);
        toast.success('The recipients were successfully imported!');
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <SendTransferComponent
        title='Transfers'
        handleUploadModal={handleUploadModal}
        transactionData={transactionData}
        setSelectedRow={setSelectedRows}
        successTransactionDate={successTransactionDate}
        loader={loaderState}
        tableData={tableData}
        importFromRecipients={importFromRecipients}
        filteredRecipientsList={filteredRecipientsList}
        processedTransfers={processedTransfers}
      />
      <DocumentParserComponent
        open={uploadModalOpen}
        handleUploadModal={handleUploadModal}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        tableData={tableData}
        loader={loaderState}
        handleFileImport={handleFileImport}
        error={error}
        setTableData={setTableData}
        setValue={setValue}
        isLoading={isLoading}
        processedTransfersList={processedTransfersList}
      />
      <ToastContainer />
    </>
  );
};
