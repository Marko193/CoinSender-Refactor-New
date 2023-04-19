import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { isAddress } from '@ethersproject/address';
import Page from '@/components/page/Page'
import WarningModal from '@/components/warningModal/index';
import { Box, Grid, Stack, Button, TextField} from '@mui/material';
import { PageTitle } from '@/components/pageTitle';
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

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    values,
    dirty,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      second_name: '',
      amount: 0,
      wallet_id: '',
      add_info: '',
      position: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
      second_name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
      wallet_id: Yup.string()
        .label('Wallet address')
        .required()
        .test('Is address', 'Please enter correct wallet address', (value) => isAddress(value)),
    }),
    onSubmit: (values: any) => {
      const formData = new FormData();
      formData.append('avatar', values.avatar ? values.avatar[0] : null);
      formData.append('name', values.name);
      formData.append('second_name', values.second_name);
      formData.append('add_info', values.add_info);
      formData.append('wallet_id', values.wallet_id);
      formData.append('position', values.position);
      formData.append('amount', values.amount);
      console.log('formData', formData);
      // dispatch({
      //   type: 'ADD_EMPLOYEE_SAGA',
      //   payload: formData,
      //   navigate,
      // });
    },
  });

  return (
    <>
      <Head>
        <title>Add recipient</title>
        <meta name='description' content='Add recipient' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <MainLayout>
        <Page title="Dashboard: New Receipent">
            <WarningModal open={isOpen} type={'/'} close={handleClose} />
            <Stack>
              <PageTitle title="Add receipent" path={'/'} handler={() => setIsOpen(true)} />
              <Grid container>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    padding: 3,
                    width: '100%',
                    boxShadow:
                      'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Stack direction="row" gap="20px">
                    <Stack width="50%" gap="16px">
                      <Stack direction="row" justifyContent="space-between">
                        <TextField
                          required
                          fullWidth
                          label='Name'
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <TextField
                          fullWidth
                          label='Surname'
                          name="second_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.second_name && errors.second_name)}
                          helperText={touched.second_name && errors.second_name}
                          required
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <TextField
                          fullWidth
                          label='wallet.id'
                          error={Boolean(touched.wallet_id && errors.wallet_id)}
                          helperText={touched.wallet_id && errors.wallet_id}
                          name="wallet_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </Stack>
                    </Stack>
                    <Stack width="50%" alignItems="center" justifyContent="center">
                      {/*<AvatarUpload flag="new" handler={setFieldValue} avatar={values?.avatar} />*/}
                    </Stack>
                  </Stack>
                  <Stack mt={2} spacing={2}>
                    <TextField
                      fullWidth
                      label='Position'
                      name="position"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      label="Additional information"
                      name="add_info"
                      onChange={handleChange}
                    />
                    <Stack direction="row" gap={2}>
                      <Button
                        type="submit"
                        sx={{ height: '30px' }}
                        disabled={!(isValid && dirty)}
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsOpen(true)}
                        sx={{ height: '30px' }}
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Stack>
        </Page>
      </MainLayout>
    </>
  );
}
