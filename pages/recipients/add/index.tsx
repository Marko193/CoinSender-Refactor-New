import { Form, FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { isAddress } from '@ethersproject/address';
import Page from '@/components/page/Page';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { PageTitle } from '@/components/pageTitle';
import WarningModal from '@/components/warningModal'
// import AvatarUpload from '@/components/avatarUpload/index';

export default function AddRecipient() {

  const MainLayout = dynamic(
    () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
    {
      ssr: false,

      loading: () => <span> Loading... </span>,
    },
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
    amount: Yup.string().required('Is required'),
    wallet_address: Yup.string()
      .label('Wallet address')
      .required()
    .test('Is address', 'Please enter correct wallet address', (value) => isAddress(value)),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
      wallet_address: '',
    },
    validationSchema,
    onSubmit: (values: any) => {
      console.log('values', values);
      // const formData = new FormData();
      // formData.append('avatar', values.avatar ? values.avatar[0] : null);
      // formData.append('name', values.name);
      // formData.append('second_name', values.second_name);
      // formData.append('add_info', values.add_info);
      // formData.append('wallet_address', values.wallet_address);
      // formData.append('position', values.position);
      // formData.append('amount', values.amount);

      // dispatch({
      //   type: 'ADD_EMPLOYEE_SAGA',
      //   payload: formData,
      //   navigate,
      // });
    },
  });

  const { values, errors, touched, isValid, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Head>
        <title>Add recipient</title>
        <meta name='description' content='Add recipient' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <MainLayout>
        <Page title='Dashboard: New Recepient'>
          <WarningModal open={isOpen} type={'/'} close={handleClose} />
          <Stack>
            <PageTitle title='Add recepient' path={'/'} handler={() => setIsOpen(true)} />
            <Grid container>
              <Box
                sx={{
                  padding: 3,
                  width: '100%',
                  boxShadow:
                    'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
                }}
              >
                <FormikProvider value={formik}>
                  <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                    <Stack direction='row' gap='20px'>
                      <Stack width='50%' gap='16px'>
                        <Stack direction='row' justifyContent='space-between'>
                          <TextField
                            required
                            fullWidth
                            label='Name'
                            type='text'
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                          <TextField
                            required
                            fullWidth
                            label='Amount'
                            type='text'
                            {...getFieldProps('amount')}
                            error={Boolean(touched.amount && errors.amount)}
                            helperText={touched.amount && errors.amount}
                          />
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                          <TextField
                            required
                            fullWidth
                            label='Wallet address'
                            type='text'
                            {...getFieldProps('wallet_address')}
                            error={Boolean(touched.wallet_address && errors.wallet_address)}
                            helperText={touched.wallet_address && errors.wallet_address}
                          />
                        </Stack>
                      </Stack>
                      <Stack width='50%' alignItems='center' justifyContent='center'>
                        {/*<AvatarUpload flag="new" handler={setFieldValue} avatar={values?.avatar} />*/}
                      </Stack>
                    </Stack>
                    <Stack mt={2} spacing={2}>
                      <Stack direction='row' gap={2}>
                        <Button
                          type='submit'
                          sx={{ height: '30px' }}
                          disabled={!isValid}
                          variant='contained'
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setIsOpen(true)}
                          sx={{ height: '30px' }}
                          variant='contained'
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                </FormikProvider>
              </Box>
            </Grid>
          </Stack>
        </Page>
      </MainLayout>
    </>
  );
}
