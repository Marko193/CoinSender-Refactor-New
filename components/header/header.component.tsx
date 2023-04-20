import { useRouter } from 'next/router';
import styles from '@/components/header/header.module.scss';
import Logo from '@/assets/Logo.svg';
import Image from 'next/image';
import { Button, Divider, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import CustomPopover from '../popover/popover';
import { updateSelectedWallet } from '@/state/user/reducer';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/state/hooks';
import { formatNetworks, makeShortenWalletAddress } from '@/helpers/stringUtils';
import { getChainNameById, getHumanValue } from '@/utils';
import useSyncChain from '@/hooks/useSyncChain';
import { ModalWindow } from '../modal/modal';
import dynamic from 'next/dynamic';
import { isSupportedChain } from '@/constants/chains';
import { useSelector } from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logoutFunction } from '@/helpers/api/auth';
import Link from 'next/link';
import Iconify from '@/components/iconify';

// @ts-ignore
const Wallet = dynamic(() => import('@/components/Wallet/wallet.component'), { ssr: false });

export const Header = ({ onOpenSidebar }: any) => {

  const [menuItem, setMenuItem] = useState('CoinSender');

  const router: any = useRouter();
  useSyncChain();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const isLoading = useSelector(({ loader: { isLoading } }: any) => isLoading);

  const { connector, account, chainId, provider } = useWeb3React();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!account) {
        handleWalletModal();
        setAnchorEl(null);
        return;
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [account]);

  useEffect(() => {
    // FIXME: PLEASE DON"T TOUCH :D
    async function fetchBalance() {
      if (provider && account && isSupportedChain(chainId)) {
        const bal = (await provider.getBalance(account)).toString();

        setBalance(bal);
      }
    }

    if (chainId === undefined) {
      setBalance('0');
    } else {
      fetchBalance();
    }
  }, [chainId, account, provider, connector]);

  const disconnectHandler = useCallback(async () => {
    if (connector.deactivate) {
      await connector.deactivate();
    }
    connector.resetState();
    dispatch(updateSelectedWallet({ wallet: undefined }));
  }, []);

  const handleWalletModal = useCallback(() => {
    setOpenWalletModal((prev) => !prev);
  }, []);

  const changeMenuItem = (event: SelectChangeEvent) => {
    setMenuItem(event.target.value as string);
    switch (event.target.value) {
      case 'CoinSender':
        router.push('/');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerItems}>
          <div className={`${styles.wallet}`}>
            <IconButton
              onClick={onOpenSidebar}
              className={styles.sidebar_burger_mobile}
              sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
            >
              <Iconify icon='eva:menu-2-fill' />
            </IconButton>
            <div className={styles.mobile_btns_row}>
              {!account ? (
                <Button
                  variant='contained'
                  disabled={isLoading}
                  sx={{
                    fontSize: { xs: '8px', md: '12px' },
                    padding: { xs: '6px', md: '6px 16px' },
                  }}
                  onClick={handleWalletModal}
                >
                  Connect wallet
                </Button>
              ) : (
                <>
                  <Button
                    variant='contained'
                    onClick={handleClick}
                    disabled={isLoading}
                    sx={{
                      fontSize: { xs: '8px', md: '12px' },
                      padding: { xs: '6px', md: '6px 16px' },
                    }}
                  >
                    {makeShortenWalletAddress(account)}
                  </Button>
                  <CustomPopover anchorEl={anchorEl} handleClose={handleClose}>
                    <Stack gap={1}>
                      <Stack>
                        Network:{' '}
                        {chainId &&
                          isSupportedChain(chainId) &&
                          formatNetworks(getChainNameById(chainId))}
                      </Stack>
                      <Divider />
                      <Stack>Wallet Address: {makeShortenWalletAddress(account)}</Stack>
                      <Divider />
                      <Stack>Balance: {balance ? getHumanValue(balance).toString() : 0}</Stack>
                      <Stack>
                        <Button onClick={() => disconnectHandler()}>Disconnect</Button>
                      </Stack>
                    </Stack>
                  </CustomPopover>
                </>
              )}

                <ExitToAppIcon sx={{ color: 'black' }} onClick={() => logoutFunction()} className={styles.exit_icon} />
            </div>
          </div>
        </div>
        <ModalWindow open={openWalletModal} handleClose={handleWalletModal}>

          <Wallet handleClose={handleWalletModal} />
        </ModalWindow>
      </div>
    </>
  );
};
