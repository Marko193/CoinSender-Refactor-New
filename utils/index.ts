import BigNumber from 'bignumber.js';
import { AddressMap } from '@/constants/addresses';
import { CHAIN_IDS_TO_NAMES, DEFAULT_CHAIN_ID, SupportedChainId } from '@/constants/chains';
import { getAddress } from '@ethersproject/address';
import { Contract, ContractFunction } from '@ethersproject/contracts';
import type { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber';
import { TokensMap } from '@/constants/tokens';
import { parseUnits } from '@ethersproject/units';

const parseMetamaskError = (err: Error | any) => {
  const parsedErrorObject = JSON.parse(JSON.stringify(err));
  return {
    code: parsedErrorObject.code,
    message: err.reason,
  };
};

export const DEFAULT_DECIMAL: number = 18;

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase());
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// account is not optional
export const getSigner = (provider: Web3Provider, account: string): JsonRpcSigner =>
  provider.getSigner(account).connectUnchecked();

// account is optional
export const getProviderOrSigner = (
  provider: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner => (account ? getSigner(provider, account) : provider);

// account is optional
export const getContract = (
  address: string,
  ABI: any,
  provider: Web3Provider | undefined,
  account?: string,
): Contract => {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, provider && (getProviderOrSigner(provider, account) as any));
};

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const getAddressByChainId = (address: AddressMap, chainId: number | undefined) =>
  chainId && address[chainId] ? address[chainId] : address[DEFAULT_CHAIN_ID];

export const geTokensByChainId = (tokens: TokensMap, chainId: number | undefined) =>
  chainId && tokens[chainId] ? tokens[chainId] : tokens[DEFAULT_CHAIN_ID];

export const getChainNameById = (chainId: SupportedChainId): string => CHAIN_IDS_TO_NAMES[chainId];

// add 25%
const calculateGasMargin = (value: BigNumberETH): BigNumberETH =>
  value.mul(BigNumberETH.from(10000).add(BigNumberETH.from(2500))).div(BigNumberETH.from(10000));

export const buildQuery = async <T>(
  method: ContractFunction,
  args: any[] = [],
  estimateGas?: ContractFunction | null,
  options: any = {},
): Promise<T | any> => {
  let tx;
  try {
    if (estimateGas) {
      const gasLimit = await estimateGas(...args, options);
      tx = await method(...args, {
        gasLimit: calculateGasMargin(gasLimit as BigNumberETH),
        ...options,
      });
    } else {
      tx = await method(...args, options);
    }
    if (tx?.wait) {
      await tx.wait();
    }
  } catch (err: any) {
    return parseMetamaskError(err);
  }

  return tx;
};

export function getExponentValue(decimals: number): BigNumber {
  return new BigNumber(10).pow(decimals);
}

export function getHumanValue(value: string, decimals: number = DEFAULT_DECIMAL): BigNumber {
  return new BigNumber(value).div(getExponentValue(decimals));
}

export function getNonHumanValue(value: number | string, decimals: number): string {
  if (typeof value !== 'string') {
    value = value.toString();
  }
  return parseUnits(value.toString(), decimals).toString();
}
