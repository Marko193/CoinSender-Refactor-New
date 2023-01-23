import { FunctionComponent, ReactNode } from "react";
import { Header } from "@/components/header/header.component";
import styles from "@/layouts/main-layout.module.scss";
import { Container } from "@mui/material";

interface MainLayoutProps {
  children: ReactNode;
}
export const MainLayout: FunctionComponent<MainLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <Container>{children} </Container>
    </>
  );
};
