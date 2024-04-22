import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "../store/AuthReducer";
import { FormControlLabel, Checkbox, Link, Box, TextField, Button, Grid, Typography, InputAdornment, IconButton, Container, Paper , Alert} from "@mui/material";
import { Button as ButtonSuite } from "rsuite";
import { ErrorOutline } from "@mui/icons-material";
import axios from "axios";
import { Navigate   , useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/AuthAction'

function Login() {
  const { handleSubmit, register, formState: { errors }, } = useForm();

  const { loading, userInfo, error, success, accessToken } = useSelector(
    (state) => state.auth
  )  
  const dispatch = useDispatch()

  const navigate = useNavigate()
  // const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (accessToken) {
      userInfo?.role === "PetKeeper" ? navigate(`/at3/keeper-edit/${userInfo?.id}`) : navigate("/at3/");
    }
  }, [accessToken])

  // const LoginForm = async (data) => {
  //   await axios
  //     .post(import.meta.env.VITE_USER_LOGIN, {
  //       email: data.email,
  //       password: data.password,
  //     })
  //     .then((res) => {
  //       const response = res.data;
  //       console.log(response)
  //       dispatch(authActions.login({ accessToken: response.accessToken, role: response.role, id: response.id }));
  //       if(response.role === 'Owner') {
  //         navigate('/at3')
  //       } else {
  //         navigate('/at3/keeper-edit/' + response.id)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoginError(true);
  //     });
  // };

  const onSubmit = (data) => {
    // LoginForm(data);
    dispatch(userLogin(data))
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <img src="/assets/logo.png" alt="" width={120} />
              {/* <img src="https://i.imgur.com/ids0WFZ.png" alt="" width={50} /> */}
            </div>
            <h4 className="fw-bold">Login</h4>
            {!!error &&
              <Alert
              className="my-2"
              sx={{ width: '100%' }}
              severity={"error"}
              >         
                  <div className="fs-6">
                    <span>Incorrect email or password.</span>
                  </div>
              </Alert>
            }
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <TextField
                label="Email Address"
                margin="normal"
                fullWidth
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
                error={!!errors.email || loginError}
                helperText={errors.email?.message}
                InputProps={{
                  endAdornment:
                    errors.email || loginError ? (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <ErrorOutline color="error" />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password || loginError}
                helperText={
                  errors.password?.message ||
                  (loginError && "Incorrect email or password")
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <div className="blue-btn mb-2">
                <ButtonSuite
                  type="submit"
                  appearance="primary" block
                >
                  {loading ? <span>loading...</span> : <span>Login</span>}
                </ButtonSuite>
              </div>
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <span>loading...</span> : <span>Login</span>}
              </Button> */}
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/at3/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
export default Login;
