import styles from "@/components/header/header.module.scss";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";
import { Button, Stack } from "@mui/material";

export const Header = () => {
  return (
    <>
      <Stack
        py={0.5}
        sx={{ background: "#e7e7e7" }}
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
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "8px", md: "12px" },
                padding: { xs: "6px", md: "6px 16px" },
              }}
            >
              Connect a wallet
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
