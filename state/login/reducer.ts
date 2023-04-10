import { createSlice } from '@reduxjs/toolkit';
import { signIn } from '@/services';
import { setDataToLocalStorage } from '@/helpers';
import router from 'next/router';

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
        console.log('res', response.data);
        if (response.status === 200) {
          setDataToLocalStorage('access_token', response.data.data);
          const returnUrl: any = router.query.returnUrl || '/';
          router.push(returnUrl);
        }
      });
    },
  },
});

export const { signInReducer } = signInSlice.actions;
export default signInSlice.reducer;
