import axios from 'axios';
import { getCookie, removeDataFromLocalstorage } from '@/helpers/api/auth';
import { refreshToken } from './auth';

export * from './auth';

export const BASE_URL = 'http://localhost:8080';
// export const BASE_URL = 'https://app.coinsender.io/api';

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
      originalRequest._isRetry = true;
      try {
        const response = await refreshToken();
        if (response.status === 201) {
          localStorage.setItem('access_token', getCookie('Authentication'));
          return instance.request(originalRequest);
        } else {
          removeDataFromLocalstorage('access_token');
          removeDataFromLocalstorage('authorization_login');
          window.location.reload();
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
