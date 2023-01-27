import styles from '@/components/header/header.module.scss';
import Logo from '@/assets/Logo.svg';
import Image from 'next/image';
import { Button, Divider, Stack } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import CustomPopover from '../popover/popover';
import { updateSelectedWallet } from '@/state/user/reducer';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/state/hooks';
import { formatNetworks, makeShortenWalletAddress } from '@/helpers/stringUtils';
import { geTokensByChainId, getChainNameById } from '@/utils';
import { TOKENS } from '@/constants/tokens';
import useSyncChain from '@/hooks/useSyncChain';

interface HeaderProps {
  handleOpen: () => void;
}

export const Header = ({ handleOpen }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [balance, setBalance] = useState<string>('');

  const { connector, account, chainId, provider } = useWeb3React();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useSyncChain();

  useEffect(() => {
    async function fetchBalance() {
      if (provider) {
        const bal = (await provider.getBalance(account)).toString();

        setBalance(bal);
      }
    }

    fetchBalance();

    return () => {};
  }, []);

  const disconnectHandler = async () => {
    if (connector.deactivate) {
      await connector.deactivate();
    }
    await connector.resetState();
    dispatch(updateSelectedWallet({ wallet: undefined }));
  };

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
                onClick={handleOpen}
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
                    <Stack>Network: {chainId && formatNetworks(getChainNameById(chainId))}</Stack>
                    <Divider />
                    <Stack>Wallet Address: {makeShortenWalletAddress(account)}</Stack>
                    <Divider />
                    <Stack>Balance: {balance}</Stack>
                    <Stack>
                      <Button onClick={disconnectHandler}>Disconnect</Button>
                    </Stack>
                  </Stack>
                </CustomPopover>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
