import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import Router from 'next/router';
import { sendRestorePasswordLetter } from '@/services';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export default function sendRestorePasswordLetterForm() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues: {
      corporate_email: ''
    },

    validationSchema: Yup.object().shape({
      corporate_email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required'),
    }),

    onSubmit: async () => {
      try {
        const response = await sendRestorePasswordLetter({email: values.corporate_email});
        if (response.status === 200) {
          toast.success(response.data.message);
          await Router.push('/auth');
        }
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          autoComplete='username'
          type='email'
          label='Email address'
          {...getFieldProps('corporate_email')}
          error={Boolean(touched.corporate_email && errors.corporate_email)}
          helperText={touched.corporate_email && errors.corporate_email}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          disabled={!formik.isValid}
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          style={{ fontWeight: 700,   fontFamily: '__Inter_01180f, __Inter_Fallback_01180f, sans-serif'}}
        >
          Send
        </Button>
      </Form>
      <ToastContainer />
    </FormikProvider>
  );
}
