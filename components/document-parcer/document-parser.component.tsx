import React, { FunctionComponent, memo, useState } from 'react';
import styles from '@/components/document-parcer/document-parser.module.scss';
import { Alert, AlertTitle, Button, Modal, Stack, Typography } from '@mui/material';
import { FileExtensions } from '@/constants/impor-files';
import { LoaderState } from '@/state/loader/reducer';
import EnhancedTable from '../table/table';
import CompletedTransfersTable from '@/components/completedTransfersTable';
// import { organizationHead } from '@/constants/completedTransfers';

interface DocumentParserComponentProps {
  open: boolean;
  handleUploadModal: () => void;
  setSelectedRows: (item: any) => void;
  selectedRows: any;
  tableData: any;
  handleFileImport: (e: any) => void;
  error: any;
  loader: LoaderState;
  setTableData: any;
  setValue: any;
  isLoading: any;
}

const DocumentParserComponent: FunctionComponent<DocumentParserComponentProps> = ({
                                                                                    open,
                                                                                    handleUploadModal,
                                                                                    setSelectedRows,
                                                                                    selectedRows,
                                                                                    tableData,
                                                                                    handleFileImport,
                                                                                    error,
                                                                                    setTableData,
                                                                                    setValue,
                                                                                    isLoading,
                                                                                    loader,
                                                                                  }) => {
  const [page, setPage] = React.useState(1);
  const [isOpen, setIsOpen] = useState(false);

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

  const openModal = (value: any, type: any) => {
    setIsOpen(value);
    // setType(type);
  };

  return (
    <>
      <div className={styles.parserContainer}>
        {error && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            <Stack sx={{ whiteSpace: 'pre-wrap' }}>{error}</Stack>
          </Alert>
        )}

        <div className={styles.tableContainer}>
          <Typography sx={{ px: 0, py: 2, fontSize: '16px', fontWeight: 500 }} variant='h6'>
            Active transfers
          </Typography>
          <EnhancedTable
            data={tableData}
            setTableData={setTableData}
            setValue={setValue}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
          />


          <Typography sx={{ px: 0, py: 2, fontSize: '16px', fontWeight: 500 }} variant='h6'>
            Completed transfers
          </Typography>
          <CompletedTransfersTable
            type='org'
            isLoading={isLoading}
            handler={openModal}
            data={tableData.slice(-5)}
            pagination={false}
            // tableHead={organizationHead}
            // wallets={wallets.walletList}
          />

        </div>
      </div>

      <Modal
        open={open}
        onClose={handleUploadModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Stack sx={style}>
          <Alert severity='info'>
            <AlertTitle>Info</AlertTitle>
            <Stack mb={2}>
              <Typography fontSize='13px' fontStyle='italic' textAlign='justify'>
                All data in the line (employee_name, wallet_address, amount) must be filled.
                <br />
                Field name may contain letters or numbers.
                <br />
                Field wallet must contain a valid wallet.
                <br />
                Field amount must contain a number, a valid delimiter is a dot (0.01).
              </Typography>
            </Stack>
            You can download an example file —{' '}
            <strong>
              <a
                rel='noreferrer'
                href={`https://cs-payments.s3.amazonaws.com/example-download.csv`}
                target='_blank'
                download
              >
                {FileExtensions.CSV}
              </a>
              {' / '}
              <a
                rel='noreferrer'
                href={`https://cs-payments.s3.amazonaws.com/example-download.xlsx`}
                target='_blank'
                download
              >
                {FileExtensions.XLSX}
              </a>
            </strong>
            .
          </Alert>
          <Stack mt={2}>
            <Button variant='contained' component='label'>
              Upload
              <input
                onChange={(e) => {
                  handleUploadModal();
                  handleFileImport(e);
                  setSelectedRows([]);
                  setPage(1);
                }}
                hidden
                type='file'
              />
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default memo(DocumentParserComponent);
