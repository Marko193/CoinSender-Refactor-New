import React, { useState } from 'react';
import { Stack, TableRow, TableCell, Button } from '@mui/material';
import moment from 'moment';

export function Row({ row, selected, data }: any) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  // const user = useSelector(({ AuthUser: { user } }) => user);
  // const userFromAPI = useSelector(({ payments: { user } }) => user);
  // const { t } = useTranslation('common');
  const { employee_name, wallet_address, createDateTime, hash, amount, notes, _id, payment, employee } = row;

  console.log('row', row);
  console.log('data', data);
  console.log('selected', selected);

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
      <TableCell align="left">
        {row?.id
          ? data.indexOf(row) + 1
          : 'No data...'}
      </TableCell>

      <TableCell align="left">
        Here will be sender wallet address ?!
      </TableCell>
      <TableCell align="left">
        {row?.wallet_address
          ? row?.wallet_address
          : 'No data...'}
      </TableCell>
      <TableCell align="left">
        {row?.employee_name
          ? row?.employee_name
          : 'No data...'}
      </TableCell>
      <TableCell align="left">{amount ? Number(row?.amount).toString() : 'No data...'}</TableCell>
      <TableCell align="left">
        <Stack>{moment(createDateTime).format('MMMM Do, H:mm') || 'No data'}</Stack>
      </TableCell>
      <TableCell align="left">
        <Stack>{payment?.status ? 'Success' : 'Rejected' || 'No data'}</Stack>
      </TableCell>
      {/*<TableCell align="left">*/}
      {/*  <Stack>{notes || 'No data'}</Stack>*/}
      {/*</TableCell>*/}
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
