import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from 'connection';

// export interface UserState {
//   selectedWallet?: ConnectionType;
// }

export interface LoginData {
  email?: string;
  password?: string;
}

export const initialState: LoginData = {
  email: '',
  password: ''
};

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signInReducer(state, { payload: { signInData } }) {
      console.log('signInData', signInData);
    },
    // updateSelectedWallet(state, { payload: { wallet } }) {
    //   state.selectedWallet = wallet;
    // },
  },
});

export const { signInReducer } = signInSlice.actions;
export default signInSlice.reducer;
