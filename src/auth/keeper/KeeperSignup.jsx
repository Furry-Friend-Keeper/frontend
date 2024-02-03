// import * as React from "react";
import React, { useRef, useState, useEffect } from "react";
import { useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
// import clsx from "clsx";
import { useForm } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Chip } from "@mui/joy";
import InputAddress from "react-thailand-address-autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function BasicFormControl() {
  const [Subdistrict, setSubdistrict] = useState("");
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
    PetKeeperCategories();
  }, []);

  const PetKeeperCategories = async () => {
    await axios
      .get(import.meta.env.VITE_KEEPER_CATEGORIES)
      .then((res) => {
        const response = res.data;
        setPetCategories(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignUpForm = async (data) => {
    watch()
    const result = {
      name: data.keeperName,
      detail: data.detail,
      contact: data.contact,
      phone: data.phone,
      categoryId: data.petCategories,
      email: data.email,
      password: data.password,
      role: 3,
      address: data.address,
    };
    await axios
      .post(import.meta.env.VITE_KEEPER_SIGNUP, result)
      .then((res) => {
        setOpen(true);
        setAlertStatus("success");
        setTimeout(() => {
          navigate("/at3/login");
        }, 3000);
      })
      .catch((err) => {
        setOpen(true);
        setAlertStatus("error");
        console.log(err.message);
      });
  };

  const onSubmit = (data) => {
    // console.log('Selected petCategories:', JSON.parse(data.petCategories));
    const address = {
      address: data.address,
      district: district,
      province: province,
      postalCode: zipcode,
      map: "https://maps.example.com/12345",
    };
    data.address = address;
    if (data.petCategories !== "") {
      data.petCategories = JSON.parse(data.petCategories);
    }
    console.log(data);

    SignUpForm(data);
  };
  watch('phone')

  const password = useRef({});
  // password.current = watch("password", "");

  function onSelect(fulladdress) {
    const { Subdistrict ,district, province, zipcode } = fulladdress;
    setSubdistrict(Subdistrict);
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
    <form className="border-top border-2" onSubmit={handleSubmit(onSubmit)}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertStatus === "success" ? "success" : "error"}
          elevation={6}
        >
          {alertStatus === "success" ? (
            <div>
              <AlertTitle>Success</AlertTitle>
              Singup Successful!!!
            </div>
          ) : (
            <div>
              <AlertTitle>Failed</AlertTitle>
              Signup Failed!! Email must be unique.
            </div>
          )}
        </Alert>
      </Snackbar>
      <div className="container mt-4">
        <div className="">
          <h5 className="mb-5">Please complete all information below:</h5>
          <div className="col-md-6 pb-4">
            <Label>
              Keeper Name
              <Tooltip title="Name of store">
                <span> (?)</span>
              </Tooltip>
            </Label>
            <input
              className={`form-control ${errors.keeperName ? "is-invalid" : ""} py-2`}
              placeholder="Pet Farm"
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
              placeholder="Example@mail.com"
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
            <input
              className={`form-control ${errors.password ? "is-invalid" : ""} py-2`}
              placeholder="12345678"
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
          </div>
          <div className="col-md-6 pb-4">
            <Label>Confirm Password</Label>
            <input
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              } py-2`}
              placeholder="12345678"
              {...register("confirmPassword", {
                required: "Please enter your confirm password.",
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <small className="invalid-feedback">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>
          <div className="col-md-6 pb-4">
            <Label>Pet Category</Label>
              <Select
                multiple
                placeholder="select pet category"
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
              </Select>
          </div>
          <div className="col-md-6 pb-4">
            <Label>Phone</Label>
            <PhoneInput
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
            />
            {errors.phone && (
              <small className="">{errors.phone.message}</small>
            )}
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
            <Label>Detail (Optional)</Label>
              {/* <Textarea
                minRows={4}
                className="bg-white"
                placeholder="Write your Detail here"
                {...register("detail", { maxLength: 1000 })}
              /> */}

                <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="4"
                    placeholder="Enter your message"
                    {...register("detail", { maxLength: 1000 })}
                    />
          </div>
          <div className="row">
            <div className="col-md-12 pb-4">
                <Label>Address</Label>
                <input
                className={`form-control ${errors.address ? "is-invalid" : ""} py-2`}
                placeholder="Street Address"
                {...register("address", {
                    required: "Please enter your address.",
                    maxLength: {
                    value: 200,
                    message: "Name must not more than 200 characters",
                    },
                })}
                />
                {errors.address && (
                <small className="invalid-feedback">{errors.address.message}</small>
                )}
            </div>
            <div className="col-md-6 pb-4">
                <Label>Subdistrict</Label>
                <div className="autocomplete">
                <InputAddress
                    id="auto-1"
                    placeholder="กรุณาเลือกตำบล"
                    address="subdistrict"
                    value={Subdistrict}
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

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" size="large" variant="contained" sx={{ mt: 3, ml: 1 }}>
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
