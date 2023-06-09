import { LoaderState } from '@/state/loader/reducer';
import { Checkbox, IconButton, TableCell, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { isAddress } from '@/utils';

interface RowProps {
  loaderState: LoaderState;
  handleClick: (event: React.MouseEvent<unknown>, row: any, rowId: number) => void;
  isItemSelected: boolean;
  labelId: string;
  row: any;
  handleEditRow: (id: number) => void;
  handleCancelEditRow: (id: number) => void;
  handleSaveEditRow: any;
  data: any;
}

export const Row = ({
                      loaderState,
                      handleClick,
                      isItemSelected,
                      labelId,
                      row,
                      handleEditRow,
                      handleCancelEditRow,
                      handleSaveEditRow,
                      data,
                    }: RowProps) => {

  // console.log('row', row);

  const [inputValues, setInputValues] = useState({
    data: {
      id: row.id,
      employee_name: row.employee_name,
      wallet_address: row.wallet_address,
      amount: row.amount,
    },
    errors: {
      employee_name: '',
      wallet_address: '',
      amount: '',
    },
  });

  const amountRegex =
    /^([9]|[1-9][0-9]{0,18}|0[.]{1}[0-9]{1,18}|[1-9][0-9]{0,18}[.]{1}[0-9]{1,18})$/;

  const isValid =
    !inputValues.errors.amount &&
    !inputValues.errors.employee_name &&
    !inputValues.errors.wallet_address &&
    Boolean(inputValues.data.employee_name && inputValues.data.wallet_address && inputValues.data.amount);

  const someItemIsEditing: boolean = data && data?.some(({ isEdit }: any) => isEdit);

  const handleSelectRow = (event: any) =>
    !loaderState.isLoading && !someItemIsEditing && handleClick(event, row, row.id as number);

  const handleChangeName = ({ target: { value } }: any) => {
    if (!value) {
      setInputValues({
        errors: { ...inputValues.errors, employee_name: 'Is required' },
        data: { ...inputValues.data, employee_name: value },
      });
    }
    if (value.length > 20) {
      setInputValues({
        errors: { ...inputValues.errors, employee_name: 'Too large!' },
        data: { ...inputValues.data, employee_name: value },
      });
      return;
    }
    if (value) {
      setInputValues({
        errors: { ...inputValues.errors, employee_name: '' },
        data: { ...inputValues.data, employee_name: value },
      });
      return;
    }
  };

  const handleChangeWallet = ({ target: { value } }: any) => {
    const wallet = data.find(({ wallet, id }: any) => id !== row.id && wallet === value);
    if (!value) {
      setInputValues({
        errors: { ...inputValues.errors, wallet_address: 'Is requried' },
        data: { ...inputValues.data, wallet_address: value },
      });
      return;
    }

    if (isAddress(value) && !wallet) {
      setInputValues({
        errors: { ...inputValues.errors, wallet_address: '' },
        data: { ...inputValues.data, wallet_address: value },
      });
      return;
    }

    if (Boolean(isAddress(value) && wallet)) {
      setInputValues({
        errors: { ...inputValues.errors, wallet_address: 'Wallet already exists!' },
        data: { ...inputValues.data, wallet_address: value },
      });
      return;
    }

    if (!isAddress(value)) {
      setInputValues({
        errors: { ...inputValues.errors, wallet_address: 'Is invalid' },
        data: { ...inputValues.data, wallet_address: value },
      });
      return;
    }
  };

  const handleChangeAmount = ({ target: { value } }: any) => {
    if (value && value.match(amountRegex)) {
      setInputValues({
        errors: { ...inputValues.errors, amount: '' },
        data: { ...inputValues.data, amount: value },
      });
    }
    if (value && !value.match(amountRegex)) {
      setInputValues({
        errors: { ...inputValues.errors, amount: 'Is invalid' },
        data: { ...inputValues.data, amount: value },
      });
    }
    if (!value) {
      setInputValues({
        errors: { ...inputValues.errors, amount: 'Is required' },
        data: { ...inputValues.data, amount: value },
      });
    }
  };

  // console.log('data', data);

  return (
    <>
      {row.isEdit ? (
        <TableRow
          hover
          role='checkbox'
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.id}
          selected={isItemSelected}
          sx={{ height: '90px' }}
        >
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              checked={isItemSelected}
              disabled={true}
              inputProps={{
                'aria-labelledby': labelId,
              }}
            />
          </TableCell>
          <TableCell onClick={handleSelectRow} component='th' id={labelId} scope='row' align='center'>
            {data.indexOf(row) + 1}
          </TableCell>
          <TableCell component='th' id={labelId} scope='row' align='center'>
            <TextField
              size='small'
              sx={{ position: 'relative' }}
              defaultValue={inputValues.data.employee_name}
              onChange={handleChangeName}
              onBlur={handleChangeName}
              error={Boolean(inputValues.errors.employee_name)}
              helperText={inputValues.errors.employee_name}
            />
          </TableCell>
          <TableCell align='center'>
            <TextField
              size='small'
              fullWidth
              defaultValue={inputValues.data.wallet_address}
              onChange={handleChangeWallet}
              onBlur={handleChangeWallet}
              error={Boolean(inputValues.errors.wallet_address)}
              helperText={inputValues.errors.wallet_address}

            />
          </TableCell>
          <TableCell align='center'>
            <TextField
              size='small'
              defaultValue={Number(inputValues.data.amount).toString()}
              onChange={handleChangeAmount}
              onBlur={handleChangeAmount}
              error={Boolean(inputValues.errors.amount)}
              helperText={inputValues.errors.amount}
            />
          </TableCell>
          <TableCell align='right'>
            <IconButton
              size='small'
              disabled={!isValid}
              onClick={() => handleSaveEditRow({data: inputValues.data, isNew: row.isNew})}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => {
                setInputValues({
                  data: {
                    id: row.id,
                    employee_name: row.employee_name,
                    wallet_address: row.wallet_address,
                    amount: row.amount,
                  },
                  errors: {
                    employee_name: '',
                    wallet_address: '',
                    amount: '',
                  },
                });
                handleCancelEditRow(row.id);
              }}
            >
              <ClearIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow
          hover
          role='checkbox'
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.id}
          selected={isItemSelected}
        >
          <TableCell onClick={handleSelectRow} padding='checkbox'>
            <Checkbox
              color='primary'
              checked={isItemSelected}
              disabled={loaderState.isLoading || someItemIsEditing}
              inputProps={{
                'aria-labelledby': labelId,
              }}
            />
          </TableCell>
          <TableCell onClick={handleSelectRow} component='th' id={labelId} scope='row' align='center'>
            {data.indexOf(row) + 1}
          </TableCell>
          <TableCell onClick={handleSelectRow} component='th' id={labelId} scope='row' align='center'>
            {row.employee_name}
          </TableCell>
          <TableCell onClick={handleSelectRow} align='center'>
            {row.wallet_address}
          </TableCell>
          <TableCell onClick={handleSelectRow} align='center'>
            {Number(row.amount).toString()}
          </TableCell>
          <TableCell align='right'>
            <IconButton
              onClick={() => {
                setInputValues({
                  data: {
                    id: row.id,
                    employee_name: row.employee_name,
                    wallet_address: row.wallet_address,
                    amount: row.amount,
                  },
                  errors: {
                    employee_name: '',
                    wallet_address: '',
                    amount: '',
                  },
                });
                handleEditRow(row.id);
              }}
              size='small'
            >
              <EditIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
