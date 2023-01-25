export const makeShortenWalletAddress = (address = '') =>
  address.slice(0, 9) + '...' + address.slice(-3);
