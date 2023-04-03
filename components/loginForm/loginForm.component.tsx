import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import Image from 'next/image';
// import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, Divider, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';
import googleIcon from '@/assets/new-login-icons/GoogleIcon.svg';
import Iconify from '@/components/iconify';
// import {googleLoginAction, loginUser} from '../../../redux/actions';
// import {FORGOT_PASSWORD, SIGN_UP} from '../../../constants/routes';
import styles from './loginForm.module.scss';
import { getCookie, setDataToLocalStorage } from '@/helpers/api/auth';
import { signIn } from '@/services';
import { useRouter } from 'next/router';
import { userService } from '@/services/user.service';

const GOOGLE_CLIENT_ID = '405150766512-pl33ad95bs7uqe9urolbaojgosticsae.apps.googleusercontent.com';

// @ts-ignore
export default function LoginForm() {

  const router = useRouter();

  useEffect(() => {
    // function start() {
    //   gapi.client.init({
    //     clientId: GOOGLE_CLIENT_ID,
    //     scope: '',
    //   });
    // }
    //
    // gapi.load('client:auth2', start);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (value: any) => {

      try {
        const response = await signIn(value);
        if (response.status === 200) {
          const access = getCookie('Authentication');
          const refresh = getCookie('Refresh');
          const data = JSON.stringify(response.data);
          setDataToLocalStorage('authorization_login', data);
          setDataToLocalStorage ('access_token', access);
          setDataToLocalStorage('currentUser', data);
          setDataToLocalStorage('refresh_token', refresh);
          console.log('activated');
          const returnUrl: any = router.query.returnUrl || '/';
          // await router.push(returnUrl);
          await router.push(returnUrl);
        }
      } catch (err) {
        console.log('err', err);
      }
      // loginUser(value, navigate);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, isValid } = formik;

  // const onGoogleLoginSuccess = async (responce) => {
  //   if (responce.tokenId) {
  //     dispatch(googleLoginAction(responce.tokenId, navigate));
  //   }
  // };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} mb={2}>
          <TextField
            fullWidth
            autoComplete='username'
            type='email'
            placeholder='Email*'
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            autoComplete='current-password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password*'
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleShowPassword} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <Typography sx={{ color: '#FFA31A', fontFamily: 'Futura Md BT' }} mb={3} color='#808080'>
          <Link
            fontSize='14px'
            fontWeight={500}
            // component={RouterLink}
            // to={FORGOT_PASSWORD}
            underline='none'
            style={{
              marginBottom: '27px',
              float: 'right',
              fontFamily: 'Outfit, sans-serif',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '15px',
              color: '#1346F9',
            }}
          >
            Forgot Password?
          </Link>
        </Typography>
        <Button fullWidth type='submit' disabled={!isValid} variant='contained' style={{
          height: '51px',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '20px',
          color: '#FFFFFF',
        }}>
          Sign In
        </Button>

        <Divider sx={{ mb: -2, mt: 1 }} style={{
          fontFamily: 'Outfit, sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '12px',
          color: '#757171',
        }}>Or sign up with</Divider>

        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={(renderProps) => <GoogleLoginCustomButton renderProps={renderProps} />}
          // onSuccess={onGoogleLoginSuccess}
          onFailure={(err) => console.log(err)}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
          buttonText={'Google'}
          accessType={'offline'}
          autoLoad={false}
          prompt='consent'
        />

        <Stack textAlign='center' alignItems='center' justifyContent='center' sx={{ my: 2 }}>
          <Typography color='#4B4A4A' textAlign='center' variant='subtitle1' fontSize='12px'
                      fontFamily='Outfit'>
            Don’t have an account?{' '}
            <Link
              fontWeight={500}
              // component={RouterLink}
              // to={SIGN_UP}
              underline='always'
              style={{
                fontFamily: 'Outfit',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '15px',
                color: '#000000',
                textDecoration: 'none',
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

// @ts-ignore
const GoogleLoginCustomButton = ({ renderProps }) => {
  return (
    <div className={styles.google_button_container}>
      <Button onClick={renderProps.onClick} style={{ width: '100%' }} className={styles.google_button}>
        <Image src={googleIcon} alt='google-icon' style={{
          width: '28px',
          height: '28px',
          marginRight: '10px',
        }} />
        Google
      </Button>
    </div>
  );
};
