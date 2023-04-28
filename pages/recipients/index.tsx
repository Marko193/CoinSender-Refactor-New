import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import ConfirmDeleteModal from '@/components/confirmDeleteModal/index';
import { sortStringValuesTwoWays } from '@/helpers/stringUtils';
import { PageTitle } from '@/components/pageTitle';
import { CardComponent } from '@/components/card';
import TablePagination from '@mui/material/TablePagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteRecipientById, getRecipients } from '@/services/recipients';
import { Header } from '@/components/header/header.component';
import DashboardSidebar from '@/components/sidebar';
import styles from '@/layouts/main-layout.module.scss';
import { RouteGuard } from '@/components/routeGuard/routeGuard';

export default function RecipientsPage() {

  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const recipients = await getRecipients();
        setEmployees(recipients.data.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const sortedEmployees = sortStringValuesTwoWays(employees, 'az');

  const handleOpen = (id: any) => {
    setIsOpen(true);
    setDeleteUserId(id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteEmployeeById = async (id: any) => {
    try {
      const response = await deleteRecipientById(id);
      if (response.status === 204) {
        toast.success('Success!');
        const recipients = await getRecipients();
        setEmployees(recipients.data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Recipients</title>
        <meta name='description' content='Recipients page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <RouteGuard>
        <Header onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <div className={styles.main_layout}>
          <Stack>
            <Box sx={{ pb: 5 }}>
              <PageTitle
                title={'Recipients'}
                button_name={'Add recipient'}
                button_route={'recipients/add'}
              />
              {employees.length === 0 && !isLoading ? (
                <Typography mt='20%' textAlign='center' variant='subtitle2'>
                  You have not created an recipients yet.
                </Typography>
              ) : (
                <>
                  {!isLoading ?
                    <>
                      <Grid mb={3} container spacing={4}>
                        {employees &&
                          sortedEmployees
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item: any) => (
                              <CardComponent
                                handleOpen={handleOpen}
                                key={item.id}
                                item={item}
                                isEmployee={true}
                                isPartner={false}
                                isLoading={isLoading}
                                deleteEmployeeById={deleteEmployeeById}
                              />
                            ))}
                      </Grid>
                      <Grid
                        container
                        spacing={0}
                        direction='column'
                        alignItems='flex-end'
                        justifyContent='center'
                      >
                        {employees.length > 0 && (
                          <Grid item xs={3}>
                            <TablePagination
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                margin: '0 20px 20px 0',
                                '.MuiTablePagination-displayedRows': {
                                  margin: 0,
                                },
                                '.MuiTablePagination-selectLabel': {
                                  margin: 0,
                                },
                              }}
                              page={page}
                              count={employees.length}
                              rowsPerPage={rowsPerPage}
                              onPageChange={handleChangePage}
                              rowsPerPageOptions={[6, 12, 24]}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                              labelRowsPerPage='Rows per page'
                              labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to} of ${count}`
                              }
                            />
                          </Grid>
                        )}
                      </Grid>
                    </>
                    :
                    <Typography mt='20%' textAlign='center' variant='subtitle2'>
                      <CircularProgress />
                    </Typography>
                  }
                </>
              )}
            </Box>
            <ConfirmDeleteModal id={deleteUserId} open={isOpen} close={handleClose} type='employee' />
            <ToastContainer />
          </Stack>
        </div>
      </RouteGuard>
    </>
  );
}
