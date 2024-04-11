import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "../../store/AuthAction";
import { logout } from '../../store/AuthSlice';
import axios from "axios";
import store from "../../store/Store";

function AxiosService() {
    const { userInfo, accessToken } = useSelector((state) => state.auth)  
    const dispatch = useDispatch();
    axios.defaults.baseURL = 'https://capstone23.sit.kmutt.ac.th/at3/api/';

    axios.interceptors.request.use(config => {
      const { auth } = store.getState();
      if (auth.accessToken) {
        config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
      }
      return config;
    })
    
    // Add this in services/axiosService.js
    axios.interceptors.response.use(response => response, async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // const { auth } = store.getState();
        // Assume you have a function to refresh token
        const newAccessToken = dispatch(refreshToken());
        console.log(newAccessToken)
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }

      if (error.response.status === 401 && originalRequest._retry) {
        dispatch(logout());
        // window.location.href = '/login';
      }

      return Promise.reject(error);
    });
  return;
}

export default AxiosService