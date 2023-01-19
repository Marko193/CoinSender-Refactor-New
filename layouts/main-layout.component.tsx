import { FunctionComponent, ReactNode } from "react";
import { Header } from "@/components/header/header.component";
import styles from "@/layouts/main-layout.module.scss";

interface MainLayoutProps {
  children: ReactNode;
}
export const MainLayout: FunctionComponent<MainLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      {children}
    </div>
  );
};
