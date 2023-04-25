import { convertToJson } from '@/helpers/parser';
import { useState, ChangeEvent } from 'react';
import useLocalStorage from './useLocalStorage';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { validateWallets } from '@/helpers/stringUtils';
import { ALLOWED_EXTENSIONS, ERROR_MESSAGES, FileExtensions } from '@/constants/impor-files';
import { addMultipleTransfer } from '@/services/transfers';

interface UseFileImportData {
  fileData: [];
  isLoading: boolean;
  error: string;
  handleFileImport: (e: ChangeEvent<HTMLInputElement>) => void;
  localStorage: string | [];
}

const useFileImport = (validHeaders: Array<string>, tableData: any): UseFileImportData => {
  const [fileData, setFileData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [localStorageValue, setLocalStorageValue] = useLocalStorage('fileData', '');

  const handleFileImport = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setError('');
    const file = e?.target.files![0];
    const fileName = file?.name;
    const fileExtension: any = fileName?.split('.').pop();

    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setError(ERROR_MESSAGES.extensionMessage);
      setIsLoading(false);
      return;
    }

    const fileReader = new FileReader();

    if (fileExtension === FileExtensions.XLS || fileExtension === FileExtensions.XLSX) {
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = async (e: any) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const fileData = XLSX.utils
            .sheet_to_json<[]>(worksheet, { header: 1 })
            .filter((raw) => raw.length > 0);

          let header: string[] = [];
          do {
            header = fileData[0];
            fileData.splice(0, 1);
          } while (header.length < 3);

          const rawFinalData = convertToJson(fileData)

          const checkWallet = await validateWallets(rawFinalData, setError);

          // Format data to new standarts
          const finalData = rawFinalData.map((el: any)=>({employee_name: el.name, wallet_address: el.wallet, amount: el.amount}));

          // Check valid headers
          // console.log('finalData', finalData);

          if (validHeaders.every((vh) => header.includes(vh))) {
            if (!checkWallet) {
              return;
            }

            const response = await addMultipleTransfer(finalData);

            // console.log('tableData', tableData);

            console.log('data', [...response.data.data, ...tableData]);

            if (response.status === 201) {
              setFileData([...response.data.data, ...tableData]);
              setLocalStorageValue([...response.data.data, ...tableData]);
            }
          } else {
            setError(ERROR_MESSAGES.invalidHeaders);
            return;
          }
        } catch (err) {
          setError(ERROR_MESSAGES.invalidFormat);
          return;
        } finally {
          setIsLoading(false);
        }
      };
    } else if (fileExtension === FileExtensions.CSV) {
      fileReader.readAsText(file);
      fileReader.onload = async (e: any) => {
        try {
          const data = e.target.result;
          const result = await Papa.parse(data, {
            header: true,
          });

          const header: any = result.meta.fields;
          const finalData: any = result.data;
          const checkWallet = await validateWallets(finalData, setError);

          if (validHeaders.every((vh) => header.includes(vh))) {
            if (!checkWallet) {
              return;
            }
            setFileData(finalData);

            setLocalStorageValue(finalData);
          } else {
            setError(ERROR_MESSAGES.invalidHeaders);
            return;
          }
        } catch (err) {
          setError(ERROR_MESSAGES.invalidFormat);
        } finally {
          setIsLoading(false);
        }
      };
    }
  };
  return { fileData, isLoading, error, handleFileImport, localStorage: localStorageValue };
};

export default useFileImport;
