// import * as React from "react";
import React, { useRef } from "react";
// import { useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
// import clsx from "clsx";
import { useForm } from "react-hook-form";
import Textarea from '@mui/joy/Textarea';
import Tooltip from '@mui/material/Tooltip';

export default function BasicFormControl() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {console.log(data)};
    console.log(watch("password"));

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
            <div className="row">
                <div className="col">
            <label>Keeper Name<Tooltip title="Name of store"><span> (?)</span></Tooltip></label>
            <StyledInput className="pb-3"
                placeholder="Write your Keeper Name here"
                {...register("keeperName", { required: true, maxLength: {
                    value: 200,
                    message: "Name must not more than 200 characters"
                  }})}
            />
            {errors.keeperName && <p className="error-message">{errors.keeperName.message}</p>}
            </div>
            <div className="col">
            <label>Contact</label>
            <StyledInput className="pb-3"
                placeholder="Write your Contact here"
                {...register("contact", { required: true, maxLength: {
                    value: 200,
                    message: "Contact must not more than 200 characters"
                  }})}
            />
            {errors.contact && <p className="error-message">{errors.contact.message}</p>}
            </div>
            </div>
            <label>Email</label>
            <StyledInput className="pb-3"
                placeholder="Example@mail.com"
                {...register("email", { required: true, maxLength: 100, pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  } })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
            <label>Password</label>
            <StyledInput className="pb-3"
                type="password"
                placeholder="Write your Password here"
                {...register("password", { required: true, minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters"
                  },maxLength: {
                    value: 20,
                    message: "Password must not more than 20 characters"
                  } })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            <label>Confirm Password</label>
            <StyledInput className="pb-3"
                type="password"
                placeholder="Please confirm your password"
                {...register("confirmPassword", { required: true, validate: value =>
                    value === password.current || "The passwords do not match" 
                 })}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            <label>Phone</label>
            <StyledInput className="pb-3"
                type="number"
                placeholder="Write your Phone here"
                {...register("phone", { required: true, maxLength: 10 })}
            />
            {errors.phone && <p className="error-message">This field is required</p>}
            <label>Detail</label>
            <div className="pb-3">
                <Textarea minRows={2} className="pb-3"
                    placeholder="Write your Detail here"
                    {...register("detail", { maxLength: 1000 })}
                />
            </div>
            <div className="grid justify-content-end">
                <button type="submit" className="btn fw-semibold btn-primary">
                    Submit
                </button>
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

// const label = styled(({ children, className }) => {
//     const formControlContext = useFormControlContext();
//     const [dirty, setDirty] = React.useState(false);

//     React.useEffect(() => {
//         if (formControlContext?.filled) {
//             setDirty(true);
//         }
//     }, [formControlContext]);

//     if (formControlContext === undefined) {
//         return <p>{children}</p>;
//     }

//     const { error, required, filled } = formControlContext;
//     const showRequiredError = dirty && required && !filled;

//     return (
//         <p
//             className={clsx(
//                 className,
//                 error || showRequiredError ? "invalid" : ""
//             )}
//         >
//             {children}
//             {required ? " *" : ""}
//         </p>
//     );
// })`
//     font-family: "IBM Plex Sans", sans-serif;
//     font-size: 0.875rem;
//     margin-bottom: 4px;

//     &.invalid {
//         color: red;
//     }
// `;

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
