import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "../store/AuthAction";
import { logout } from '../store/AuthSlice';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const getTokenExpireTime = (token) => {
    return token.exp * 1000;
}
function AuthVerify() {
    let location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo, accessToken } = useSelector((state) => state.auth)  
    useEffect(() => {
  
      if (accessToken) {
        const decodedJwt_accessToken = parseJwt(accessToken);
        const decodedJwt_refreshToken = parseJwt(userInfo.refreshToken);

        if(getTokenExpireTime(decodedJwt_refreshToken) < Date.now()) {
            dispatch(logout())
        }
        else if (getTokenExpireTime(decodedJwt_accessToken) < Date.now()) {
            dispatch(refreshToken()).then(() => {
              navigate(0)
            })
        }
      }
    }, [location, dispatch, accessToken]);
  
    return ;
}

export default AuthVerify