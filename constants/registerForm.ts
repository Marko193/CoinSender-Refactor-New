import * as Yup from 'yup';

const passwordExp: any = '[a-zA-Z0-9]+';

// @ts-ignore
export const validationSchemaForCompany = Yup.object().shape({
  name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
  second_name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
  company: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
  email: Yup.string().email('Email must be a valid email address').required('Is required'),
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
export const initialValuesForCompany = {
  name: '',
  second_name: '',
  company: '',
  phone: '',
  email: '',
  password: '',
  confirm_password: '',
};
