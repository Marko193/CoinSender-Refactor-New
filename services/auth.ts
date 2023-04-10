import axios from 'axios';
import { BASE_URL, instance } from './index';

export const signUp = (data: any) => {
  return axios.post(`${BASE_URL}/authentication/registration`, data);
};

export const signIn = (data: any) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};

export const sendRestorePasswordLetter = (data: any) => {
  return instance.post('/authentication/send-reset-password-letter', data);
};

export const resetPassword = (data: any) => {
  return instance.patch('/authentication/restore-password', data);
};

export const getUserDataGoogle = async (accessToken: string) => {
  try {
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  } catch (error) {
    console.log('get Google User data error', error);
  }
}

export const googleAuth = (data: any) =>
  instance.post(`/authentication/validate-google-tokenId`, { tokenId: data });

export const refreshToken = () => {
  return axios.post(
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

export const logout = () => {
  return instance.post(`/authentication/logout`);
};

export const getEmployeeList = () => {
  return instance.get(`/employee`);
};




//
// export const restorePassword = (data: any) => instance.post(`auth/restore-password`, data);

// export const forgot-password = (data: any) =>
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
