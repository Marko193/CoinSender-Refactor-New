import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { Stack, TableRow, TableCell, Button } from '@mui/material';
// import { useSelector } from 'react-redux';
import moment from 'moment';

export function Row({ row, selected }: any) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  // const user = useSelector(({ AuthUser: { user } }) => user);
  // const userFromAPI = useSelector(({ payments: { user } }) => user);

  // const { t } = useTranslation('common');
  const { createDateTime, hash, amount, notes, _id, payment, employee } = row;

  return (
    <TableRow
      hover
      key={_id}
      tabIndex={-1}
      selected={selected}
      aria-checked={selected}
      sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
      onClick={handleOpen}
    >
      <TableCell component="th" scope="row">
        <Stack direction="row" alignItems="center" spacing={2}>
          {/*{(userFromAPI?.name && userFromAPI?.second_name*/}
          {/*    ? userFromAPI?.name + ' ' + userFromAPI?.second_name*/}
          {/*    : 'No data') ||*/}
          {/*  (user?.name && user?.second_name ? user?.name + ' ' + user?.second_name : 'No data')}*/}
        </Stack>
      </TableCell>
      <TableCell align="left">
        {employee?.name && employee?.second_name
          ? employee?.name + ' ' + employee?.second_name
          : 'No data...'}
      </TableCell>
      <TableCell align="left">{amount || ''}</TableCell>
      <TableCell align="left">
        <Stack>{moment(createDateTime).format('MMMM Do, H:mm') || 'No data'}</Stack>
      </TableCell>
      <TableCell align="left">
        <Stack>{payment?.status ? 'Success' : 'Rejected' || 'No data'}</Stack>
      </TableCell>
      <TableCell align="left">
        <Stack>{notes || 'No data'}</Stack>
      </TableCell>
      <TableCell align="left">
        <Stack>
          <a
            style={{
              textDecoration: 'none',
              color: 'black',
              fontStyle: 'italic',
            }}
            target="_blank"
            href={`https://gw-mainnet-explorer.nervosdao.community/tx/${hash}/internal-transactions`} rel="noreferrer"
          >
            <Button sx={{ height: '30px' }} variant="contained">
              Details
            </Button>
          </a>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
