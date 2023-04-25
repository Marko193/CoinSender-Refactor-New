import { Form, FormikProvider, useFormik } from 'formik';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { PageTitle } from '@/components/pageTitle';
import WarningModal from '@/components/warningModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '@/components/header/header.component';
import DashboardSidebar from '@/components/sidebar';
import styles from '@/layouts/main-layout.module.scss';
import { RouteGuard } from '@/components/routeGuard/routeGuard';
import { getRecipientById, updateRecipient } from '@/services/recipients';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { ROOT_URL } from '@/constants/general';
import { validationSchemaForRecipients } from '@/constants/recipientsForm';

export default function EditRecipient() {

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editedRecipient, setEditedRecipient] = useState<any>({});

  const router = useRouter();
  const { recipientId } = router.query;

  useEffect(() => {
    if (recipientId !== undefined) {
      (async () => {
        try {
          const { data } = await getRecipientById(recipientId);
          setEditedRecipient({...data.data, amount: Number(data.data.amount).toString()});
        } catch (error: any) {
          toast.error(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [recipientId]);

  const formik: any = useFormik({
    initialValues: {
      name: editedRecipient.name,
      amount: Number(editedRecipient.amount).toString(),
      wallet_address: editedRecipient.wallet_address,
    },
    enableReinitialize: true,
    validationSchema: validationSchemaForRecipients,
    onSubmit: async (values) => {
      try {
        const response = await updateRecipient({...values, id: editedRecipient.id} );
        if (response.status === 200) {
          toast.success(response.data.message);
          await Router.push(`${ROOT_URL}/recipients`);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  const { values, errors, touched,  handleSubmit, getFieldProps } = formik;

  const isValid =
    !errors.amount &&
    !errors.name &&
    !errors.wallet_address &&
    Boolean(values.name
      && values.wallet_address
      && values.amount);

  return (
    <>
      <Head>
        <title>Edit recipient</title>
        <meta name='description' content='Edit recipient' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <RouteGuard>
        <Header onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <div className={styles.main_layout}>
          <WarningModal open={isOpen} type={'/recipients/add'} close={() => setIsOpen(false)} />
          <Stack>
            <PageTitle title='Edit recipient' path={'/recipients'} />
            <Grid container>
              <Box
                sx={{
                  padding: 3,
                  width: '100%',
                  boxShadow:
                    'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
                }}
              >
                {isLoading ? <>Loading...</> :
                  (
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
                              onClick={() => Router.push(`${ROOT_URL}/recipients/${recipientId}/profile`)}
                              sx={{ height: '30px' }}
                              variant='contained'
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </Stack>
                      </Form>
                    </FormikProvider>
                  )}
              </Box>
            </Grid>
          </Stack>
          <ToastContainer />
        </div>
      </RouteGuard>
    </>
  );
}
