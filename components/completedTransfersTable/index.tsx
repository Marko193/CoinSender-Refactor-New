import { filter } from 'lodash';
import React, { useState } from 'react';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
// import SearchNotFound from '../../../components/SearchNotFound';
import { filterRequests } from '@/helpers/stringUtils';
import { Row } from './row';
import CircularProgress from '@mui/material/CircularProgress';

function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any, comparator: any, query: any) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el: any) => el[0]);
}

export default function CompletedTransfersTable({ data, wallets, pagination, isLoading }: any) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState<any>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterTechnology] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filtering] = useState([]);

  const checkedRequests = filterRequests(data || [], filtering);

  const handleClick = (event: any, name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - checkedRequests.length) : 0;

  const filteredUsers = applySortFilter(
    checkedRequests,
    getComparator(order, orderBy),
    filterTechnology,
  );

  interface Data {
    id: string;
    employee_name: string;
    wallet_address: string;
    amount: string;
    paid_at: string;
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    alignRight: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: 'id',
      numeric: false,
      disablePadding: false,
      label: 'Id',
      alignRight: false
    },
    {
      id: 'employee_name',
      numeric: false,
      disablePadding: false,
      label: 'Name',
      alignRight: false
    },
    {
      id: 'wallet_address',
      numeric: false,
      disablePadding: false,
      label: 'Wallet',
      alignRight: false
    },
    {
      id: 'amount',
      numeric: false,
      disablePadding: false,
      label: 'Amount',
      alignRight: false
    },
    {
      id: 'paid_at',
      numeric: false,
      disablePadding: false,
      label: 'Paid date',
      alignRight: false
    },
  ];

  // @ts-ignore
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  // sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isLoading ?
            (
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    const { name } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <Row
                        wallets={wallets}
                        selected={isItemSelected}
                        handleClick={handleClick}
                        data={data}
                        row={row}
                        key={row?.id}
                      />
                    );
                  })}
              </TableBody>
            ) :
            <TableBody>
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell sx={{ py: 5 }} align='center' colSpan={6}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          }
          {filteredUsers.length === 0 && !isLoading && (
            <TableBody>
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                  No completed transfers yet.
                  {/*<SearchNotFound />*/}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {pagination ? (
        <Stack>
          <TablePagination
            sx={{
              '.MuiTablePagination-displayedRows': {
                margin: 0,
              },
              '.MuiTablePagination-selectLabel': {
                margin: 0,
              },
            }}
            page={page}
            component='div'
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 15, 20]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      ) : null}
    </>
  );
}
