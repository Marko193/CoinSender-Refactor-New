import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { initialValuesForCompany, validationSchemaForCompany } from '@/constants/registerForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Iconify from '@/components/iconify';
import { signUp } from '@/services';
import { useRouter } from 'next/router';

export default function RegisterForm() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const errorMessage = '';
  // const [errorMessage, setErrorMessage] = useState('');
  // const errorMessage = useSelector(({AuthUser: {errorMessage}}) => errorMessage);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowSecondPassword = () => {
    setShowSecondPassword((show) => !show);
  };

  const formik = useFormik({
    initialValues: initialValuesForCompany,
    validationSchema: validationSchemaForCompany,

    onSubmit: async (values) => {
      try {
        const response = await signUp({
          name: values.name,
          surname: values.second_name,
          company_name: values.company,
          email: values.email,
          password: values.confirm_password,
          password_confirmation: values.confirm_password,
        });
        if (response.status === 201) {
          toast.success('Profile has been successfully created!');
          await router.push({
            pathname: '/auth',
          });
        }
      } catch (e: any) {
        if (e.response.data.statusCode === 403) {
          toast.error(e.response.data.message);
        } else {
          toast.error(e.response.data.message);
        }
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    isValid,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Stack flexDirection='row' mb={2} gap={1}>
          <Stack>
            <TextField
              fullWidth
              required
              FormHelperTextProps={{ style: { fontSize: 12 } }}
              placeholder='Name*'
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <Stack>
            <TextField
              fullWidth
              required
              FormHelperTextProps={{ style: { fontSize: 12 } }}
              placeholder='Surname*'
              {...getFieldProps('second_name')}
              error={Boolean(touched.second_name && errors.second_name)}
              helperText={touched.second_name && errors.second_name}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </Stack>
        <Stack spacing={2} mb={3}>
          <TextField
            fullWidth
            required
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            placeholder='Company Name*'
            {...getFieldProps('company')}
            error={
              Boolean(touched.company && errors.company)
              // || (errorMessage.includes('Organization') && errorMessage)
            }
            helperText={
              Boolean(touched.company && errors.company) ||
              (errorMessage.includes('Organization') && errorMessage)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            required
            type='email'
            placeholder='Email*'
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            {...getFieldProps('email')}
            error={
              Boolean(touched.email && errors.email)
              // ||
              // (errorMessage.includes('Admin') && errorMessage)
            }
            helperText={
              Boolean(touched.email && errors.email) ||
              (errorMessage.includes('Admin') && errorMessage)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder='Password*'
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
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            type={showSecondPassword ? 'text' : 'password'}
            placeholder='Confirm password*'
            {...getFieldProps('confirm_password')}
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{
              shrink: true,
            }}
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

        <Button fullWidth type='submit' disabled={!isValid} variant='contained'
                style={{ fontSize: '16px', fontFamily: '__Inter_01180f, __Inter_Fallback_01180f, sans-serif' }}>
          Sign up
        </Button>
      </Form>
      <ToastContainer />
    </FormikProvider>
  );
}
