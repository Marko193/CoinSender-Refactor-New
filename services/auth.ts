import axios from 'axios';
import { BASE_URL, instance } from './index';

export const signUp = (data: any) => {
  return axios.post(`${BASE_URL}/auth/register`, data);
};

export const signIn = async (data: any) => {
  return await axios.post(`${BASE_URL}/auth/login`, data);
};

export const sendRestorePasswordLetter = (data: any) => {
  return instance.post('auth/forgot-password', data);
};

export const resetPassword = (data: any) => {
  return instance.patch('/authentication/restore-password', data);
};

export const googleAuthMiddleware = async () => {
  return instance.get(`${BASE_URL}/auth/google`)
}
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

export const getAccessTokenFromGoogle = (googleToken: any) => {
  return axios.get(`${BASE_URL}/auth/google/get-auth-token?code=${googleToken}`);
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
  return instance.post(`/auth/logout`);
};

export const getEmployeeList = () => {
  return instance.get(`/employee`);
};
