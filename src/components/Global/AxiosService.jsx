 import { logout, checkRefreshToken, displaySessionExpire } from '../../store/AuthSlice';
import axios from "axios";
import store from "../../store/Store";

const axiosInstance = axios.create({
  baseURL: 'https://capstone23.sit.kmutt.ac.th/at3/api/',
});

axiosInstance.interceptors.request.use(config => {
  const { auth } = store.getState();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { auth } = store.getState();
        const response = await axios.get(import.meta.env.VITE_REFRESH_TOKEN, {
          headers : {
            'refreshToken': auth.userInfo.refreshToken
          }
        });
        const { accessToken, refreshToken } = response.data;
        store.dispatch(checkRefreshToken(response.data))
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (_error) {
        console.log(_error)
        store.dispatch(logout());
        // store.dispatch(displaySessionExpire());
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;