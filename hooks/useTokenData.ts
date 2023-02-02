import { useEffect, useMemo, useState } from 'react';
import { useTokenContract } from '@/hooks/useContract';
import { useDispatch } from 'react-redux';
import { buildQuery, getHumanValue, geTokensByChainId, getAddressByChainId } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useMutation, useQuery } from 'react-query';
import { TOKENS } from '@/constants/tokens';
import {
  ALLOWANCE_KEY,
  APPROVE_MUTATION_KEY,
  BALANCE_OF_QUERY_KEY,
  DECIMALS_QUERY_KEY,
  NAME_QUERY_KEY,
  SYMBOL_QUERY_KEY,
} from '@/constants/queryKeys';
import { MULTI_SEND_CONTRACTS } from '@/constants/addresses';
import { MaxUint256 } from '@ethersproject/constants';
import { updateConnectionError } from '@/state/connection/reducer';
import { getConnection } from '@/connection/utils';
import { DEFAULT_CHAIN_ID } from '@/constants/chains';

const MIN_TRANSFER_VALUE = 0.1;

export default function useTokenData(tokenAddress: string) {
  const { account, chainId, connector } = useWeb3React();
  const [tokenDataError, setTokenDataError] = useState(false);
  const dispatch = useDispatch();
  const connectionType = getConnection(connector).type;

  const {
    balanceOf: balanceOfQuery,
    symbol: symbolQuery,
    name: nameQuery,
    allowance: allowanceQuery,
    decimals: decimalsQuery,
    approve: approveAction,
    estimateGas: { approve: approveEstimate },
  } = useTokenContract(tokenAddress || geTokensByChainId(TOKENS, DEFAULT_CHAIN_ID)[0].address);

  const { data: tokenName, refetch: refetchTokenName } = useQuery(
    `${NAME_QUERY_KEY}_${tokenAddress}`,
    (): Promise<any> => buildQuery(nameQuery),
    {
      onError: (err: any) => {
        dispatch(updateConnectionError({ connectionType, error: 'User rejected transaction' }));
        console.log(err, `${SYMBOL_QUERY_KEY}_${tokenAddress}`);
      },
      enabled: !!account && !!tokenAddress,
    },
  );

  const { data: tokenSymbol, refetch: refetchTokenSymbol } = useQuery(
    `${SYMBOL_QUERY_KEY}_${tokenAddress}`,
    (): Promise<any> => buildQuery(symbolQuery),
    {
      // onError: (err: Error) => console.log(err, `${SYMBOL_QUERY_KEY}_${tokenAddress}`),
      onError: (err: any) => {
        dispatch(updateConnectionError({ connectionType, error: 'User rejected transaction' }));
        console.log(err, `${SYMBOL_QUERY_KEY}_${tokenAddress}`);

        // onError: (err: Error) => console.log(err, `${DECIMALS_QUERY_KEY}_${tokenAddress}`)
      },
      enabled: !!account && !!tokenAddress,
    },
  );

  const { data: tokenDecimals, refetch: refetchTokenDecimals } = useQuery(
    `${DECIMALS_QUERY_KEY}_${tokenAddress}`,
    (): Promise<any> => buildQuery(decimalsQuery),
    {
      onError: (err: any) => {
        dispatch(updateConnectionError({ connectionType, error: 'User rejected transaction' }));
        console.log(err, `${BALANCE_OF_QUERY_KEY}_${tokenAddress}_${account}`);
      },
      enabled: !!account && !!tokenAddress,
    },
  );

  const { data: tokenBalance, refetch: refetchTokenBalance } = useQuery(
    `${BALANCE_OF_QUERY_KEY}_${tokenAddress}_${account}`,
    (): Promise<any> => buildQuery(balanceOfQuery, [account]),
    {
      enabled: !!account && !!tokenAddress,
      onError: (err: any) => {
        dispatch(updateConnectionError({ connectionType, error: 'User rejected transaction' }));
        console.log(err, `${BALANCE_OF_QUERY_KEY}_${tokenAddress}_${account}`);
      },
    },
  );

  const {
    data: tokenAllowance,
    refetch: refetchAllowance,
    isLoading: isAllowanceLoading,
  } = useQuery(
    `${ALLOWANCE_KEY}_${tokenAddress}_${account}`,
    (): Promise<any> =>
      buildQuery(allowanceQuery, [account, getAddressByChainId(MULTI_SEND_CONTRACTS, chainId)]),
    {
      enabled: !!account && !!tokenAddress,
      onError: (err) => {
        dispatch(updateConnectionError({ connectionType, error: 'User rejected transaction' }));
        console.log(err, `${ALLOWANCE_KEY}_${tokenAddress}_${account}`);
      },
    },
  );

  const { mutateAsync: approve, isLoading: isApproveLoading } = useMutation(
    `${APPROVE_MUTATION_KEY}_${tokenAddress}`,
    (): Promise<any> =>
      buildQuery(
        approveAction,
        [getAddressByChainId(MULTI_SEND_CONTRACTS, chainId), MaxUint256],
        approveEstimate,
      ),
    {
      onError: (err: any) => {
        dispatch(updateConnectionError({ connectionType, error: 'User rejected transaction' }));
        console.log(err, `${APPROVE_MUTATION_KEY}_${tokenAddress}`);
      },
    },
  );

  useEffect(() => {
    if (!tokenAddress) setTokenDataError(true);
    if (account && tokenAddress && !tokenAllowance) {
      refetchAllowance();
    }
  }, [account, tokenAllowance, tokenAddress]);

  const isAllowed = useMemo(() => {
    if (tokenBalance && tokenAllowance) {
      return (
        +getHumanValue(tokenAllowance.toString(), tokenDecimals).toString() >= MIN_TRANSFER_VALUE &&
        +getHumanValue(tokenBalance.toString(), tokenDecimals).toString() >= MIN_TRANSFER_VALUE
      );
    } else return false;
  }, [tokenBalance, tokenAllowance]);

  return useMemo(() => {
    return {
      tokenDataError,
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenBalance,
      tokenAllowance,
      approve,
      isAllowed,
      refetchAllowance,
    };
  }, [
    tokenDataError,
    tokenAddress,
    tokenName,
    tokenSymbol,
    tokenDecimals,
    tokenBalance,
    tokenAllowance,
    approve,
    isAllowed,
    refetchAllowance,
  ]);
}
