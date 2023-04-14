import * as Yup from 'yup';
import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Iconify from '@/components/iconify';
import { resetPassword } from '@/services';
import Router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Token {
  restorePasswordToken: string;
}

export default function ChangePasswordForm({ restorePasswordToken }: Token) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const passwordExp: any = '[a-zA-Z0-9]+';

  // console.log('restorePasswordToken', restorePasswordToken);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowSecondPassword = () => {
    setShowSecondPassword((show) => !show);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Is required'),
    password: Yup.string()
      .min(8, 'Minimum password length 8 characters')
      .matches(passwordExp)
      .required('Is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords are not the same')
      .matches(passwordExp)
      .min(8, 'Minimum password length 8 characters')
      .required('Is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await resetPassword({
          ...values,
          restorePasswordToken
        });

        // console.log('response', response);

        if (response.status === 200) {
          toast.success(response.data.message);
          await Router.push('/auth');
        }
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    },
  });



  const { errors, touched, isValid, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} mb={3}>

          <TextField
            fullWidth
            type='email'
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            label='Email'
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label='New password'
            FormHelperTextProps={{ style: { fontSize: 12 } }}
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
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            type={showSecondPassword ? 'text' : 'password'}
            label='Confirm password'
            {...getFieldProps('password_confirmation')}
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleShowSecondPassword} edge='end'>
                    <Iconify icon={showSecondPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password_confirmation && errors.password_confirmation)}
            helperText={touched.password_confirmation && errors.password_confirmation}
          />
        </Stack>

        <Button fullWidth size='large' type='submit' disabled={!isValid} variant='contained'
                style={{ fontFamily: '__Inter_01180f, __Inter_Fallback_01180f, sans-serif' }}>
          Change password
        </Button>
      </Form>
      <ToastContainer />
    </FormikProvider>
  );
};
