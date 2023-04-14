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
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords are not the same')
      .matches(passwordExp)
      .min(8, 'Minimum password length 8 characters')
      .required('Is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('values', values, restorePasswordToken);
      try {
        // const response = await resetPassword({
        //   email: 'mark.pavlenko@megadevllc.com',
        //   password: values.password,
        //   password_confirmation: values.confirm_password,
        //   restorePasswordToken: restorePasswordToken,
        // });
        // if (response.status === 200) {
        //   toast.success(response.data.message);
        //   await Router.push('/auth');
        // }
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
            {...getFieldProps('confirm_password')}
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
            error={Boolean(touched.confirm_password && errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
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
