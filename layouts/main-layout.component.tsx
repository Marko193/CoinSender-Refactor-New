import { FunctionComponent, ReactNode, useState } from 'react';
import { Header } from '@/components/header/header.component';
import { Container } from '@mui/material';
import DashboardSidebar from '@/components/sidebar';
import styles from './main-layout.module.scss';
import { RouteGuard } from '@/components/routeGuard/routeGuard';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <RouteGuard>
        <Header onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <div className={styles.main_layout}>
          <Container>{children} </Container>
        </div>
      </RouteGuard>
    </>
  );
};
