// import * as React from "react";
import React, { useRef, useState, useEffect } from "react";
import { styled } from "@mui/system";
// import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { Tooltip, Box, Button, Snackbar, Alert, AlertTitle, IconButton } from "@mui/material";
import { Button as ButtonSuite } from "rsuite";
import { Select, Chip, Option } from "@mui/joy";
import InputAddress from "react-thailand-address-autocomplete";
import axios from "axios";
import { useNavigate, redirect } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Map from "./Map.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { registerKeeper } from "../../store/AuthAction";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Message, useToaster } from 'rsuite';
import { CheckPicker } from 'rsuite';

export default function BasicFormControl() {
  const [subdistrict, setSubdistrict] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [open, setOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [petCategories, setPetCategories] = useState([]);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [getLocation, setLocation] = useState("")
  const [addressLabel, setAddressLabel] = useState("")
  const [listAll, setListAll] = useState([])
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()

  const [type, setType] = useState('error');
  const [placement, setPlacement] = useState('topEnd');
  const toaster = useToaster();

  const message = (
    <Message showIcon type={type} header={'Failed!'} closable>
      {/* <h6><strong>Failed!</strong> </h6> */}
      <p className="text-black">{error}</p>
    </Message>
  );


  useEffect(() => {
    PetKeeperCategories();
  }, []);

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) {
      // setTimeout(() => {
      //   navigate("/at3/login");
      // }, 3000);
      navigate('/at3/login')
    } else if (error) {
      toaster.push(message, { placement, duration: 3000 })
    }
  }, [success, error])

  const PetKeeperCategories = async () => {
    await axios
      .get(import.meta.env.VITE_KEEPER_CATEGORIES)
      .then((res) => {
        const response = res.data;
        const updatedResponse = response.map(({ id, name }) => ({ label: name, value: id }));
        setPetCategories(updatedResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    console.log(data)
    const address = {
      address: addressLabel,
      district: district,
      province: province,
      postalCode: zipcode,
      map: getLocation,
    };
    // if (data.petCategories !== "") {
    //   data.petCategories = JSON.parse(data.petCategories);
    // }

    const phoneNumber = (data.phone).replace(/^66/, "0").trim()
    const result = {
      name: data.keeperName,
      detail: data.detail,
      contact: data.contact,
      phone: phoneNumber,
      categoryId: data.petCategories,
      email: data.email,
      password: data.password,
      role: 3,
      address: address,
    };

    dispatch(registerKeeper(result))
    // SignUpForm(data);
  };

  const password = useRef({});
  password.current = watch("password", "");

  function onSelect(fulladdress) {
    const { subdistrict, district, province, zipcode } = fulladdress;
    setSubdistrict(subdistrict);
    setDistrict(district);
    setProvince(province);
    setZipcode(zipcode);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <form className="border-top border-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertStatus === "success" ? "success" : "error"}
          elevation={4}
        >
          {alertStatus === "success" ? (
            <div>
              <AlertTitle>Success</AlertTitle>
              Singup Successful!!!
            </div>
          ) : (
            <div  className="fs-6">
              <AlertTitle><b>Failed</b></AlertTitle>
               {error}
            </div>
          )}
        </Alert>
      </Snackbar> */}
      <div className="container mt-4">
        <div className="">
          <h5 className="mb-5">Please complete all information below:</h5>
          <div className="col-md-6 pb-4">
            <Label>
              Pet keeper name &nbsp;
              <Tooltip title="ชื่อร้าน">
                <HelpOutlineIcon fontSize="inherit" />
              </Tooltip>
            </Label>
            <input
              className={`form-control ${errors.keeperName ? "is-invalid" : ""} py-2`}
              placeholder="Name"
              {...register("keeperName", {
                required: "Please enter your keeper name.",
                maxLength: {
                  value: 200,
                  message: "Name must not more than 200 characters",
                },
              })}
            />
            {errors.keeperName && (
              <small className="invalid-feedback">
                {errors.keeperName.message}
              </small>
            )}
          </div>
          <div className="col-md-6 pb-4">
            <Label>Email</Label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""} py-2`}
              placeholder="Ex. example@mail.com"
              {...register("email", {
                required: "Please enter your email address.",
                maxLength: 100,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email && (
              <small className="invalid-feedback">{errors.email.message}</small>
            )}
          </div>
          <div className="col-md-6 pb-4">
            <Label>Password</Label>
            <div className="form-password">
              <input
                className={`form-control ${errors.password ? "is-invalid" : ""} py-2`}
                placeholder="Write your password here"
                type={showPassword1 ? "text" : "password"}
                {...register("password", {
                  required: "Please enter your password.",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must not more than 20 characters",
                  },
                })}
              />
              {errors.password && (
                <small className="invalid-feedback">{errors.password.message}</small>
              )}
              <div className="toggle-password">
                <IconButton onClick={() => { setShowPassword1(!showPassword1) }} edge="end">
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>
          </div>
          <div className="col-md-6 pb-4">
            <Label>Confirm password</Label>
            <div className="form-password">
              <input
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                  } py-2`}
                placeholder="Please confirm your password"
                type={showPassword2 ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (val) => {
                    if (watch('password') != val) {
                      return "Your passwords do no match";
                    }
                  }
                })}
              />
              {errors.confirmPassword && (
                <small className="invalid-feedback">
                  {errors.confirmPassword.message}
                </small>
              )}
              <div className="toggle-password">
                <IconButton onClick={() => { setShowPassword2(!showPassword2) }} edge="end">
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>
          </div>
          <div className="col-md-6 pb-4">
            <Label>Pet category</Label>
            <Controller
                name="petCategories"
                control={control}
                rules={{ required: 'Please select at least one option' }}
                render={({ field: { ref, ...field } }) => (
                  <>
                    <CheckPicker
                      {...field}
                      className={`${errors.petCategories ? "border-error" : ""}`}
                      data={petCategories}
                      style={{ width: "100%" }} // Adjust the style as needed
                      onSelect={(value, item) => field.onChange(value)}
                      onClean={() => field.onChange([])}
                      placeholder="Select pet category"
                    />
                    {errors.petCategories && (
                      <small className="error-message">{errors.petCategories.message}</small>
                    )}
                  </>
                )}
              />
              {/* <Select
                multiple
                placeholder="Select pet category"
                {...register("petCategories")}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", gap: "0.25rem" }}>
                    {selected.map((selectedOption, index) => (
                      <Chip key={index} variant="soft" color="primary">
                        {selectedOption.label}
                      </Chip>
                    ))}
                  </Box>
                )}
                sx={{
                  minWidth: "320px",
                }}
                slotProps={{
                  listbox: {
                    sx: {
                      width: "100%",
                      // backgroundColor: 'red',
                    },
                  },
                }}
              >
                {petCategories.map((category, index) => (
                  <Option key={index} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select> */}
          </div>
          <div className="col-md-6 pb-4">
            <Label>Phone</Label>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Please enter your phone number.",
                maxLength: { value: 11, message: "Phone number must be 10 digits" },
                minLength: { value: 11, message: "Phone number must be 10 digits" }

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
                  masks={{ th: '.. ... ....', }}
                  inputClass={`${errors.phone ? "is-invalid" : ""} py-2`}
                  inputStyle={{ width: "100%" }}
                  specialLabel={""}
                  disableDropdown={true}
                  country={"th"}
                  countryCodeEditable={false}
                  placeholder="Enter phone number"
                />
              )}
            />
            {errors.phone && <small className="error-message">{errors.phone.message}</small>}
          </div>
          <div className="col-md-6 pb-4">
            <Label>Contact</Label>
            <input
              className={`form-control ${errors.contact ? "is-invalid" : ""} py-2`}
              placeholder="Write your contact here"
              {...register("contact", {
                required: "Please enter your contact.",
                maxLength: {
                  value: 200,
                  message: "Contact must not more than 200 characters",
                },
              })}
            />
            {errors.contact && (
              <small className="invalid-feedback">{errors.contact.message}</small>
            )}
          </div>
          <div className="col-md-12 pb-4">
            <Label>Detail (Optional) &nbsp;
              <Tooltip title="รายละเอียดของร้าน (เลือกกรอก)">
                <HelpOutlineIcon fontSize="inherit" />
              </Tooltip>
            </Label>
            <textarea
              id="detail"
              name="detail"
              className={`form-control ${errors.detail ? "is-invalid" : ""} py-2`}
              rows="4"
              placeholder="Enter store detail"
              {...register("detail", {
                maxLength: {
                  value: 200,
                  message: "Detail must not more than 200 characters",
                },
              })}
            />
            {errors.detail && (
              <small className="invalid-feedback">{errors.detail.message}</small>
            )}
          </div>
          <div className="col-md-12 pb-4">
            <Map idName="map" getLocation={setLocation} getLocationLabel={setAddressLabel} />
          </div>
          <div className="row">
            <div className="col-md-12 pb-4">
              <Label>Address</Label>
              <input
                className={`form-control py-2`}
                placeholder="Street address"
                value={addressLabel}
                onChange={(event) => setAddressLabel(event.target.value)}
                required
              />
            </div>
            <div className="col-md-6 pb-4">
              <Label>Subdistrict</Label>
              <div className="autocomplete">
                <InputAddress
                  id="auto-1"
                  placeholder="กรุณาเลือกตำบล"
                  address="subdistrict"
                  value={subdistrict}
                  onChange={(e) => setSubdistrict(e.target.value)}
                  onSelect={onSelect}
                />
              </div>
            </div>
            <div className="col-md-6 pb-4">
              <Label>District</Label>
              <div className="autocomplete ">
                <InputAddress
                  id="auto-2"
                  placeholder="กรุณาเลือกอำเภอ"
                  address="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  onSelect={onSelect}
                />
              </div>
            </div>
            <div className="col-md-6 pb-4">
              <Label>Province</Label>
              <div className="autocomplete">
                <InputAddress
                  id="auto-3"
                  placeholder="กรุณาเลือกจังหวัด"
                  address="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  onSelect={onSelect}
                />
              </div>
            </div>
            <div className="col-md-6 pb-4">
              <Label>Postal Code</Label>
              <div className="autocomplete">
                <InputAddress
                  id="auto-4"
                  placeholder="กรุณาเลือกรหัสไปรษณีย์"
                  address="zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  onSelect={onSelect}
                />
              </div>
            </div>
          </div>

          <div className="blue-btn mt-3">
            <ButtonSuite
              type="submit"
              appearance="primary" block
            >
              {loading ? <span>loading...</span> : <span>Submit</span>}
            </ButtonSuite>
          </div>
        </div>
      </div>
    </form>
  );
}

const Label = styled(({ children, className }) => {
  return <label className="mb-2">{children}</label>;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

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
