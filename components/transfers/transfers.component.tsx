import { useCallback, useState } from 'react';
import { SendTransferComponent } from '@/components/send-transfers/send-transfers.component';
import DocumentParserComponent from '@/components/document-parcer/document-parser.component';

export const TransfersComponent = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleUploadModal = useCallback(() => {
    setUploadModalOpen((prev) => !prev);
  }, []);

  return (
    <>
      <SendTransferComponent title="Transfers" handleUploadModal={handleUploadModal} />
      <DocumentParserComponent open={uploadModalOpen} handleUploadModal={handleUploadModal} />
    </>
  );
};
