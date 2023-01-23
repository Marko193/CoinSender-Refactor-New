import styles from "@/components/header/header.module.scss";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";
import { Button } from "@/components/button/button.component";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerItems}>
        <div className="logo">
          <a href="#" className="logo-link">
            <Image src={Logo} alt="Logo" />
          </a>
        </div>
        <div className={styles.wallet}>
          <Button style={styles.button} title="Connect a wallet" />
        </div>
      </div>
    </div>
  );
};
