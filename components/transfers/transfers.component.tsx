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

  useEffect(() => {
    (async () => {
      try {
        const transfers = await getTransfers();
        const recipients = await getRecipients();
        setRecipients(recipients.data.data);
        setTableData(transfers.data.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const filteredData = removeExistingObjectsByWalletId(recipients, tableData);
    // console.log('filteredData', filteredData);
    setFilteredRecipientsList(filteredData);

  }, [recipients, tableData]);

  const { error, handleFileImport, localStorage } = useFileImport(validHeaders);
  const loaderState: LoaderState = useSelector(({ loader }: any) => loader);

  const handleUploadModal = useCallback(() => {
    setUploadModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    let amount: any = [];
    let wallets: any = [];
    if (selectedRows && selectedRows.length > 0) {
      amount = selectedRows.map((item: any) => item.amount);
      wallets = selectedRows.map((item: any) => item.wallet);
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
    const zxc = selectedRows.map((item: any) => ({ ...item, date: new Date() }));

    const results = Array.from(value)
      .map((item: any, index: number) => ({
        id: index,
        ...item,
      }))
      .filter(({ id: id1 }: any) => !selectedRows.some(({ id: id2 }) => id2 === id1));
    setValue([...results, ...zxc] as any);
  };

  const importFromRecipients = async () => {
    try {
      const { data } = await getRecipients();

      const recipientsList = removeExistingObjectsByWalletId(data.data, tableData);



      const filteredRecipientsList = recipientsList.map(({
                                                           name: employee_name,
                                                           id: member_id,
                                                           amount,
                                                           wallet_address,
                                                         }) => ({
        member_id,
        amount,
        wallet_address,
        employee_name,
      }));


      // console.log('filteredRecipientsList', filteredRecipientsList);

      const response = await addMultipleTransfer(filteredRecipientsList);
      const formatRecipientsList = filteredRecipientsList.map(({
                                                         employee_name,
                                                         member_id: id,
                                                         amount,
                                                         wallet_address,
                                                       }) => ({
        id,
        amount,
        wallet_address,
        employee_name,
      }));

      // console.log('formatRecipientsList', formatRecipientsList);

      if (response.status === 201) {
        setTableData([...tableData, ...formatRecipientsList]);
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
      />
      <ToastContainer />
    </>
  );
};
