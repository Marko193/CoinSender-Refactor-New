import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import Router from 'next/router';
import { sendRestorePasswordLetter } from '@/services';

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
      console.log('values', values);
      try {
        const response = await sendRestorePasswordLetter(values);
        if (response.status === 201) {
          console.log(response.data.message);
          await Router.push('/auth');
        }
      } catch (err: any) {
        console.log('error', err.response.data.message);
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
          style={{ fontWeight: 700 }}
        >
          Send
        </Button>
      </Form>
    </FormikProvider>
  );
}
