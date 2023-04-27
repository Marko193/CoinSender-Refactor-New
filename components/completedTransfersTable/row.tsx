import React, { useState } from 'react';
import { Stack, TableRow, TableCell, Button } from '@mui/material';
import moment from 'moment';

export function Row({ row, selected, data }: any) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const { employee_name, wallet_address, paid_at, hash, amount, id} = row;

  console.log('row', row);
  // console.log('data', data);
  // console.log('selected', selected);

  return (
    <TableRow
      hover
      key={id}
      tabIndex={-1}
      selected={selected}
      aria-checked={selected}
      sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
      onClick={handleOpen}
    >
      <TableCell align="left">
        {row?.id
          ? data.indexOf(row) + 1
          : 'No data...'}
      </TableCell>
      <TableCell align="left">
        {row?.employee_name
          ? employee_name
          : 'No data...'}
      </TableCell>
      <TableCell align="left">
        {row?.wallet_address
          ? wallet_address
          : 'No data...'}
      </TableCell>

      <TableCell align="left">{amount ? Number(row?.amount).toString() : 'No data...'}</TableCell>
      <TableCell align="left">
        <Stack>{
          moment(paid_at).format('MMMM Do, H:mm')
          // paid_at
          || 'No data...'}</Stack>
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
