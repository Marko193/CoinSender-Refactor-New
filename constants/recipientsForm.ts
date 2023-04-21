import * as Yup from 'yup';
import { isAddress } from '@ethersproject/address';

export const validationSchemaForRecipients = Yup.object().shape({
  name: Yup.string().min(2, 'Minimum length 2 characters').max(15, 'Maximum length 15 characters').required('Is required'),
  amount: Yup.string().matches(
    /^([9]|[1-9][0-9]{0,18}|0[.]{1}[0-9]{1,18}|[1-9][0-9]{0,18}[.]{1}[0-9]{1,18})$/,
    'Is invalid',
  ).required('Is required'),
  wallet_address: Yup.string()
    .label('Wallet address')
    .required('Is required')
    .test('Is address', 'Invalid wallet address', (value) => isAddress(value)),
});
