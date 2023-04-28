import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { LoaderState } from '@/state/loader/reducer';
import { Alert, Button, MenuItem, Pagination, Select, Stack, styled } from '@mui/material';
import { Row } from './Row';
import { addTransfer, removeTransfers, updateTransfer } from '@/services/transfers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';

interface Data {
  employee_name: string;
  wallet_address: string;
  amount: string;
  company_id: string;
  date: string;
  edit: string;
  id: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  if (array) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  return [];
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'employee_name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'wallet_address',
    numeric: false,
    disablePadding: false,
    label: 'Wallet',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'edit',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  loader: LoaderState;
  someIsEditing: boolean;
  data: any;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    loader,
    someIsEditing,
    data,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            disabled={
              loader.isLoading || someIsEditing || !Array.isArray(data) || data.length === 0
            }
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: any;
  data: any;
  setValue: any;
  setTableData: any;
  setSelectedRows: any;
  setPage: any;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, data, setValue, setTableData, setSelectedRows, setPage } = props;

  const deleteTransfers = async (selected: any) => {
    const transfer_ids = selected.map(({ id }: any) => id);
    try {
      const response = await removeTransfers(transfer_ids);

      if (response.status === 204) {
        toast.success('The transfer was successfully deleted.');

        const result = data.filter(({ id }: any) => !transfer_ids.includes(id));
        if (result) {
          setValue(result);
          setTableData(result);
          setSelectedRows([]);
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  // console.log('data', data);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        border: '1px solid #e0e0e0',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        borderBottom: 'none',
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
        {numSelected} rows selected
      </Typography>

      {numSelected > 0 && (
        <Tooltip title='Delete'>
          <IconButton
            onClick={() => {
              deleteTransfers(selected);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      <Button
        sx={{ ml: 2 }}
        onClick={() => {
          setPage(1);
          setValue([
            {
              id:
                data.length > 0
                  ?
                  // data.length + 1
                  data[0].id > data[data.length - 1].id
                    ? data[0].id + 1
                    : data[data.length - 1].id + 1
                  : 1,
              employee_name: '',
              wallet_address: '',
              amount: '',
              company_id: '',
              isEdit: true,
              isNew: true,
            },
            ...data,
          ]);
        }}
      >
        Add row
      </Button>
    </Toolbar>
  );
}

export default function EnhancedTable({
                                        data,
                                        setSelectedRows,
                                        selectedRows,
                                        setValue,
                                        setTableData,
                                        page,
                                        setPage, isLoading,
                                      }: any) {

  // console.log('data', {
  //   data,
  //   setSelectedRows,
  //   selectedRows,
  //   setValue,
  //   setTableData,
  //   page,
  //   setPage,
  // });

  // console.log('setSelectedRows', selectedRows);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const [rowsPerPage, setRowsPerPage] = React.useState(150);

  const loaderState: LoaderState = useSelector(({ loader }: any) => loader);

  const someIsEditing = data && data.some(({ isEdit }: any) => isEdit);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortById = (data: any) => {
    if (data) {
      return data.sort((a: any, b: any) => b.id - a.id);
    }
    return data;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Array.isArray(data)) {
      if (event.target.checked && selectedRows.length === 0) {
        setSelectedRows(data);
        return;
      }
    }

    setSelectedRows([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: any, rowId: number) => {
    const selectedIndex = selectedRows.map((item: any) => item.id).indexOf(rowId);

    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }
    setSelectedRows(newSelected);
  };

  const isSelected = (rowId: number) => {
    return selectedRows.map(({ id }: any) => id).indexOf(rowId) !== -1;
  };

  const emptyRows = !(data && data.length);

  const TableAlert = styled(Alert)(() => ({
    background: 'inherit',
    color: 'black',
    border: '1px solid #e0e0e0',
    borderTop: 'none',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    svg: {
      color: 'black',
    },
  }));

  const handleEditRow = (id: number) => {
    // console.log('id', id);
    const isSelected = selectedRows.some((item: any) => item.id === id);
    if (isSelected) {
      const result = selectedRows.filter((item: any) => item.id !== id);
      setSelectedRows(result);
    }
    const updatedData = data.map((item: any) =>
      item.id === id ? { ...item, isEdit: true } : item,
    );
    setValue(updatedData);
  };

  const handleCancelEditRow = (id: number) => {
    const currentItem = data.find((item: any) => item.id === id);
    if (currentItem.isNew) {
      setValue(data.filter((item: any) => item.id !== id));
      return;
    }
    const updatedData = data.map((item: any) =>
      item.id === id ? { ...item, isEdit: false } : item,
    );
    setValue(updatedData);
  };

  const handleSaveEditRow = async (values: any) => {
    // console.log('values', values);
    try {
      let response;

      if (values.isNew == true) {
        response = await addTransfer({ ...values.data });
      } else {
        response = await updateTransfer({...values.data
          // ,  paid_at: moment().format('YYYY-MM-DD HH:mm:ss')
        });
      }

      toast.success(response.data.message);

      const updatedData = data.map((item: any) =>
        item.id === values.data.id ? { ...values.data, isEdit: false, isNew: false } : item,
      );

      // console.log('updatedData', updatedData);

      setValue(updatedData);

    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <>
        <EnhancedTableToolbar
          setValue={setValue}
          setTableData={setTableData}
          data={data}
          selected={selectedRows}
          numSelected={selectedRows?.length}
          setSelectedRows={setSelectedRows}
          setPage={setPage}
        />

        <TableContainer
          sx={{
            // height: '55vh',
            borderRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            width: 'auto',
          }}
        >
          <Table
            sx={{ minWidth: 750, borderRadius: '8px' }}
            aria-labelledby='tableTitle'
            size={'medium'}
            stickyHeader
          >
            <EnhancedTableHead
              numSelected={selectedRows?.length}
              order={order}
              data={data}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data?.length}
              loader={loaderState}
              someIsEditing={someIsEditing}
            />
            {isLoading ? (
              <TableRow>
                <TableCell align='center' colSpan={7}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
                <TableBody>
                  {stableSort(sortById(data), getComparator(order, orderBy))
                    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id as number);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <React.Fragment key={row.id}>
                          <Row
                            loaderState={loaderState}
                            handleClick={handleClick}
                            handleEditRow={handleEditRow}
                            row={row}
                            labelId={labelId}
                            isItemSelected={isItemSelected}
                            handleCancelEditRow={handleCancelEditRow}
                            handleSaveEditRow={handleSaveEditRow}
                            data={data}
                          />
                        </React.Fragment>
                      );
                    })}
                </TableBody>
                {emptyRows && (
                  <TableBody>
                    <TableRow sx={{ height: '48vh' }}>
                      <TableCell colSpan={7} sx={{ border: 'none' }}>
                        <Stack sx={{ width: '100%' }} textAlign='center' spacing={2}>
                          Upload the list to make a transaction!
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </>
            )}

          </Table>
        </TableContainer>
        <TableAlert
          severity='info'
          sx={{
            '.MuiAlert-icon': { display: 'flex', alignItems: 'center' },
            '.MuiAlert-message': { flex: 1 },
          }}
        >
          <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
            <Stack>
              We take a 0.1% fee per transaction from the payer. The total amount already includes the
              fee.
            </Stack>
            {Math.ceil(data?.length / rowsPerPage) > 1 && (
              <Stack flexDirection='row' alignItems='center' gap={2}>
                <Typography fontSize='14px'>Rows per page: </Typography>
                <Select
                  size='small'
                  disabled={loaderState.isLoading || someIsEditing}
                  onChange={(e: any) => {
                    setRowsPerPage(e.target.value);
                    setPage(1);
                  }}
                  value={rowsPerPage}
                >
                  <MenuItem value={150}>150</MenuItem>
                  <MenuItem value={300}>300</MenuItem>
                  <MenuItem value={500}>500</MenuItem>
                </Select>
              </Stack>
            )}
          </Stack>
        </TableAlert>
        <Stack justifyContent='center' alignItems='center' mt={2}>
          {Math.ceil(data?.length / rowsPerPage) > 1 && (
            <Pagination
              count={Math.ceil(data?.length / rowsPerPage)}
              page={page}
              defaultPage={1}
              onChange={handleChangePage}
              variant='outlined'
              disabled={loaderState.isLoading || someIsEditing}
            />
          )}
        </Stack>

      </>
      <ToastContainer />
    </>
  );
}
