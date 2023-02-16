import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { LoaderState } from '@/state/loader/reducer';
import { Button, Stack, TextField } from '@mui/material';

interface Data {
  name: string;
  wallet: string;
  amount: string;
  date: string;
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

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'wallet',
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
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
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
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, loader } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            disabled={loader.isLoading}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              //   onClick={createSortHandler(headCell.id)}
            > */}
            {headCell.label}
            {/* {orderBy === headCell.id ? (
                <Box component="span">
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
            {/* </TableSortLabel> */}
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
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, data, setValue, setTableData, setSelectedRows } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} rows selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              const selectedIds = selected.map(({ id }: any) => id);
              const result = data.filter(({ id }: any) => !selectedIds.includes(id));
              if (result) {
                setValue(result);
                setTableData(result);
                setSelectedRows([]);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable({
  data,
  setSelectedRows,
  selectedRows,
  setValue,
  setTableData,
}: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const loaderState: LoaderState = useSelector(({ loader }: any) => loader);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && selectedRows.length === 0) {
      setSelectedRows(data);
      return;
    } else {
      setSelectedRows([]);
    }
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

  const emptyRows = data.length === 0;

  console.log(isEditing);

  return (
    <>
      <EnhancedTableToolbar
        setValue={setValue}
        setTableData={setTableData}
        data={data}
        selected={selectedRows}
        numSelected={selectedRows.length}
        setSelectedRows={setSelectedRows}
      />

      <TableContainer
        sx={{
          height: '55vh',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          width: 'auto',
        }}
      >
        <Table
          sx={{ minWidth: 750, borderRadius: '8px' }}
          aria-labelledby="tableTitle"
          size={'medium'}
          stickyHeader
        >
          <EnhancedTableHead
            numSelected={selectedRows.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            loader={loaderState}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.id as number);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  onClick={(event) =>
                    !loaderState.isLoading && handleClick(event, row, row.id as number)
                  }
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      disabled={loaderState.isLoading}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.wallet}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                  <TableCell align="left">
                    {row.date
                      ? moment(row.date).format('MMMM Do YYYY, h:mm:ss a')
                      : 'No transaction yet'}
                  </TableCell>
                  {/* <TableCell align="left" onClick={() => setIsEditing((prev) => !prev)}>
                    Edit
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
          {emptyRows && (
            <TableBody>
              <TableRow sx={{ height: '48vh' }}>
                <TableCell colSpan={5} sx={{ border: 'none' }}>
                  <Stack sx={{ width: '100%' }} textAlign="center" spacing={2}>
                    Upload the list to make a transaction!
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
