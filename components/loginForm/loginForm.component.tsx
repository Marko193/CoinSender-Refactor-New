import * as Yup from 'yup';
import React, { useState } from 'react';
import { useAppDispatch } from '@/state/hooks';
import Image from 'next/image';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, Divider, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import googleIcon from '@/assets/new-login-icons/GoogleIcon.svg';
import Iconify from '@/components/iconify';
import styles from './loginForm.module.scss';
import { getUserDataGoogle, googleAuthMiddleware } from '@/services';
import Router, { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInReducer } from '@/state/login/reducer';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { setDataToLocalStorage } from '@/helpers/api/auth';
import { getGoogleUrl } from '@/utils/getGoogleUrl';

// @ts-ignore
export default function LoginForm() {

  const dispatch = useAppDispatch();
  const router = useRouter();

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
    onSubmit: async (values: any) => {
      try {
        dispatch(signInReducer({ signInData: values }));
      } catch (err) {
        console.log('err', err);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, isValid } = formik;

  // const loginToGoogle = async () => {
  //
  //   try {
  //     const response = await googleAuthMiddleware();
  //     console.log('response', response);
  //     if (response.status === 200) {
  //       window.open(`${response.data.data}`, '_blank', 'noreferrer');
  //     }
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };

  // const loginToGoogle = useGoogleLogin({
  //   onSuccess: async (res) => {
  //     console.log('tokenResponse', res);
  //     try {
  //       const userInfo: any = await getUserDataGoogle(res.access_token);
  //       console.log('userInfo', userInfo);
  //       // setDataToLocalStorage('access_token', res.access_token);
  //       // const returnUrl: any = router.query.returnUrl || '/';
  //       // await router.push(returnUrl);
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   },
  // });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const test = () => {
    console.log('active');
    toast.success('Success!');
  };

  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
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
            className={styles.forgot_password_btn}
            fontSize='14px'
            fontWeight={500}
            onClick={() => router.push('/forgot-password')}
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
        <a
          href={getGoogleUrl('')}
          role="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Continue with Google
        </a>
        {/*<div className={styles.google_button_container}>*/}
        {/*  /!*<GoogleLogin onSuccess={responseMessage} onError={errorMessage} />*!/*/}
        {/*  <Button style={{ width: '100%' }} className={styles.google_button} onClick={() => loginToGoogle()}>*/}
        {/*    <Image src={googleIcon} alt='google-icon' style={{*/}
        {/*      width: '28px',*/}
        {/*      height: '28px',*/}
        {/*      marginRight: '10px',*/}
        {/*    }} />*/}
        {/*    Google*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </Form>
      <ToastContainer />
    </FormikProvider>
  );
};
