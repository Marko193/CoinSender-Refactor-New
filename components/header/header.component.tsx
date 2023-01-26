import styles from '@/components/header/header.module.scss';
import Logo from '@/assets/Logo.svg';
import Image from 'next/image';
import { Button, Stack } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import CustomPopover from '../popover/popover';
import { updateSelectedWallet } from '@/state/user/reducer';
import { useState } from 'react';
import { useAppDispatch } from '@/state/hooks';

interface HeaderProps {
  handleOpen: () => void;
}

export const Header = ({ handleOpen }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { connector, account } = useWeb3React();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const disconnectHandler = () => {
    if (connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();
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
                  <Button onClick={disconnectHandler}>Disconnect</Button>
                </CustomPopover>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
