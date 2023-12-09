import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/AuthReducer";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState(false);

  const dispatch = useDispatch();

  const LoginForm = async (data) => {
    await axios
      .post(import.meta.env.VITE_USER_LOGIN, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        const response = res.data;
        console.log(response)
        dispatch(authActions.login({ accessToken: response.accessToken }));
        if(response.role === 'Owner') {
          navigate('/at3')
        } else {
          navigate('/at3/keeper-edit/')
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
  };

  const onSubmit = (data) => {
    
    LoginForm(data);
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
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
              {/* {errors.email && <p className="error-message">{errors.email.message}</p>} */}
              <TextField
                label="Password"
                type="password"
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
                  endAdornment:
                    errors.password || loginError ? (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <ErrorOutline color="error" />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                }}
              />
              {/* {errors.email && <p className="error-message">{errors.password.message}</p>} */}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={() => dispatch(authActions.login())}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
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
