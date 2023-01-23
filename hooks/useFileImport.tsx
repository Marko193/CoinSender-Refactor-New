import { convertToJson } from "@/helpers/parser";
import { useState } from "react";
import * as XLSX from "xlsx";

enum ErrorMessages {
  extensionMessage = "Invalid file extension, Please select a valid csv of exel file",
  invalidFile = "The file is broken or invalid. Please select a valid file.",
  invalidFormat = "Invalid file format. Please select a valid file format.",
  invalidHeaders = "Invalid header. Please upload a file with valid header.",
}

const ERROR_MESSAGES = {
  extensionMessage: ErrorMessages.extensionMessage,
  invalidFile: ErrorMessages.invalidFile,
  invalidFormat: ErrorMessages.invalidFormat,
  invalidHeaders: ErrorMessages.invalidHeaders,
};

const useFileImport = (
  validHeaders: Array<string>
): [
  any,
  boolean,
  string | null,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [fileData, setFileData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setError(null);
    const file = e.target.files![0];
    const fileName = file.name;
    const fileExtention = fileName.split(".").pop();

    if (
      fileExtention !== "csv" &&
      fileExtention !== "xlsx" &&
      fileExtention !== "xls"
    ) {
      setError(ERROR_MESSAGES.extensionMessage);

      setIsLoading(false);
      return;
    }

    const fileReader = new FileReader();
    if (fileReader.readyState === 2 && fileReader.error) {
      setError(ERROR_MESSAGES.invalidFile);
      setIsLoading(false);
      return;
    }
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: any) => {
      const data = e.target.result;
      let workBook;
      try {
        workBook = XLSX.read(data, { type: "binary" });
      } catch (err) {
        setError(ERROR_MESSAGES.invalidFormat);
        setIsLoading(false);
        return;
      }
      const firstSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[firstSheetName];
      const finalData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      let header: Array<string> = finalData[0];
      finalData.splice(0, 1);

      if (validHeaders.every((vh) => header.includes(vh))) {
        setFileData(convertToJson(header, finalData));
      } else {
        setError(ERROR_MESSAGES.invalidHeaders);
      }
      setIsLoading(false);
    };
  };

  return [fileData, isLoading, error, handleFileImport];
};

export default useFileImport;
