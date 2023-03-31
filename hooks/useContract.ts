import { Contract } from '@ethersproject/contracts';

import ERC20_ABI from '@/web3/abi/ERC20.json';
import MULTI_SEND_ABI from '@/web3/abi/MultiSend.json';
import { useWeb3React } from '@web3-react/core';
import { DEFAULT_CHAIN_ID, SupportedChainId } from '@/constants/chains';
import {
  getAddressByChainId,
  getContract,
  getContractSapphire,
  getContractSapphireSigned,
  getSignContract,
  getSignContractSapphire,
} from '@/utils';
import { AddressMap, MULTI_SEND_CONTRACTS } from '@/constants/addresses';
// import * as sapphire from '@oasisprotocol/sapphire-paratime';

function useContractByChainId(
  address: AddressMap,
  ABI: any,
  withSignerIfPossible = true,
): Contract {
  const { provider, account, chainId } = useWeb3React();

  if (chainId === SupportedChainId.OASIS_SAPPHIRE) {
    return getSignContractSapphire(
      getAddressByChainId(address, chainId || DEFAULT_CHAIN_ID),
      ABI,
      provider,
      withSignerIfPossible && account ? account : undefined,
    );
  } else {
    return getSignContract(
      getAddressByChainId(address, chainId || DEFAULT_CHAIN_ID),
      ABI,
      provider,
      withSignerIfPossible && account ? account : undefined,
    );
  }
}

// function useContractByChainId(
//   address: AddressMap,
//   ABI: any,
//   withSignerIfPossible = true,
// ): Contract {
//   const { provider, account, chainId } = useWeb3React();

//   return getContract(
//     getAddressByChainId(address, chainId || DEFAULT_CHAIN_ID),
//     ABI,
//     provider,
//     withSignerIfPossible && account ? account : undefined,
//   );
// }

function useContract(address: string, ABI: any, withSignerIfPossible = true): Contract {
  const { provider, account } = useWeb3React();
  return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
}

function useContractSapphire(address: string, ABI: any, withSignerIfPossible = true): Contract {
  const { provider, account } = useWeb3React();
  return getContractSapphire(
    address,
    ABI,
    provider,
    withSignerIfPossible && account ? account : undefined,
  );
}

function useContractSapphireSigned(
  address: string,
  ABI: any,
  withSignerIfPossible = true,
): Contract {
  const { provider, account } = useWeb3React();
  return getContractSapphireSigned(
    address,
    ABI,
    provider,
    withSignerIfPossible && account ? account : undefined,
  );
}

export const useTokenContract = (
  tokenAddress: string,
  withSignerIfPossible?: boolean,
): Contract => {
  const { chainId } = useWeb3React();

  if (chainId === SupportedChainId.OASIS_SAPPHIRE) {
    return useContractSapphire(tokenAddress, ERC20_ABI, withSignerIfPossible);
  } else {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
  }
};

export const useTokenContractSigned = (
  tokenAddress: string,
  withSignerIfPossible?: boolean,
): Contract => {
  const { chainId } = useWeb3React();

  if (chainId === SupportedChainId.OASIS_SAPPHIRE) {
    return useContractSapphireSigned(tokenAddress, ERC20_ABI, withSignerIfPossible);
  } else {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
  }
};

export const useMultiSendContract = (): Contract =>
  useContractByChainId(MULTI_SEND_CONTRACTS, MULTI_SEND_ABI);
