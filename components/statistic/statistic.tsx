import { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultAbiCoder } from '@ethersproject/abi';
import { hexDataSlice } from '@ethersproject/bytes';
import { geTokensByChainId, getChainNameById, getHumanValue } from '@/utils';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NetworkInfo, resetStatisticInfo, updateStatisticInfo } from '@/state/statistic/reducer';
import { TOKENS } from '@/constants/tokens';
import { MULTI_SEND_CONTRACTS } from '@/constants/addresses';
import { SupportedChainId } from '@/constants/chains';
import { formatNetworks } from '@/helpers/stringUtils';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';

const METHOD_ID = '0x9749c04a';

export const StatisticComponent = () => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  dayjs.extend(isBetween);
  dayjs.extend(isToday);

  const statisticInfo = useSelector(({ statistic }: any) => statistic.netwtorksStatistic);

  const getNetworkTransactions = async (url: string, chainId: number) => {
    const amounts: string[] = [];
    const { data } = await axios.get(url);

    if (data.status === '1') {
      const sortedTransactions = data.result.filter(({ methodId }: any) => methodId === METHOD_ID);

      sortedTransactions.forEach((item: any) => {
        amounts.push(
          defaultAbiCoder
            .decode(['address[]', 'uint256[]'], hexDataSlice(item.input, 4))[1]
            .toString(),
        );
      });

      const newArr = amounts.flatMap((item) => {
        if (item.includes(',')) {
          return item.split(',');
        } else {
          return item;
        }
      });

      let totalSum = newArr.reduce((acc, val) => Number(acc) + Number(val), 0);

      dispatch(
        updateStatisticInfo({
          networkInfo: {
            network: getChainNameById(chainId),
            currency: geTokensByChainId(TOKENS, chainId)[0].symbol,
            numberOfTransactions: sortedTransactions.length,
            totalAmount: getHumanValue(Number(totalSum).toString()).toString(),
            transactions: sortedTransactions,
          },
        }),
      );
    }
  };

  useEffect(() => {
    getNetworkTransactions(
      `https://api.polygonscan.com/api?module=account&action=txlist&address=${
        MULTI_SEND_CONTRACTS[SupportedChainId.POLYGON]
      }&startblock=0&endblock=99999999&sort=desc`,
      SupportedChainId.POLYGON,
    );
    getNetworkTransactions(
      `https://api.bscscan.com/api?module=account&action=txlist&address=${
        MULTI_SEND_CONTRACTS[SupportedChainId.BSC]
      }&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`,
      SupportedChainId.BSC,
    );
    getNetworkTransactions(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${
        MULTI_SEND_CONTRACTS[SupportedChainId.MAINNET]
      }&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`,
      SupportedChainId.MAINNET,
    );
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'network',
      headerName: 'Network',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${formatNetworks(params.row.network)}`,
    },
    {
      field: 'totalAmount',
      headerName: 'Transaction amount',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.totalAmount} ${params.row.currency}`,
    },
    {
      field: 'numberOfTransactions',
      headerName: 'Number of transactions',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
    },
  ];

  const sortDate = (period: string) => {
    const amounts = [];
    const newArray = statisticInfo.map((element) => {
      let zxc: any = [];

      switch (period) {
        case 'day':
          zxc = element.transactions.filter((transaction) =>
            dayjs.unix(transaction.timeStamp).isToday(),
          );
          break;
        case 'week':
        case 'month':
        case 'year':
          zxc = element.transactions.filter((transaction) =>
            dayjs
              .unix(transaction.timeStamp)
              .isBetween(dayjs().startOf(period), dayjs().endOf(period)),
          );
          break;

        default:
          break;
      }

      zxc.forEach((item: any) => {
        amounts.push(
          defaultAbiCoder
            .decode(['address[]', 'uint256[]'], hexDataSlice(item.input, 4))[1]
            .toString(),
        );
      });

      const newArr = amounts.flatMap((item) => {
        if (item.includes(',')) {
          return item.split(',');
        } else {
          return item;
        }
      });

      console.log(newArr);

      let totalSum = newArr.reduce((acc, val) => Number(acc) + Number(val), 0);

      //   console.log({
      //     network: element.network,
      //     currency: element.currency,
      //     totalAmount: getHumanValue(Number(totalSum).toString()).toString(),
      //     numberOfTransactions: zxc.length,
      //     transactions: element.transactions,
      //   });

      //   dispatch(
      //     updateStatisticInfo({
      //       networkInfo: {
      //         network: element.network,
      //         currency: element.currency,
      //         totalAmount: getHumanValue(Number(totalSum).toString()).toString(),
      //         numberOfTransactions: zxc.length,
      //         transactions: element.transactions,
      //       },
      //     }),
      //   );
    });
  };

  console.log(statisticInfo);

  return (
    <Grid mt={5}>
      {/* <Stack>
        <Button onClick={() => setToggle((prev) => !prev)}>Toggle</Button>
      </Stack> */}
      <Grid container spacing={3} mt={1}>
        {toggle ? (
          <Grid item xs={9.5}>
            <Stack height="70vh" width="100%">
              <DataGrid
                rows={statisticInfo.map((item, index) => ({ ...item, id: index }))}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[100]}
              />
            </Stack>
          </Grid>
        ) : (
          <Grid item xs={9.5}>
            <Stack height="70vh" width="100%">
              Графики))00
            </Stack>
          </Grid>
        )}
        <Grid item xs={2.5}>
          <Typography mb={1}>Filtered by date: (09.03.2023)</Typography>

          <Stack gap={1}>
            <Button onClick={() => sortDate('day')}>This Day</Button>
            <Button onClick={() => sortDate('week')}>This Week</Button>
            <Button onClick={() => sortDate('month')}>This Month</Button>
            <Button onClick={() => sortDate('year')}>This Year</Button>
            <Button>Custom Period</Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};
