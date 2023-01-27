import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { Header } from '@/components/header/header.component';
import { Container } from '@mui/material';

import dynamic from 'next/dynamic';
import { ModalWindow } from '@/components/modal/modal';
import { useWeb3React } from '@web3-react/core';

interface MainLayoutProps {
  children: ReactNode;
}
export const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { account } = useWeb3React();

  const Wallet = dynamic(() => import('../components/Wallet/wallet.component'), { ssr: false });

  const handleOpen = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (!account) {
      return () => handleOpen();
    }

    return () => handleClose();
  }, [account]);

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
