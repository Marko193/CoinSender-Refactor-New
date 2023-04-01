// @ts-ignore
export const setDataToLocalStorage = (key: any, value: any) => {
  localStorage.setItem(key, value);
};

// @ts-ignore
export const removeDataFromLocalstorage = (key: any) => {
  localStorage.removeItem(key);
};

// @ts-ignore
export const getCookie = (cookieName: any) => {
  let cookie = {};
  document.cookie.split(';').forEach(function (el) {
    let [key, value] = el.split('=');
    // @ts-ignore
    cookie[key.trim()] = value;
  });
  // @ts-ignore
  return cookie[cookieName];
};
