import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    const dispatch = useDispatch();
    const { loading, userInfo, error, success, accessToken } = useSelector((state) => state.auth)  
    useEffect(() => {
  
      if (accessToken) {
        const decodedJwt_accessToken = parseJwt(accessToken);
        const decodedJwt_refreshToken = parseJwt(userInfo.refreshToken);
        // console.log("access" + new Date(getTokenExpireTime(decodedJwt_accessToken)))
        // console.log("refresh" + new Date(getTokenExpireTime(decodedJwt_refreshToken)))
        if(getTokenExpireTime(decodedJwt_refreshToken) < Date.now()) {
            dispatch(logout())
        }
        else if (getTokenExpireTime(decodedJwt_accessToken) < Date.now()) {
            dispatch(refreshToken())
        }
      }
    }, [location]);
  
    return ;
}

export default AuthVerify