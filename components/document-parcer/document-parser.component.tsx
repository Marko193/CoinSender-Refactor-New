import { FunctionComponent, memo } from "react";
import styles from "@/components/document-parcer/document-parser.module.scss";
import { Button, Alert, AlertTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useFileImport from "@/hooks/useFileImport";

interface HeaderProps {
  headerName: string;
  field: string;
}

const validHeaders: string[] = ["name", "wallet", "amount"];

interface DocumentParserComponentProps {}
const DocumentParserComponent: FunctionComponent<
  DocumentParserComponentProps
> = () => {
  const [fileData, isLoading, error, handleFileImport] =
    useFileImport(validHeaders);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "wallet", headerName: "Wallet", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
  ];
  return (
    <div className={styles.parserContainer}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Button variant="contained" component="label">
        Upload
        <input onChange={handleFileImport} hidden type="file" />
      </Button>
      <div style={{ height: "340px" }}>
        <DataGrid
          rows={
            fileData &&
            fileData.map((item: any, index: number) => ({
              id: index,
              ...item,
            }))
          }
          columns={columns}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default memo(DocumentParserComponent);
