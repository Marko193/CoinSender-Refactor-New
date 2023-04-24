import { Form, FormikProvider, useFormik } from 'formik';
import Head from 'next/head';
import React, { useState } from 'react';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { PageTitle } from '@/components/pageTitle';
import WarningModal from '@/components/warningModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '@/components/header/header.component';
import DashboardSidebar from '@/components/sidebar';
import styles from '@/layouts/main-layout.module.scss';
import { RouteGuard } from '@/components/routeGuard/routeGuard';
import { addRecipient } from '@/services/recipients';
import Router from 'next/router';
import { ROOT_URL } from '@/constants/general';
import { validationSchemaForRecipients } from '@/constants/recipientsForm';
export default function AddRecipient() {

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
      wallet_address: '',
    },
    validationSchema: validationSchemaForRecipients,
    onSubmit: async (values: any) => {

      try {
        const response = await addRecipient(values);
        if (response.status === 201) {
          toast.success(response.data.message);
          await Router.push(`${ROOT_URL}/recipients`);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  const { values, errors, touched, handleSubmit, getFieldProps } = formik;

  const isValid =
    !errors.amount &&
    !errors.name &&
    !errors.wallet_address &&
    Boolean(values.name && values.wallet_address && values.amount);

  return (
    <>
      <Head>
        <title>Add recipient</title>
        <meta name='description' content='Add recipient' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <RouteGuard>
        <Header onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <div className={styles.main_layout}>
            <WarningModal open={isOpen} type={'/recipients/add'} close={handleClose} />
            <Stack>
              <PageTitle title='Add recipient' path={'/recipients'}
                         // handler={() => setIsOpen(true)}
              />
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
                            onClick={() => Router.push(`${ROOT_URL}/recipients`)}
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
          <ToastContainer />
        </div>
      </RouteGuard>
    </>
  );
}
