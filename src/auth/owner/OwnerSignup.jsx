// import * as React from "react";
import React, { useRef, useState } from "react";
import { useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
// import clsx from "clsx";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function BasicFormControl() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [open, setOpen] = useState(false);
    const [alertStatus, setAlertStatus] = useState("");
    const navigate = useNavigate();

    const SignUpForm = async (data) => {
        const result = {
            "firstname": data.firstName,
            "lastname": data.lastName,
            "phone": data.phone,
            "petname": data.petName,
            "email":data.email,
            "password": data.password,
            "role": 2
          } 
        await axios.post(import.meta.env.VITE_OWNER_SIGNUP, result).then((res) => {
            setOpen(true)
            setAlertStatus('success')
            setTimeout(() =>{
                navigate('/at3/login')
            },3000)
        }).catch((err) => {
            setOpen(true)
            setAlertStatus('error')
            console.log(err.message)
        })
    }

    const onSubmit = (data) => {
        console.log(data)
        SignUpForm(data)
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
        <form onSubmit={handleSubmit(onSubmit)} >
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}  anchorOrigin={{ vertical : 'top', horizontal : 'center' }} >
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
                    <div className="col-md-6">
                        <Label>Firstname</Label>
                        <StyledInput className="pb-3"
                            placeholder="Write your Firstname here"
                            {...register("firstName", { required: "Firstname is required", maxLength: {
                                value: 200,
                                message: "Name must not more than 200 characters"
                            }})}
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <Label>Lastname</Label>
                        <StyledInput className="pb-3"
                            placeholder="Write your Lastname here"
                            {...register("lastName", { required: "Lastname is required", maxLength: {
                                value: 200,
                                message: "Name must not more than 200 characters"
                            }})}
                        />
                        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <Label>Email</Label>
                        <StyledInput className="pb-3"
                            placeholder="Example@mail.com"
                            {...register("email", { required: "Email is required", maxLength: 100, pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                            } })}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <Label>Phone</Label>
                        <StyledInput className="pb-3"
                            type="tel"
                            placeholder="Write your Phone here"
                            {...register("phone", { required: "Phone is required", maxLength: {
                                value: 10,
                                message: "Phone number must not more than 10 characters"
                            } })}
                        />
                        {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <Label>Password</Label>
                        <StyledInput className="pb-3"
                            type="password"
                            placeholder="Write your Password here"
                            {...register("password", { required: "Password is required", minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            },maxLength: {
                                value: 20,
                                message: "Password must not more than 20 characters"
                            } })}
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <Label>Confirm Password</Label>
                        <StyledInput className="pb-3"
                            type="password"
                            placeholder="Please confirm your password"
                            {...register("confirmPassword", { required: true, validate: value =>
                                value === password.current || "The passwords do not match" 
                            })}
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                    </div>
                    
                    <div className="col-md-6">
                        <Label>Petname</Label>
                        <StyledInput className="pb-3"
                            placeholder="Write your Petname here"
                            {...register("petName", { maxLength: {
                                value: 200,
                                message: "Contact must not more than 200 characters"
                            }})}
                        />
                        {errors.petName && <p className="error-message">{errors.petName.message}</p>}
                    </div>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
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
