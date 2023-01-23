import { convertToJson, getExtention } from "@/helpers/parser";
import { FunctionComponent, memo, useState } from "react";
import * as XLSX from "xlsx";
import styles from "@/components/document-parcer/document-parser.module.scss";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface HeaderProps {
  headerName: string;
  field: string;
}
interface DocumentParserComponentProps {}
const DocumentParserComponent: FunctionComponent<
  DocumentParserComponentProps
> = () => {
  const [data, setData] = useState([]);
  const [extentionError, setExtentionError] = useState<string | null>(null);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "wallet", headerName: "Wallet", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
  ];

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
      <Button variant="contained" component="label">
        Upload
        <input onChange={importExcel} hidden type="file" />
      </Button>
      <div style={{ height: "340px" }}>
        <DataGrid
          rows={data.map((item: any, i) => ({
            id: i,
            name: item.name,
            wallet: item.wallet,
            amount: item.amount,
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default memo(DocumentParserComponent);
