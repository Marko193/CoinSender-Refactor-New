import { FunctionComponent, memo, useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from '@/components/document-parcer/document-parser.module.scss';
import { Button, Alert, AlertTitle, Modal, Stack, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useFileImport from '@/hooks/useFileImport';
import useLocalStorage from '@/hooks/useLocalStorage';

const validHeaders: string[] = ['name', 'wallet', 'amount'];

interface DocumentParserComponentProps {
  open: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const DocumentParserComponent: FunctionComponent<DocumentParserComponentProps> = ({
  open,
  openModal,
  closeModal,
}) => {
  const [_, isLoading, error, handleFileImport, localStorage] = useFileImport(validHeaders);
  const [tableData, setTableData] = useState<any>(localStorage);
  const [value, setValue] = useLocalStorage('fileData', {});
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsForDeleting, setRowsForDeleting] = useState([]);

  useEffect(() => {
    setTableData(localStorage);
  }, [localStorage]);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'wallet', headerName: 'Wallet', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    {
      field: 'delete',
      width: 75,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'lastcolumnSeparator',
      renderHeader: () => {
        return (
          <IconButton
            disabled={rowsForDeleting.length === tableData.length || selectedRows.length === 0}
            onClick={() => {
              setValue(rowsForDeleting);
              setTableData(rowsForDeleting);
              setRowsForDeleting([]);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        );
      },
    },
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 2,
  };

  return (
    <>
      <div className={styles.parserContainer}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <div style={{ height: '55vh', marginBottom: '100px' }}>
          <DataGrid
            rows={
              tableData &&
              tableData.map((item: any, index: number) => ({
                id: index,
                ...item,
              }))
            }
            sx={{
              '& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
            }}
            hideFooterPagination
            columns={columns}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const dataWithId = tableData.map((item: any, index: number) => ({
                id: index,
                ...item,
              }));
              const selectedRows = dataWithId.filter((row: any) => selectedIDs.has(row.id));

              setSelectedRows(selectedRows);

              const rowsForRemoving = dataWithId.filter((row: any) => !selectedIDs.has(row.id));

              if (rowsForRemoving.length !== tableData) {
                setRowsForDeleting(rowsForRemoving);
              }
            }}
            loading={isLoading}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            You can download an example file —{' '}
            <strong>
              <a
                rel="noreferrer"
                href={`https://app.coinsender.io/api/transfers/example-download.csv`}
                target="_blank"
                download
              >
                csv
              </a>
              {' / '}
              <a
                rel="noreferrer"
                href={`https://app.coinsender.io/api/transfers/example-download.xslx`}
                target="_blank"
                download
              >
                xslx
              </a>
            </strong>
            .
          </Alert>
          <Stack mt={2}>
            <Button variant="contained" component="label">
              Upload
              <input
                onChange={(e) => {
                  handleFileImport(e);
                  closeModal();
                }}
                hidden
                type="file"
              />
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default memo(DocumentParserComponent);
