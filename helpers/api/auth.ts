// @ts-ignore
import { logout } from '@/services';
import Router from 'next/router';

export const setDataToLocalStorage = (key: any, value: any) => {
  localStorage.setItem(key, value);
};

// export const getItemFromLocalStorage = (key: any) => {
//   return JSON.parse(JSON.stringify(localStorage.getItem(key)));
// }

// @ts-ignore
export const removeDataFromLocalstorage = (key: any) => {
  localStorage.removeItem(key);
};

// @ts-ignore
export const getCookie = (cookieName: any) => {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key, value] = el.split('=');
    // @ts-ignore
    cookie[key.trim()] = value;
  });
  // @ts-ignore
  return cookie[cookieName];
};

export const logoutFunction = async () => {
  // remove user from local storage and redirect to login page
  try {
    const response: any = await logout();
    if (response.status === 204) {
      await Router.push('/auth');
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('currentUser');
    }
  } catch (error: any) {
    console.log('error', error.message);
  }
};
