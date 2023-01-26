import { isAddress } from '@/utils';

export const makeShortenWalletAddress = (address = '') =>
  address.slice(0, 9) + '...' + address.slice(-3);

const amountRegex = /^\d+(\.\d{1,2})?$/;

export const validateWallets = async (array = [], setError: any) => {
  let wallets = new Set();
  let errors: any = {
    duplicateWallet: [],
    invalidWallet: [],
    invalidAmount: [],
  };

  array.forEach((item: any, index) => {
    if (!isAddress(item.wallet)) {
      errors.invalidWallet.push(item.wallet);
    }
    if (wallets.has(item.wallet)) {
      errors.duplicateWallet.push(item.wallet);
    } else {
      wallets.add(item.wallet);
    }
    if (!amountRegex.test(item.amount) || item.amount === '' || item.amount === null) {
      errors.invalidAmount.push(item.amount);
    }
  });

  if (
    errors.duplicateWallet.length > 0 ||
    errors.invalidWallet.length > 0 ||
    errors.invalidAmount.length > 0
  ) {
    let errorMessage = 'Invalid wallet address(es) detected: ';
    if (errors.invalidWallet.length > 0) {
      errorMessage += '(' + errors.invalidWallet.join(', ') + '). ';
    }
    if (errors.duplicateWallet.length > 0) {
      errorMessage +=
        'Additionally, duplicate wallet address(es) were found: (' +
        errors.duplicateWallet.join(', ') +
        '). ' +
        '\n';
    }
    if (errors.invalidAmount.length > 0) {
      errorMessage +=
        'Also, Invalid amount(s) were detected for the following wallet address(es): (' +
        errors.invalidAmount.join(', ') +
        '). ';
    }
    errorMessage += 'Please double check and make sure they are correct.';
    setError(errorMessage);
    return false;
  }

  return true;
};
