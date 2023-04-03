import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './index.module.scss';
import Footer from '@/components/footer/footer.component';
import LoginForm from '@/components/loginForm/loginForm.component';
import RegisterForm from '@/components/signUpForm';
import CoinBase from '@/assets/new-login-icons/CoinBase.svg';
import MetaMask from '@/assets/new-login-icons/MetaMask.svg';
import WalletConnection from '@/assets/new-login-icons/WalletConnection.svg';

export default function Login() {
  const [isSignInActive, setSignInActive] = useState(true);
  const [isSignUpActive, setSignUpActive] = useState(false);
  const [isUserNotAuth, setIsUserNotAuth] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsUserNotAuth(false);
      router.push('/');
    }
  }, []);

  return (
    <>
      {isUserNotAuth ?
        <>
          <div className={styles.title}>Welcome to CoinSender</div>
          <div className={styles.sign_in_block}>
          <div className={styles.content_column}>
            <div className={styles.column_title}>
              Decentralized Application
            </div>
            <div className={styles.wallet_icons_wrapper}>
              <div className={styles.wallet_icons_title}>
                Go to Decentralized Applications
              </div>
              <div className={styles.wallets_icons_block}>
                <Image src={MetaMask} alt='wallet_2' style={{ marginRight: '-15px', zIndex: 3 }} />
                <Image src={WalletConnection} alt='wallet_3' style={{ zIndex: 2 }} />
                <Image src={CoinBase} alt='wallet_1' style={{ marginLeft: '-7px', zIndex: 1 }} />
              </div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.content_column}>
            <div className={styles.centralized_block}>
              <div className={styles.column_title_centralized}>
                Centralized application
              </div>
              <div className={styles.buttons_layout}>
                <button id={styles.sign_in} className={isSignInActive ? styles.active_button : null}
                        onClick={() => {
                          setSignInActive(!isSignInActive);
                          setSignUpActive(!isSignUpActive);
                        }}>Sign in
                </button>
                <button id={styles.sign_up} className={isSignUpActive ? styles.active_button : null}
                        onClick={() => {
                          setSignUpActive(!isSignUpActive);
                          setSignInActive(!isSignInActive);
                        }}>Sign up
                </button>
              </div>
              <div className={styles.forms_block}>
                {isSignInActive && !isSignUpActive ? <LoginForm /> : null}
                {!isSignInActive && isSignUpActive ? <RegisterForm/> : null}
              </div>
            </div>
          </div>
        </div>
          <Footer />
      </> : <></>}
    </>
  );
}
