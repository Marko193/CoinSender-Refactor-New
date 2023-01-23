import { Contract } from '@ethersproject/contracts';

import ERC20_ABI from '@/web3/abi/ERC20.json';
import MULTI_SEND_ABI from '@/web3/abi/MultiSend.json';
import { useWeb3React } from '@web3-react/core';
import { DEFAULT_CHAIN_ID } from '@/constants/chains';
import { getAddressByChainId, getContract } from '@/utils';
import { AddressMap, MULTI_SEND_CONTRACTS } from '@/constants/addresses';

function useContractByChainId(
  address: AddressMap,
  ABI: any,
  withSignerIfPossible = true,
): Contract {
  const { provider, account } = useWeb3React();

  return getContract(
    getAddressByChainId(address, DEFAULT_CHAIN_ID),
    ABI,
    provider,
    withSignerIfPossible && account ? account : undefined,
  );
}

function useContract(address: string, ABI: any, withSignerIfPossible = true): Contract {
  const { provider, account } = useWeb3React();
  return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
}

export const useTokenContract = (tokenAddress: string, withSignerIfPossible?: boolean): Contract =>
  useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);

export const useMultiSendContract = (): Contract =>
  useContractByChainId(MULTI_SEND_CONTRACTS, MULTI_SEND_ABI);
