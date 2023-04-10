import axios from 'axios';
import { getCookie, removeDataFromLocalstorage } from '@/helpers/api/auth';
import { refreshToken } from './auth';
import Router from 'next/router';

export * from './auth';

// export const BASE_URL = 'http://localhost:8080';
// export const BASE_URL = 'https://app.coinsender.io/api';
export const BASE_URL = 'https://nova.coinsender.io/api';

export const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('access_token');
  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      console.log('401 error status');
      originalRequest._isRetry = true;
      try {
        const response = await refreshToken();
        if (response.status === 201) {
          localStorage.setItem('access_token', getCookie('Authentication'));
          return instance.request(originalRequest);
        } else {
          localStorage.removeItem('authorization_login');
          localStorage.removeItem('access_token');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('refresh_token');
          await Router.push('/auth');
        }
      } catch (e) {
        removeDataFromLocalstorage('access_token');
        removeDataFromLocalstorage('authorization_login');
        window.location.reload();
      }
    }
    throw error;
  },
);
