import axios from 'axios';
import { BASE_URL, instance } from './index';

// const { post, put } = apiClient;

export let signIn = (data: any) => {
  return instance.post(`/authentication/login`, data);
};
// export const googleAuth = (data: any) =>
//   instance.post(`/authentication/validate-google-tokenId`, { tokenId: data });
//
// export const logoutUser = () => instance.post(`/authentication/logout`);
//
// export const signUp = (data: any) => axios.post(`${BASE_URL}/authentication/registration`, data);
//
// export const restorePassword = (data: any) => instance.post(`auth/restore-password`, data);

export const refreshToken = () => {
  axios.post(
    `${BASE_URL}/authentication/refresh`,
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('refresh_token'),
      },
    },
  );
};



// export const changePassword = (data: any) =>
//   instance.patch('/authentication/restore-password-profile', data);

// export const forgotPassword = (data: any) =>
//   instance.post('/authentication/send-reset-password-letter', data);
//
// export const editUserProfile = (data) => instance.patch('/administrators/editprofile', data);
//
// export const editUserAvatar = ({ image }) => {
//   const formData = new FormData();
//   formData.append('image', image);
//   return instance.post(`/administrators/avatar`, formData, {
//     headers: {
//       ...instance.headers,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };
