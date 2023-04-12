import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Box, Grid, Container, Typography, Stack } from '@mui/material';
import Page from '@/components/page/Page.js';
import ConfirmDeleteModal from '@/components/confirmDeleteModal/index';
import employees from '@/mocks/employees.json';
import { useFormik } from 'formik';
import { sortStringValuesTwoWays } from '@/helpers/stringUtils';
import { PageTitle } from '@/components/pageTitle';
import { CardComponent } from '@/components/card';
import TablePagination from '@mui/material/TablePagination';

export default function Home() {

  // @ts-ignore
  const MainLayout = dynamic(
    () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
    {
      ssr: false,

      loading: () => <span> Loading... </span>,
    },
  );

  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = useState('az');
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();

  // const employees = useSelector(({ employees: { employeeList } }) => employeeList);
  // const isLoading = useSelector(({ employees: { isLoading } }) => isLoading);
  // const dispatch = useDispatch();

  // const { t } = useTranslation('common');

  // useEffect(() => {
  //   dispatch({ type: 'GET_EMPLOYEE_LIST' });
  // }, []);

  const sortedEmployees = sortStringValuesTwoWays(employees, value);

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
        <Page title="Receipents | CoinSender">
            <ConfirmDeleteModal id={deleteUserId} open={isOpen} close={handleClose} type="employee" />
            <Stack>
              <Box sx={{ pb: 5 }}>
                <Container sx={{ display: 'flex', padding: '0!important' }}></Container>
                <PageTitle
                  title="Receipents"
                  button_name="Add receipent"
                />
                {employees.length === 0 ? (
                  <Typography mt="20%" textAlign="center" variant="subtitle2">
                    You haven`t created an receipent yet.
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
                            />
                          ))}
                    </Grid>
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="flex-end"
                      justifyContent="center"
                    >
                      { employees.length > 0 && (
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
            </Stack>
        </Page>
      </MainLayout>
    </>
  );
}
