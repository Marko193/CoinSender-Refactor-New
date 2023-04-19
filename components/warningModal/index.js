import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import WarningIcon from '@/assets/icons/warning.svg';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  width: '300px',
};

export default function ModalContent({ open, close, type }) {
  // const { t } = useTranslation('common');
  const handleClose = () => {
    close();
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style}>
            <Stack mb={2} direction="column" alignItems="center" justifyContent="center" gap="20px">
              <Box>
                <img src={WarningIcon} alt="" />
              </Box>
              <Box>Are you sure you want to cancel?</Box>
              <Stack direction="row" gap="15px">
                <Button component={RouterLink} to={type} variant="contained">
                  Yes
                </Button>
                <Button onClick={close} variant="contained">
                  No
                </Button>
              </Stack>
            </Stack>
          </Box>
        </>
      </Modal>
    </div>
  );
}
