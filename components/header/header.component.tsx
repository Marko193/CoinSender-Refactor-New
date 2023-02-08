import styles from '@/components/header/header.module.scss';
import Logo from '@/assets/Logo.svg';
import Image from 'next/image';
import { Button, Divider, Stack } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import CustomPopover from '../popover/popover';
import { updateSelectedWallet } from '@/state/user/reducer';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '@/state/hooks';
import { formatNetworks, makeShortenWalletAddress } from '@/helpers/stringUtils';
import { getChainNameById, getHumanValue } from '@/utils';
import useSyncChain from '@/hooks/useSyncChain';
import { ModalWindow } from '../modal/modal';
import dynamic from 'next/dynamic';
import { isSupportedChain } from '@/constants/chains';

const Wallet = dynamic(() => import('@/components/Wallet/wallet.component'), { ssr: false });

export const Header = () => {
  useSyncChain();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [openWalletModal, setOpenWalletModal] = useState(false);

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
      if (provider && account) {
        const bal = (await provider.getBalance(account)).toString();
        setBalance(bal);
      }
    }
    if (chainId === undefined) {
      setBalance('0');
    } else {
      fetchBalance();
    }
  }, [chainId]);

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

  return (
    <>
      <Stack
        py={0.5}
        sx={{ background: '#e7e7e7' }}
        textAlign="center"
        fontSize="14px"
        color="black"
      >
        This is a beta version of the application. Use at your own risk.
      </Stack>
      <div className={styles.headerContainer}>
        <div className={styles.headerItems}>
          <div className="logo">
            <a href="#" className="logo-link">
              <Image src={Logo} alt="Logo" />
            </a>
          </div>
          <div className={styles.wallet}>
            {!account ? (
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: '8px', md: '12px' },
                  padding: { xs: '6px', md: '6px 16px' },
                }}
                onClick={handleWalletModal}
              >
                Connect a wallet
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  sx={{
                    fontSize: { xs: '8px', md: '12px' },
                    padding: { xs: '6px', md: '6px 16px' },
                  }}
                >
                  Info
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
                    <Stack>Balance: {getHumanValue(balance).toString()}</Stack>
                    <Stack>
                      <Button onClick={() => disconnectHandler()}>Disconnect</Button>
                    </Stack>
                  </Stack>
                </CustomPopover>
              </>
            )}
          </div>
        </div>
        <ModalWindow open={openWalletModal} handleClose={handleWalletModal}>
          <Wallet handleClose={handleWalletModal} />
        </ModalWindow>
      </div>
    </>
  );
};
