import styles from "@/components/header/header.module.scss";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className="logo">
        <a href="#" className="logo-link">
          Coinsender
        </a>
      </div>
      <div className="wallet">
        <button>Connect wallet</button>
      </div>
    </div>
  );
};
