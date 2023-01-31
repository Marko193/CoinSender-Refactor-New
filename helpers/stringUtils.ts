import { isAddress } from '@/utils';

export const makeShortenWalletAddress = (address = '') =>
  address.slice(0, 9) + '...' + address.slice(-3);

const amountRegex = /^\d+(\.\d{1,18})?$|^\d+$/;

export const validateWallets = async (array = [], setError: any) => {
  let wallets = new Set();
  let errors: any = {
    duplicateWallet: [],
    invalidWallet: [],
    invalidAmount: [],
  };

  array.forEach((item: any) => {
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
    let errorMessage =
      errors.duplicateWallet.length || errors.invalidWallet.length || errors.invalidAmount.length
        ? 'Invalid data found: '
        : '';
    if (errors.invalidWallet.length > 0) {
      errorMessage += '\n— Field «Wallet» must contain a valid wallet. ';
    }
    if (errors.duplicateWallet.length > 0) {
      errorMessage +=
        '\n— duplicate wallet address(es) were found: (' + errors.duplicateWallet.join(', ') + ')';
    }
    if (errors.invalidAmount.length > 0) {
      errorMessage +=
        `\n— Field «Amount» must contain a number, a valid delimiter is a dot (0.01), but your value(-s): ` +
        '(' +
        errors.invalidAmount.join(', ') +
        ').';
    }
    errorMessage += '\nPlease double check and make sure they are correct.';
    setError(errorMessage);
    return false;
  }

  return true;
};

export const formatNetworks = (str: string): string => {
  const words = str.split('_').map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return words.join(' ');
};
