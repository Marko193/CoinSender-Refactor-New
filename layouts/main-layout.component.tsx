import { FunctionComponent, ReactNode } from 'react';
import { Header } from '@/components/header/header.component';
import styles from '@/layouts/main-layout.module.scss';
import Web3Provider from '@/components/Web3Provider';
import { Provider } from 'react-redux';
import store from '@/state';
import { QueryClient, QueryClientProvider } from 'react-query';

interface MainLayoutProps {
  children: ReactNode;
}
export const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <div className={styles.mainLayout}>
      <Header />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Web3Provider>
            <div className={styles.zxc}>{children}</div>
          </Web3Provider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};
