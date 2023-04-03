import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import styles from './index.module.scss';
import Footer from '@/components/footer/footer.component';
import { userService } from '@/services/user.service';
import LoginForm from '@/components/loginForm/loginForm.component';
import CoinBase from '@/assets/new-login-icons/CoinBase.svg';
import MetaMask from '@/assets/new-login-icons/MetaMask.svg';
import WalletConnection from '@/assets/new-login-icons/WalletConnection.svg';

export default Login;

function Login() {
    const [isSignInActive, setSignInActive] = useState(true);
    const [isSignUpActive, setSignUpActive] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    // form validation rules

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm();
    const { errors } = formState;

    // @ts-ignore
  function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl: any = router.query.returnUrl || '/';
                // console.log('returnUrl', returnUrl);
                router.push(returnUrl);
            })
            .catch(error => {
                setError('apiError', { message: error });
            });
    }

  return (

    // <div className="col-md-6 offset-md-3 mt-5">
    //   <div className="alert alert-info">
    //     Username: test<br />
    //     Password: test
    //   </div>
    //   <div className="card">
    //     <h4 className="card-header">Next.js Basic Authentication Example</h4>
    //     <div className="card-body">
    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <div className="form-group">
    //           <label>Username</label>
    //           <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
    //           <div className="invalid-feedback">{errors.username?.message}</div>
    //         </div>
    //         <div className="form-group">
    //           <label>Password</label>
    //           <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
    //           <div className="invalid-feedback">{errors.password?.message}</div>
    //         </div>
    //         <button disabled={formState.isSubmitting} className="btn btn-primary">
    //           {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
    //           Login
    //         </button>
    //         {errors.apiError &&
    //           <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
    //         }
    //       </form>
    //     </div>
    //   </div>
    // </div>

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
                          <Image src={MetaMask} alt='wallet_2' style={{marginRight: '-15px', zIndex:3}}/>
                          <Image src={WalletConnection} alt='wallet_3' style={{zIndex:2}}/>
                          <Image src={CoinBase} alt='wallet_1' style={{marginLeft: '-7px', zIndex:1}}/>
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
                                      setSignUpActive(!isSignUpActive)
                                  }}>Sign in</button>
                          <button id={styles.sign_up} className={isSignUpActive ? styles.active_button : null}
                                  onClick={() => {
                                      setSignUpActive(!isSignUpActive);
                                      setSignInActive(!isSignInActive)
                                  }}>Sign up</button>
                      </div>
                      <div>
                          {isSignInActive && !isSignUpActive ? <LoginForm /> : null}
                          {!isSignInActive && isSignUpActive ?  <>Content 2</> : null}
                      </div>
                  </div>
              </div>
          </div>
          <Footer/>
      </>
    );
}
