import { convertToJson } from '@/helpers/parser';
import { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

enum ErrorMessages {
  extensionMessage = 'Invalid file extension, Please select a valid csv of exel file',
  invalidFile = 'The file is broken or invalid. Please select a valid file.',
  invalidFormat = 'Invalid file format. Please select a valid file format.',
  invalidHeaders = 'Invalid header. Please upload a file with valid header.',
  duplicateWallets = 'There are duplicate wallet addresses present in the file: ',
  invalidAmount = 'You have not valid amount in file: ',
}

enum FileExtensions {
  CSV = 'csv',
  XLSX = 'xlsx',
  XLS = 'xls',
}
const ALLOWED_EXTENSIONS = [FileExtensions.CSV, FileExtensions.XLS, FileExtensions.XLSX];
const ERROR_MESSAGES = {
  extensionMessage: ErrorMessages.extensionMessage,
  invalidFile: ErrorMessages.invalidFile,
  invalidFormat: ErrorMessages.invalidFormat,
  invalidHeaders: ErrorMessages.invalidHeaders,
};

function validateArray(array: any, setError: any) {
  let isValid = true;
  const wallets = new Set();

  for (const obj of array) {
    const { name, wallet, amount } = obj;
    const nameRegex = /^[a-zA-Z\s]+$/;

    // Check if name is a valid first and last name
    // if (!nameRegex.test(name)) {
    //   console.log(`Invalid name: ${name}`);
    //   setError('You have not valid name in file: ' + name);
    //   isValid = false;
    // }

    // Check for duplicate wallets
    if (wallets.has(wallet)) {
      console.log(`Duplicate wallet: ${wallet}`);
      setError(ErrorMessages.duplicateWallets + wallet);
      isValid = false;
    } else {
      wallets.add(wallet);
    }

    // Check if amount is a number
    if (isNaN(amount)) {
      console.log(`Invalid amount: ${amount}`);
      setError(ErrorMessages.invalidAmount + amount);
      isValid = false;
    }
  }

  return isValid;
}

const useFileImport = (
  validHeaders: Array<string>,
): [any, boolean, string | null, (e: React.ChangeEvent<HTMLInputElement>) => void, string | []] => {
  const [fileData, setFileData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage('fileData', '');

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setError(null);
    const file = e.target.files![0];
    const fileName = file.name;
    const fileExtension: any = fileName.split('.').pop();

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
          const fileData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          let header: any = fileData[0];
          fileData.splice(0, 1);
          const finalData = convertToJson(header, fileData);

          if (!validateArray(finalData, setError)) {
            return;
          }

          if (validHeaders.every((vh) => header.includes(vh))) {
            setFileData(finalData);

            setLocalStorageValue(finalData);
          } else {
            setError(ERROR_MESSAGES.invalidHeaders);
          }
        } catch (err) {
          setError(ERROR_MESSAGES.invalidFormat);
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
          console.log(finalData);

          if (!validateArray(finalData, setError)) {
            return;
          }

          if (validHeaders.every((vh) => header.includes(vh))) {
            setFileData(finalData);
            setLocalStorageValue(finalData);
          } else {
            setError(ERROR_MESSAGES.invalidHeaders);
          }
        } catch (err) {
          setError(ERROR_MESSAGES.invalidFormat);
        } finally {
          setIsLoading(false);
        }
      };
    }
  };
  return [fileData, isLoading, error, handleFileImport, localStorageValue];
};

export default useFileImport;
