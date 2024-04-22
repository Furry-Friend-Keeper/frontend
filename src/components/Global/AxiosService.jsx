 import { logout, checkRefreshToken } from '../../store/AuthSlice';
import axios from "axios";
import store from "../../store/Store";
// import { Notification, useToaster, ButtonToolbar, SelectPicker, Button } from 'rsuite';

// const message = (
//   <Notification type="warning" header="Warning!" closable>
//     <p>Authentication Failed. Your session token has expired.</p>
//     <hr />
//     <ButtonToolbar>
//       <Button onClick={() => store.dispatch(logout())} appearance="primary">Login</Button>
//       <Button appearance="default">Close</Button>
//     </ButtonToolbar>
//   </Notification>
// );

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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { auth } = store.getState();
        // console.log(auth)
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
        // Notification.open({
        //   placement: 'topCenter',
        //   duration: 5000, // Optional duration for how long the notification should be visible
        //   description: message, // Using the previously defined message
        // });
        store.dispatch(logout());
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;