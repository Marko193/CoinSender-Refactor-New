import { createSlice } from '@reduxjs/toolkit';
import { signIn } from '@/services';
import { setDataToLocalStorage } from '@/helpers';
import router from 'next/router';
import { toast } from 'react-toastify';

export interface LoginData {
  email?: string;
  password?: string;
}

export const initialState: LoginData = {
  email: '',
  password: '',
};

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signInReducer(state, { payload: { signInData } }) {
      signIn(signInData).then(response => {
        try {
          if (response.status === 200) {
            setDataToLocalStorage('access_token', response.data.data.access_token);
            const returnUrl: any = router.query.returnUrl || '/';
            router.push(returnUrl);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      });
    },
  },
});

export const { signInReducer } = signInSlice.actions;
export default signInSlice.reducer;
