import React, {useState} from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
// import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import {Button, IconButton, InputAdornment, Link, Stack, TextField, Typography,} from '@mui/material';
// import {LoadingButton} from '@mui/lab';
import {initialValuesForCompany, validationSchemaForCompany} from '@/constants/registerForm';
// import {registerUser} from '../../../redux/actions';
// import {SIGN_IN} from '../../../constants/routes';
// import {useTranslation} from 'react-i18next';
import Iconify from '@/components/iconify';
// import styled from "styled-components";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  // const errorMessage = useSelector(({AuthUser: {errorMessage}}) => errorMessage);

  // const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowSecondPassword = () => {
    setShowSecondPassword((show) => !show);
  };

  const formik = useFormik({
    initialValues: initialValuesForCompany,
    validationSchema: validationSchemaForCompany,

    onSubmit: (values) => {
      console.log('values', values);
      // registerUser(
      //   {
      //     name: values.name,
      //     second_name: values.second_name,
      //     company_name: values.company,
      //     email: values.email,
      //     password: values.confirm_password,
      //   },
      //   navigate,
      // );
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    handleChange,
    setFieldValue,
    values,
    isValid,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack flexDirection="row" mb={2} gap={1}>
          <Stack>
            <TextField
              fullWidth
              required
              FormHelperTextProps={{style: {fontSize: 12}}}
              placeholder="Name*"
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
              FormHelperTextProps={{style: {fontSize: 12}}}
              placeholder="Surname*"
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
            FormHelperTextProps={{style: {fontSize: 12}}}
            placeholder="Company Name*"
            {...getFieldProps('company')}
            // error={
            //   Boolean(touched.company && errors.company) ||
            //   (errorMessage.includes('Organization') && errorMessage)
            // }
            // helperText={
            //   Boolean(touched.company && errors.company) ||
            //   (errorMessage.includes('Organization') && errorMessage)
            // }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            required
            type="email"
            placeholder="Email*"
            FormHelperTextProps={{style: {fontSize: 12}}}
            {...getFieldProps('email')}
            // error={
            //   Boolean(touched.email && errors.email) ||
            //   (errorMessage.includes('Admin') && errorMessage)
            // }
            // helperText={
            //   Boolean(touched.email && errors.email) ||
            //   (errorMessage.includes('Admin') && errorMessage)
            // }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Password*"
            FormHelperTextProps={{style: {fontSize: 12}}}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
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
            placeholder="Confirm password*"
            {...getFieldProps('confirm_password')}
            FormHelperTextProps={{style: {fontSize: 12}}}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowSecondPassword} edge="end">
                    <Iconify icon={showSecondPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirm_password && errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
          />
        </Stack>

        <Button fullWidth type="submit" disabled={!isValid} variant="contained"
                       style={{fontSize: '16px', fontFamily: 'Outfit'}}>
          Sign up
        </Button>
        <Typography fontSize="12px" color="#4B4A4A" fontWeight='600' fontFamily="Outfit" align="center" sx={{mt: 3}}>
          Already have an account?{' '}
          <Link
            // component={RouterLink}
            // to={SIGN_IN}
            underline="always"
            style={{
              fontFamily: 'Outfit',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '15px',
              color: '#000000',
              textDecoration: 'none'
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Form>
    </FormikProvider>
  );
}

// const SignInLink = styled(Link)({
//   fontFamily: 'Outfit',
//   fontStyle: 'normal',
//   fontWeight: 600,
//   fontSize: '12px',
//   lineHeight: '15px',
//   color: '#000000',
//   textDecoration: 'none'
// })

// const mapStateToProps = (state) => ({state});
// const mapActionsToProps = {registerUser};
//
// export default connect(mapStateToProps, mapActionsToProps)(RegisterForm);
