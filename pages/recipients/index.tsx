import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Box, Grid, Stack, Typography } from '@mui/material';
import ConfirmDeleteModal from '@/components/confirmDeleteModal/index';
import { useFormik } from 'formik';
import { sortStringValuesTwoWays } from '@/helpers/stringUtils';
import { PageTitle } from '@/components/pageTitle';
import { CardComponent } from '@/components/card';
import TablePagination from '@mui/material/TablePagination';
import oldEmployees from '@/mocks/employees.json';
import * as currentUser from '@/mocks/currentUser.json';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRecipients } from '@/services/recipients';
import { Header } from '@/components/header/header.component';
import DashboardSidebar from '@/components/sidebar';
import styles from '@/layouts/main-layout.module.scss';
import { RouteGuard } from '@/components/routeGuard/routeGuard';
export default function RecipientsPage() {

  // @ts-ignore
  const MainLayout = dynamic(
    () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
    {
      ssr: false,

      loading: () => <span> Loading... </span>,
    },
  );

  const [employees,  setEmployees] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = useState('az');
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
        const response = await getRecipients();
        // console.log('value', response);
        if (response.status === 201) {
          try {
            setEmployees(response.data.data);
            setIsLoading(false);
          } catch (error: any) {
            toast.error(error.response.data.message)
          }
        }
    })();
  }, []);

  const sortedEmployees = sortStringValuesTwoWays(employees, value);

  // console.log('oldEmployees', oldEmployees);
  // console.log('employees', employees);
  // console.log('sortedEmployees', sortedEmployees);
  // console.log('isLoading', isLoading);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: '',
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

  const handleOpen = (id: any) => {
    setIsOpen(true);
    setDeleteUserId(id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Employees</title>
        <meta name='description' content='Employees page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <MainLayout>
        <Stack>
          <Box sx={{ pb: 5 }}>
            <PageTitle
              title='Recipients'
              button_name='Add receipent'
              button_route='/'
            />

            {isLoading ? (
              <Typography mt='20%' textAlign='center' variant='subtitle2'>
                Loading...
              </Typography>
            ) : (
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
            )}
          </Box>
          <ConfirmDeleteModal id={deleteUserId} open={isOpen} close={handleClose} type='employee' />
          <ToastContainer />
        </Stack>
      </MainLayout>
    </>
  );
}
