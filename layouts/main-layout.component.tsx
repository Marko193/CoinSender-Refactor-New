import { FunctionComponent, ReactNode, useEffect, useState, useCallback } from 'react';
import { Header } from '@/components/header/header.component';
import { Container } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import dynamic from 'next/dynamic';
import { ModalWindow } from '@/components/modal/modal';

interface MainLayoutProps {
  children: ReactNode;
}
export const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { account } = useWeb3React();

  const Wallet = dynamic(() => import('../components/Wallet/wallet.component'), { ssr: false });

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // useEffect(() => {
  //   if (!account) {
  //     handleOpen();
  //   }
  //   return () => {};
  // }, []);

  return (
    <div>
      <Header handleOpen={handleOpen} />
      <Container>{children} </Container>
      <ModalWindow open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Wallet />
      </ModalWindow>
    </div>
  );
};
