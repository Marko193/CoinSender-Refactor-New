import * as Yup from 'yup';
import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, Divider, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import Iconify from '@/components/iconify';
import styles from './loginForm.module.scss';
import router, { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getGoogleUrl } from '@/utils/getGoogleUrl';
import googleIcon from '@/assets/new-login-icons/GoogleIcon.svg';
import Image from 'next/image';
import { signIn } from '@/services';
import { setDataToLocalStorage } from '@/helpers';
import * as currentUser from '@/mocks/currentUser.json';

// @ts-ignore
export default function LoginForm() {
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
        const response = await signIn(values);
        toast.success(response.data.message);
        console.log('response');

        if (response.status === 200) {
          setDataToLocalStorage('access_token', response.data.data.access_token);
          setDataToLocalStorage('expires_at', response.data.data.expires_at);
          setDataToLocalStorage('currentUser', JSON.stringify(currentUser));
          const returnUrl: any = router.query.returnUrl || '/';
          await router.push(returnUrl);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, isValid } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const test = () => {
    console.log('active');
    toast.success('Success!');
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
        <Link className={styles.google_button_container} href={getGoogleUrl()}>
          <div style={{ width: '100%' }} className={styles.google_button}>
            <Image src={googleIcon} alt='google-icon' style={{
              width: '28px',
              height: '28px',
              marginRight: '10px',
            }} />
            Google
          </div>
        </Link>
      </Form>
      <ToastContainer />
    </FormikProvider>
  );
};
