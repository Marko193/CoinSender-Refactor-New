import { convertToJson, getExtention } from "@/helpers/parser";
import { FunctionComponent, memo, useState } from "react";
import * as XLSX from "xlsx";
import styles from "@/components/document-parcer/document-parser.module.scss";

interface HeaderProps {
  title: string;
  field: string;
}
interface DocumentParserComponentProps {}
const DocumentParserComponent: FunctionComponent<
  DocumentParserComponentProps
> = () => {
  const [data, setData] = useState([]);
  const [colHeaders, setColHeaders] = useState<HeaderProps[]>([]);
  const [extentionError, setExtentionError] = useState<string | null>(null);

  const importExcel = (e: any) => {
    e.preventDefault();

    const files = e.target.files[0];

    const reader = new FileReader();
    reader.onload = function (e: any) {
      const bufferString = e.target.result;
      const workBook = XLSX.read(bufferString, { type: "binary" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const dataParse: any = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      const headers: [string] = dataParse[0];
      dataParse.splice(0, 1);

      // Normalize headers for a table and state
      const normalizedHeaders = headers.map((head) => ({
        title: head,
        field: head,
      }));
      setColHeaders(normalizedHeaders);
      setData(convertToJson(headers, dataParse));
    };
    if (files) {
      if (getExtention(files)) {
        reader.readAsBinaryString(files);
        setExtentionError(null);
      } else {
        setExtentionError("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setColHeaders([]);
      setData([]);
    }
  };

  return (
    <div className={styles.parserContainer}>
      {extentionError !== null && (
        <div className={styles.validationParserErrorMessage}>
          {extentionError}
        </div>
      )}

      <input type="file" onChange={importExcel} />
      <table className={styles.table}>
        <thead>
          <tr>
            {colHeaders &&
              colHeaders.map((header, index) => {
                return <th key={`header-${index}`}>{header.title}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((content: any, index) => {
              return (
                <tr key={`content-${index}`}>
                  <td>{content.name}</td>
                  <td>{content.wallet}</td>
                  <td>{content.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default memo(DocumentParserComponent);
