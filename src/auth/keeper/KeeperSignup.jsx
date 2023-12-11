// import * as React from "react";
import React, { useRef, useState, useEffect } from "react";
import { useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
// import clsx from "clsx";
import { useForm } from "react-hook-form";
import Textarea from '@mui/joy/Textarea';
import Tooltip from '@mui/material/Tooltip';    
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {  Chip } from '@mui/joy';
import InputAddress from 'react-thailand-address-autocomplete'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BasicFormControl() {
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [open, setOpen] = useState(false);
    const [alertStatus, setAlertStatus] = useState("");
    const [petCategories, setPetCategories] = useState([]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        PetKeeperCategories()
    },[])

    const PetKeeperCategories = async() => {
        await axios.get(import.meta.env.VITE_KEEPER_CATEGORIES).then((res)=> {
            const response = res.data;
            setPetCategories(response)
        }).catch((err) => {
            console.log(err)
        })
    }


    const SignUpForm = async (data) => {
        const result = {
            "name": data.keeperName,
            "detail": data.detail,
            "contact": data.contact,
            "phone":data.phone,
            "categoryId": data.petCategories,
            "email": data.email,
            "password": data.password,
            "role": 3, 
            "address": data.address
          } 
        await axios.post(import.meta.env.VITE_KEEPER_SIGNUP, result).then((res) => {
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
        // console.log('Selected petCategories:', JSON.parse(data.petCategories));
        const address = {
            address: data.address,
            district: district,
            province: province,
            postalCode: zipcode,
            map: "https://maps.example.com/12345"
        }
        data.address = address
        if(data.petCategories !== ""){
            data.petCategories = JSON.parse(data.petCategories)
        }
        console.log(data)
        
        
        SignUpForm(data)
    };
    watch('petCategories')

    const password = useRef({});
    password.current = watch("password", "");

    function onSelect(fulladdress) {
        const {  district, province, zipcode } = fulladdress;
        setDistrict(district);
        setProvince(province);
        setZipcode(zipcode);
      }

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                        <Label>Keeper Name<Tooltip title="Name of store"><span> (?)</span></Tooltip></Label>
                        <StyledInput className="pb-3"
                            placeholder="Pet Farm"
                            {...register("keeperName", { required: "Keeper Name is required", maxLength: {
                                value: 200,
                                message: "Name must not more than 200 characters"
                            }})}
                        />
                        {errors.keeperName && <p className="error-message">{errors.keeperName.message}</p>}
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
                        <Label>Password</Label>
                        <StyledInput className="pb-3"
                            type="password"
                            placeholder="12345678"
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
                            placeholder="12345678"
                            {...register("confirmPassword", { required: "Confirm Password is required", validate: value =>
                                value === password.current || "The passwords do not match" 
                            })}
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <Label>Phone</Label>
                        <StyledInput className="pb-3"
                            type="tel"
                            placeholder="089XXXXXXX"
                            {...register("phone", { required: "Phone is required", maxLength: {
                                value: 10,
                                message: "Phone number must not more than 10 characters"
                            } })}
                        />
                        {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <Label>Contact</Label>
                        <StyledInput className="pb-3"
                            placeholder="Write your contact here"
                            {...register("contact", { required: "Contact is required", maxLength: {
                                value: 200,
                                message: "Contact must not more than 200 characters"
                            }})}
                        />
                        {errors.contact && <p className="error-message">{errors.contact.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <Label>Detail</Label>
                        <div className="pb-3">
                            <Textarea minRows={2} className="pb-3"
                                placeholder="Write your Detail here"
                                {...register("detail", { maxLength: 1000 })}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Label>Pet Category</Label>
                        <div className="pb-3">
                        <Select
                            multiple
                            placeholder="select pet category"
                            {...register('petCategories')}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                {selected.map((selectedOption, index) => (
                                    <Chip key={index} variant="soft" color="primary"  >
                                    {selectedOption.label}
                                    </Chip>
                                ))}
                                </Box>
                            )}
                            sx={{
                                minWidth: '320px',
                            }}
                            slotProps={{
                                listbox: {
                                sx: {
                                    width: '100%',
                                    // backgroundColor: 'red',
                                },
                                },
                            }}
                            >
                            {petCategories.map((category, index) => (
                                <Option key={index} value={category.id}>{category.name}</Option>
                            ))}
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Label>Address</Label>
                            <StyledInput className="pb-3"
                                placeholder="123/45 หมู่บ้านซอยตัน"
                                {...register("address", { required: "Address is required", maxLength: {
                                    value: 200,
                                    message: "Name must not more than 200 characters"
                                }})}
                            />
                            {errors.address && <p className="error-message">{errors.address.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <Label>District</Label>
                            <div className="autocomplete">
                            <InputAddress
                                id="1"
                                placeholder="กรุณาเลือกอำเภอ"
                                address="district"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                onSelect={onSelect}
                            />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Label>Province</Label>
                            <div className="autocomplete">
                            <InputAddress
                                id="2"
                                placeholder="กรุณาเลือกจังหวัด"
                                address="province"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                onSelect={onSelect}
                            />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Label>Postal Code</Label>
                            <div className="autocomplete">
                            <InputAddress
                                id="3"
                                placeholder="กรุณาเลือกรหัสไปรษณีย์"
                                address="zipcode"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                onSelect={onSelect}
                            />
                            </div>
                        </div>
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
