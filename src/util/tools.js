import axios from 'axios';
import { history } from '../index';
export const config = {
  setCookie: (name, value, days) => {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getCookie: (name) => {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  setStore: (name, value) => {
    localStorage.setItem(name, value);
  },
  setStoreJson: (name, value) => {
    let json = JSON.stringify(value);
    localStorage.setItem(name, json);
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return null;
  },
  ACCESS_TOKEN: 'accessToken',
  USER_LOGIN: 'userLogin',
};

export const { setCookie,  getCookie,  getStore, setStore, setStoreJson, getStoreJson,ACCESS_TOKEN,USER_LOGIN } = config;


const DOMAIN = 'https://fiverrnew.cybersoft.edu.vn/api';
const TOKEN_CYBERSOFT =
  '1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU';

// cấu hình request cho tất cả api - response cho tất cả kết quả từ api trả về

// cấu hình domain gửi đi
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000, //5 phut
});
// cấu hình request header
http.interceptors.request.use(
  (config) => {
    const token = getStore(ACCESS_TOKEN);
    config.headers = {
      ...config.headers,
      ['Authorization']: `Bearer ${token}`,
      ['TokenCybersoft']: TOKEN_CYBERSOFT,
    };

    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// cấu hình kết quả trả về
http.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    console.log(err.response.status);
    if (err.response.status === 400 || err.response.status === 404) {
      // history.push('/');
      return Promise.reject(err);
    }
    if (err.response.status === 500) {
      alert('Vui lòng nhập đúng email đã đăng kí!');
    }

    if (err.response.status === 401 || err.response.status === 403) {
      alert('Token không hợp lệ! Vui lòng đăng nhập lại!');
      history.push('/login');
      return Promise.reject(err);
    }
  },
);