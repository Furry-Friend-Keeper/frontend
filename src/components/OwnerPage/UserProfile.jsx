import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { useForm, Controller } from "react-hook-form";

const SizedAvatar = styled(Avatar)`
  ${({ size, theme }) => `
    width: ${theme.spacing(size)}rem; 
    height: ${theme.spacing(size)}rem; 
`};
`;

function UserProfile(props) {
    const { ownerId, ownerData } = props;
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    // const [ownerData, setOwnerData] = useState([]);
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState("true");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const toaster = useToaster();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    const [messageLog, setMessageLog] = useState("");
    const [alertStatus, setAlertStatus] = useState("");
    const [isImg, setImg] = useState();

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if(Object.keys(ownerData).length !== 0) {
            const dataPhone = ownerData?.phone.replace(/^0/, "66").trim()
            setValue("firstName",ownerData?.firstName)
            setValue("lastName", ownerData?.lastName);
            setValue("petName", ownerData?.petName)
            setValue("phone", dataPhone)
            setValue("email", ownerData?.email)
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
            await axios
                .patch(import.meta.env.VITE_OWNER_ID + ownerId, result, {
                    headers: { Authorization: "Bearer " + accessToken },
                })
                .then((res) => {
                })
                .catch((err) => {
                });
        }
    };

    const EditOwnerProfileImg = async (data) => {
        let isError = false;
        if(isImg !== undefined) {
            const formData = new FormData();
            formData.append("file", isImg)
            await axios.patch(import.meta.env.VITE_OWNER_ID + ownerId + "/profile-img", formData, {
                headers: { 'content-type': 'multipart/form-data', 'Authorization' : 'Bearer ' + accessToken}
            }).then((res) => {
                fetchData()
                // setOpen(true)
                // setAlertStatus('success')
                // setIsError(false)
                isError = false
            }).catch((error) => {
                if (error.response?.status === 413) {
                    // Handle Payload Too Large error specifically
                    setMessageLog("The file you are trying to upload is too large.");
                }else if(error.message === "Network Error") {
                    setMessageLog("The file you are trying to upload is too large.") 
                }else {
                    setMessageLog(error.message)
                }
                // setIsError(true)
                // setOpen(true)
                // setAlertStatus('error')
                isError = true
            })
        }

        console.log("test")
        EditOwner(data, isError)
    };

    const onSubmit = (data) => {
        console.log(data)
        EditOwnerProfileImg(data);
    };

    const previewFile = (file, callback) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            {/* <Snackbar
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
                            <AlertTitle>
                                <b>Success</b>
                            </AlertTitle>
                            Your data has been successfully save.
                        </div>
                    ) : (
                        <div>
                            <AlertTitle>
                                <b>Failed</b>
                            </AlertTitle>
                            {messageLog}
                        </div>
                    )}
                </Alert>
            </Snackbar> */}
            <div className="col-md-4 ps-0">
                <div className="bg-shadow rounded p-4 p-sm-3 p-lg-4 p-md-4 bg-white mt-4">
                    <div className="profile-info-container">
                        <div className="profile-info-title">
                            <div className="row profile-info-image">
                                <SizedAvatar
                                    size="8"
                                    alt="Remy Sharp"
                                    src={ownerData.img ? import.meta.env.VITE_OWNER_IMAGE + ownerId + "/" + ownerData.img : null}
                                />
                            </div>
                            <div className="profile-info-title-detail">
                                <h5>
                                    {ownerData.firstName} {ownerData.lastName}
                                </h5>
                                <div className="blue-btn">
                                    <Button
                                        onClick={handleOpen}
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
                                                    {ownerData.email}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr className="profile-warpper">
                                            <td>
                                                <p>Phone</p>
                                            </td>
                                            <td>
                                                <p className="info">
                                                    {ownerData.phone}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr className="profile-warpper">
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
                                        </tr>
                                        <tr className="profile-warpper">
                                            <td>
                                                <p>Pet Name</p>
                                            </td>
                                            <td>
                                                <p className="info">
                                                    {ownerData.petName}
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
                onClose={handleClose}
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* <Placeholder.Paragraph /> */}
                        <div className="modal-body">
                            <div className="mb-3">
                                <Uploader
                                    fileListVisible={false}
                                    listType="picture"
                                    // action="//jsonplaceholder.typicode.com/posts/"
                                    onUpload={(file) => {
                                        setUploading(true);
                                        previewFile(file.blobFile, (value) => {
                                            setFileInfo(value);
                                        });
                                    }}
                                    onSuccess={(response, file) => {
                                        setUploading(false);
                                        toaster.push(
                                            <Message type="success">
                                                Uploaded successfully
                                            </Message>
                                        );
                                        console.log(response);
                                    }}
                                    onError={() => {
                                        setFileInfo(null);
                                        setUploading(false);
                                        toaster.push(
                                            <Message type="error">
                                                Upload failed
                                            </Message>
                                        );
                                    }}
                                >
                                    <button style={{ width: 150, height: 150 }}>
                                        {uploading && (
                                            <Loader backdrop center />
                                        )}
                                        {fileInfo ? (
                                            <img
                                                src={fileInfo}
                                                width="100%"
                                                height="100%"
                                            />
                                        ) : (
                                            <AvatarIcon
                                                style={{ fontSize: 80 }}
                                            />
                                        )}
                                    </button>
                                </Uploader>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="firstName"
                                    className="form-label"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    {...register("firstName", {
                                        required:
                                            "Firstname is required",
                                        maxLength: {
                                            value: 200,
                                            message:
                                                "Firstname must not more than 200 characters",
                                        },
                                    })}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    {...register("lastName", {
                                        required:
                                            "Lastname is required",
                                        maxLength: {
                                            value: 200,
                                            message:
                                                "Lastname must not more than 200 characters",
                                        },
                                    })}
                                />
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
                                    Pet Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
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
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button appearance="primary" type="submit">
                            Ok
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default UserProfile;
