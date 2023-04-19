import React, { useRef, useState } from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Iconify from '../iconify/index.tsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteRecipientById } from '../../services/recipients';
import Router from 'next/router';

export default function MoreMenuEmployees({ id, user }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const deleteEmployeeById = async (id) => {
    try {
      const response = await deleteRecipientById(id);
      if (response.status === 204) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => deleteEmployeeById(id)}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => Router.push(`https://dev.capp.coinsender.io/recipients/${id}/edit`)}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <ToastContainer />
    </>
  );
}
