import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
    Modal,
    Button,
    Uploader,
    Message,
    Loader,
    useToaster,
    Form,
} from "rsuite";
import axiosAuth from "../Global/AxiosService";
import Avatar from "@mui/material/Avatar";
import PhoneInput from "react-phone-input-2";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { changeImageProfile } from "/src/store/AuthSlice";

const SizedAvatar = styled(Avatar)`
  ${({ size, theme }) => `
    width: ${theme.spacing(size)}rem; 
    height: ${theme.spacing(size)}rem; 
`};
`;

const Field = ({ as: Component = Input, field, error, ...rest }) => {
    return (
      <Form.Group>
        <Component
          id={field.name}
          value={field.value}
          onChange={value => field.onChange(value)}
          {...rest}
        />
        <Form.ErrorMessage show={!!error} placement="bottomStart">
          {error}
        </Form.ErrorMessage>
      </Form.Group>
    );
  };

function UserProfile(props) {
    const { ownerId, ownerData } = props;
    const [ownerDataList, setOwnerDataList] = useState({})
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState("true");
    const handleModal = (bool) => {
        setOpen(bool)
        setValue("upload", [
            {
                url : import.meta.env.VITE_OWNER_IMAGE + ownerDataList.petOwnerId + "/" + ownerDataList?.img
            }
        ])
    };
    const toaster = useToaster();
    const placement = "topEnd";
    const duration = 3000;

    const message = (type, error) => {
        return (
        <Message
          showIcon
          type={type}
          header={type === "error" ? "Failed!" : "Success!"}
          closable
        >
          <small className="text-black">{error}</small>
        </Message>
        )
    }

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setOwnerDataList(ownerData)

        if(Object.keys(ownerData).length !== 0) {
            const dataPhone = ownerData?.phone.replace(/^0/, "66").trim()
            setValue("firstName",ownerData?.firstName)
            setValue("lastName", ownerData?.lastName);
            setValue("petName", ownerData?.petName)
            setValue("phone", dataPhone)
            setValue("email", ownerData?.email)
            setValue("upload", [
                {
                    url : import.meta.env.VITE_OWNER_IMAGE + ownerData.petOwnerId + "/" + ownerData?.img
                }
            ])
        }
    },[ownerData]);

    const EditOwner = async (data, isError) => {
        const phoneNumber = (data.phone).replace(/^66/, "0").trim()
        const result = {
            firstName: data.firstName,
            lastName: data.lastName,
            petName: data.petName,
            phone: phoneNumber,
            email: data.email,
        };
        console.log(result);
        if (!isError) {
            await axiosAuth
                .patch(import.meta.env.VITE_OWNER_ID + ownerId, result)
                .then((res) => {
                    handleModal(false)
                })
                .catch((err) => {
                });
        }
    };

    const EditOwnerProfileImg = async (data) => {
        let isError = false;
        const file = data.upload[0]?.blobFile || undefined
        console.log(data.upload[0])
        if(file !== undefined) {
            const formData = new FormData();
            formData.append("file", file)
            await axiosAuth.patch(import.meta.env.VITE_OWNER_ID + ownerId + "/profile-img", formData, {
                headers: { 'content-type': 'multipart/form-data' }
            }).then((res) => {
                handleModal(false)
                dispatch(changeImageProfile(data.upload[0].name))
                // console.log({...ownerDataList, img : file.name})
                setOwnerDataList({...ownerDataList, img : file.name})
                // setTimeout(() => navigate(0), 500)
                toaster.push(message("success", res.data), { placement, duration });
                isError = false
            }).catch((error) => {
                console.log(error)
                if (error.response?.status === 413 || error.message === "Network Error") {
                    toaster.push(message("error", "The file you are trying to upload is too large."), { placement, duration });
                } else {
                    toaster.push(message("error", error.message), { placement, duration });
                  }
                // setIsError(true)
                // setOpen(true)
                // setAlertStatus('error')
                isError = true
            })
        }

        EditOwner(data, isError)
    };

    const onSubmit = (data) => {
        console.log(data)
        EditOwnerProfileImg(data);
    };


    return (
        <>
            <div className="col-md-4 ps-0">
                <div className="bg-shadow rounded p-4 p-sm-3 p-lg-4 p-md-4 bg-white mt-4">
                    <div className="profile-info-container">
                        <div className="profile-info-title">
                            <div className="row profile-info-image">
                                <SizedAvatar
                                    size="8"
                                    alt="Remy Sharp"
                                    src={ownerDataList.img ? import.meta.env.VITE_OWNER_IMAGE + ownerId + "/" + ownerDataList.img : null}
                                />
                            </div>
                            <div className="profile-info-title-detail">
                                <h5 className="text-break">
                                    {ownerDataList.firstName} {ownerDataList.lastName}
                                </h5>
                                <div className="blue-btn">
                                    <Button
                                        onClick={() => handleModal(true)}
                                        color="blue"
                                        appearance="primary"
                                    >
                                        Edit Profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="profile-infomation">
                            <h5>Information</h5>
                            <div className="profile-infomation-detail">
                                <table>
                                    <tbody>
                                        <tr className="profile-warpper">
                                            <td>
                                                <p>Email</p>
                                            </td>
                                            <td>
                                                <p className="info">
                                                    {ownerDataList.email}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr className="profile-warpper">
                                            <td>
                                                <p>Phone</p>
                                            </td>
                                            <td>
                                                <p className="info">
                                                    {ownerDataList.phone}
                                                </p>
                                            </td>
                                        </tr>
                                        {/* <tr className="profile-warpper">
                                            <td>
                                                <p>Password</p>
                                            </td>
                                            <td className="info">
                                                <Button
                                                    color="blue"
                                                    appearance="ghost"
                                                >
                                                    Change Password
                                                </Button>
                                            </td>
                                        </tr> */}
                                        <tr className="profile-warpper">
                                            <td>
                                                <p>Pet Name</p>
                                            </td>
                                            <td>
                                                <p className="info">
                                                    {ownerDataList.petName}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
              </div>

            <Modal
                className="position-absolute top-50 start-50 translate-middle mt-0"
                backdrop={backdrop}
                keyboard={false}
                open={open}
                size="sm"
                onClose={() => handleModal(false)}
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* <Placeholder.Paragraph /> */}
                        <div className="modal-body">
                            <div className="mb-3">
                                <div className="upload-file-input">
                                    <Controller
                                        name="upload"
                                        control={control}
                                        rules={{ required: "Please upload your profile image"}}
                                        render={({ field, fieldState }) => (
                                        <Field as={Uploader} field={field} error={errors[field.name]?.message}
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            listType="picture"
                                            multiple={false}
                                            autoUpload={false}
                                            disabled={field.value?.length > 0}
                                            accept="image/png, image/jpeg, image/jpg"
                                            defaultFileList={field.value}
                                        />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="firstName"
                                    className="form-label"
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                    id="firstName"
                                    name="firstName"
                                    {...register("firstName", {
                                        required:
                                            "First name is required",
                                        maxLength: {
                                            value: 200,
                                            message:
                                                "First name must not more than 200 characters",
                                        },
                                    })}
                                />
                                {errors.firstName && <small className="error-message">{errors.firstName.message}</small>}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                    id="lastName"
                                    name="lastName"
                                    {...register("lastName", {
                                        required:
                                            "Last name is required",
                                        maxLength: {
                                            value: 200,
                                            message:
                                                "Last name must not more than 200 characters",
                                        },
                                    })}
                                />
                                {errors.lastName && <small className="error-message">{errors.lastName.message}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <Controller
                                    control={control}
                                    name="phone"
                                    rules={{ required: "Please enter your phone number.",
                                            maxLength: { value:11, message: "Phone number must be 10 digits"},
                                            minLength : { value:11, message: "Phone number must be 10 digits"}

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
                                            disableDropdown={true}
                                            country={"th"}
                                            countryCodeEditable={false}
                                            placeholder="Enter phone number"
                                        />
                                    )}
                                    />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="petName" className="form-label">
                                    Pet name
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.petName ? "is-invalid" : ""}`}
                                    id="petName"
                                    name="petName"
                                    {...register("petName", {
                                        maxLength: {
                                            value: 200,
                                            message:
                                                "Petname must not more than 200 characters",
                                        },
                                    })}
                                />
                                {errors.petName && <small className="error-message">{errors.petName.message}</small>}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button appearance="primary" type="submit">
                            Ok
                        </Button>
                        <Button onClick={() => handleModal(false)} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default UserProfile;
