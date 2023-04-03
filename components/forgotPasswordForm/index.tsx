import * as Yup from 'yup';
import { useState } from 'react';
// import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { connect, useDispatch } from 'react-redux';
// material
import {
  Link,
  Button,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// component
import Iconify from '@/components/iconify';
// import { loginUser } from '../../../redux/actions';
// import { FORGOT_PASSWORD, APP, BANKING, SIGN_IN, SIGN_UP } from '../../../constants/routes';

// ----------------------------------------------------------------------

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const passwordExp: any = '[a-zA-Z0-9]+';
  const dispatch = useDispatch();
  // const params = useParams();
  //
  // const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowSecondPassword = () => {
    setShowSecondPassword((show) => !show);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Minimum password length 8 characters')
      .matches(passwordExp)
      .required('Is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords are not the same')
      .matches(passwordExp)
      .min(8, 'Minimum password length 8 characters')
      .required('Is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
      // dispatch({
      //   type: 'CHANGE_PASSWORD',
      //   payload: { password: values.password, restorePassKey: params.token },
      //   navigate,
      // });
    },
  });

  const { errors, touched, values, isValid, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} mb={3}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            type={showSecondPassword ? 'text' : 'password'}
            label="Confirm password"
            {...getFieldProps('confirm_password')}
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowSecondPassword} edge="end">
                    <Iconify icon={showSecondPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={Boolean(touched.confirm_password && errors.confirm_password)}
            // helperText={touched.confirm_password && errors.confirm_password}
          />
        </Stack>

        <Button fullWidth size="large" type="submit" disabled={!isValid} variant="contained">
          Change password
        </Button>
      </Form>
    </FormikProvider>
  );
};
