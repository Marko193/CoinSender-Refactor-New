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
          const finalData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          let header: any = finalData[0];
          finalData.splice(0, 1);

          if (validHeaders.every((vh) => header.includes(vh))) {
            setFileData(convertToJson(header, finalData));
            const prepareForLS = convertToJson(header, finalData);
            setLocalStorageValue(prepareForLS);
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
