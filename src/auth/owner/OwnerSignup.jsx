// import * as React from "react";
import React, { useRef, useState, useEffect } from "react";
import { useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
// import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch, useSelector } from 'react-redux'
import { registerOwner } from "../../store/AuthAction";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function BasicFormControl() {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm();

    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
        )
    const dispatch = useDispatch()
    const navigate = useNavigate();

      useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) {
        //   setTimeout(() => {
        //     navigate("/at3/login");
        //   }, 3000);
          navigate('/at3/login', { replace: true })
        }
      }, [success])

    const [open, setOpen] = useState(false);
    const [alertStatus, setAlertStatus] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    // const SignUpForm = async (data) => {
    //     const result = {
    //         "firstname": data.firstName,
    //         "lastname": data.lastName,
    //         "phone": data.phone,
    //         "petname": data.petName,
    //         "email":data.email,
    //         "password": data.password,
    //         "role": 2
    //       } 
    //     await axios.post(import.meta.env.VITE_OWNER_SIGNUP, result).then((res) => {
    //         setOpen(true)
    //         setAlertStatus('success')
    //         setTimeout(() =>{
    //             navigate('/at3/login')
    //         },3000)
    //     }).catch((err) => {
    //         setOpen(true)
    //         setAlertStatus('error')
    //         console.log(err.message)
    //     })
    // }

    const onSubmit = (data) => {
        const phoneNumber = (data.phone).replace(/^66/, "0") 
        console.log(phoneNumber )  

        const result = {
            firstname : data.firstName,
            lastname : data.lastName,
            phone : phoneNumber,
            petname : data.petName,
            email :data.email,
            password : data.password,
            role : 2
          } 
        console.log(result)
        // SignUpForm(data)
        dispatch(registerOwner(result))
        // SignUpForm(data);
    };

    const password = useRef({});
    password.current = watch("password", "");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <form className="border-top border-2" onSubmit={handleSubmit(onSubmit)} >
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}  anchorOrigin={{ vertical : 'top', horizontal : 'center' }} >
                <Alert onClose={handleClose} severity={alertStatus === 'success' ? 'success' : 'error'} elevation={6} >
                    {alertStatus === 'success' ?
                    <div>
                        <AlertTitle>Success</AlertTitle>
                        Singup Successful!!!
                    </div>
                    :
                    <div>
                        <AlertTitle>Failed</AlertTitle>
                        Signup Failed!! Email must be unique.
                    </div>
                    }
                </Alert>
            </Snackbar>
            <div className="container mt-4">
                <div className="row">
                    <h5 className="mb-5">Please complete all information below:</h5>
                    <div className="col-md-6 pb-4">
                        <Label>Firstname</Label>
                        <input className={`form-control ${errors.firstName ? "is-invalid" : ""} py-2`}
                            placeholder="Write your Firstname here"
                            {...register("firstName", { required: "Please enter your firstname.", maxLength: {
                                value: 200,
                                message: "Name must not more than 200 characters"
                            }})}
                        />
                        {errors.firstName && <small className="invalid-feedback">{errors.firstName.message}</small>}
                    </div>
                    <div className="col-md-6 pb-4">
                        <Label>Lastname</Label>
                        <input className={`form-control ${errors.lastName ? "is-invalid" : ""} py-2`}
                            placeholder="Write your Lastname here"
                            {...register("lastName", { required: "Please enter your lastname.", maxLength: {
                                value: 200,
                                message: "Name must not more than 200 characters"
                            }})}
                        />
                        {errors.lastName && <small className="invalid-feedback">{errors.lastName.message}</small>}
                    </div>
                    <div className="col-md-12 pb-4">
                        <Label>Email</Label>
                        <input className={`form-control ${errors.email ? "is-invalid" : ""} py-2`}
                            placeholder="Example@mail.com"
                            {...register("email", { required: "Please enter your email.", maxLength: 100, pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                            } })}
                        />
                        {errors.email && <small className="invalid-feedback">{errors.email.message}</small>}
                    </div>
                    <div className="col-md-12 pb-4">
                        <Label>Phone</Label>
                        {/* <PhoneInput
                            inputClass={`${errors.phone ? "is-invalid" : ""} py-2`}
                            inputStyle={{ width: "100%"}}
                            specialLabel={""}
                            country={"th"}
                            countryCodeEditable={false}
                            placeholder="Enter phone number"
                            {...register("phone", {
                                required: "Please enter your phone number.",
                                maxLength: {
                                value: 10,
                                message: "Phone number must not more than 10 characters",
                                },
                            })}
                            /> */}
                            <Controller
                                control={control}
                                name="phone"
                                rules={{ required: "Please enter your phone number.",
                                        maxLength: { value:11, message: "Phone number must not more than 10 characters"},
                                        minLength : { value:11, message: "Phone number must not more than 10 characters"}

                                    }}
                                // className="form-control"
                                render={({ field: { ref, ...field } }) => (
                                    <PhoneInput
                                    {...field}
                                    inputProps={{
                                        ref,
                                        required: true,
                                        autoFocus: true,
                                        // className: "form-control py-2"
                                    }}
                                    masks={{th: '.. ... ....', }}
                                    inputClass={`${errors.phone ? "is-invalid" : ""} py-2`}
                                    inputStyle={{ width: "100%"}}
                                    specialLabel={""}
                                    country={"th"}
                                    countryCodeEditable={false}
                                    placeholder="Enter phone number"
                                    />
                                )}
                                />
                        {errors.phone && <small className="error-message">{errors.phone.message}</small>}
                    </div>
                    <div className="col-md-12 pb-4">
                        <Label>Password</Label>
                        <div className="form-password">
                            <input className={`form-control ${errors.password ? "is-invalid" : ""} py-2`}
                                placeholder="Write your Password here"
                                type={showPassword1 ? "text" : "password"}
                                {...register("password", { required: "Please enter your password.", minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                },maxLength: {
                                    value: 20,
                                    message: "Password must not more than 20 characters"
                                } })}
                            />
                            {errors.password && <small className="invalid-feedback">{errors.password.message}</small>}
                            <div className="toggle-password">
                                <IconButton onClick={() => { setShowPassword1(!showPassword1) }} edge="end">
                                {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 pb-4">
                        <Label>Confirm Password</Label>
                        <div className="form-password">
                            <input                 
                            type={showPassword2 ? "text" : "password"}
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""} py-2`}
                                placeholder="Please confirm your password"
                                {...register("confirmPassword", { required: "Please enter your confirm password.", validate: value =>
                                    value === password.current || "The passwords do not match" 
                                })}
                            />
                            {errors.confirmPassword && <small className="invalid-feedback">{errors.confirmPassword.message}</small>}
                            <div className="toggle-password">
                                <IconButton onClick={() => { setShowPassword2(!showPassword2) }} edge="end">
                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-12 pb-4">
                        <Label>Petname</Label>
                        <input className={`form-control ${errors.petName ? "is-invalid" : ""} py-2`}
                            placeholder="Write your Petname here"
                            {...register("petName", { maxLength: {
                                value: 200,
                                message: "Contact must not more than 200 characters"
                            }})}
                        />
                        {errors.petName && <small className="invalid-feedback">{errors.petName.message}</small>}
                    </div>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            style={{ width: '100%'}}
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                        >
                            Submit
                        </Button>
                    </Box>
            {/* <div className="grid justify-content-end">
                <button type="submit" className="btn fw-semibold btn-primary">
                    Submit
                </button>
            </div> */}
            </div>
            </div>
        </form>
    );
}

const StyledInput = styled(Input)(
    ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
        theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
          theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  }
`
);

const Label = styled(({ children, className }) => {
    return (
        <label className="mb-2">
            {children}
        </label>
    );
})`
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;

    &.invalid {
        color: red;
    }
`;

// const HelperText = styled((props) => {
//     const formControlContext = useFormControlContext();
//     const [dirty, setDirty] = React.useState(false);

//     React.useEffect(() => {
//         if (formControlContext?.filled) {
//             setDirty(true);
//         }
//     }, [formControlContext]);

//     if (formControlContext === undefined) {
//         return null;
//     }

//     const { required, filled } = formControlContext;
//     const showRequiredError = dirty && required && !filled;

//     return showRequiredError ? <p {...props}>This field is required.</p> : null;
// })`
//     font-family: "IBM Plex Sans", sans-serif;
//     font-size: 0.875rem;
// `;

const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};
