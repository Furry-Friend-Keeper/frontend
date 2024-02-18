import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import Rating from "@mui/material/Rating";
import $ from "jquery";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { TextField, Button, styled, IconButton  } from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Textarea } from "@mui/joy";
import ImageIcon from '@mui/icons-material/Image';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import CollectionsIcon from '@mui/icons-material/Collections';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from "react-redux";
import { Navigate ,useParams } from "react-router-dom";
import MapEditer from "../components/MapEditer";
import GalleryEditer from "../components/GalleryEditer";

function EditKeeperDetail() {
    const [apiData, setApiData] = useState({});
    const [alertStatus, setAlertStatus] = useState("");
    const [messageLog, setMessageLog] = useState('')
    const [open, setOpen] = useState(false);
    const [galleryData, setGalleryData] = useState([]);
    const [isEditName, setIsEditName] = useState(false);
    const [isEditContact, setIsEditContact] = useState(false);
    const [isEditAddress, setIsEditAddress] = useState(false);
    const [isImg, setImg] = useState();
    const { keeperId } = useParams();
    const [isError, setIsError] = useState(false);
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
      )  
    // const [isEdit, setIsEdit] = useState(false);
    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_KEEPERS_ID + keeperId;
            await axios.get(apiUrl, {
                headers: { 'Authorization': 'Bearer ' + accessToken}
            }).then((response) => {
                const data = response.data;
                setApiData(data);
                setValue("name", data.name);
                setValue("detail", data.detail);
                setValue("contact", data.contact);
                setValue("email", data.email);
                setValue("phone", data.phone);
                setValue("address", data.address.address);
                setValue("district", data.address.district);
                setValue("province", data.address.province);
                setValue("postalCode", data.address.postalCode);

                const transformedGallery = data.gallery.map(item => {
                    const splitItem = item.split(',');
                    return splitItem.length === 2 ? splitItem[1] : item;
                  });
                  
                  setGalleryData(transformedGallery);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const EditKeeper = async (data) => {
        const result = {
            name: data.name,
            detail: data.detail,
            contact: data.contact,
            phone: data.phone,
            address: {
                address: data.address,
                district: data.district,
                province: data.province,
                postalCode: data.postalCode
            }
        };
        if(!isError){
            await axios
                .patch(import.meta.env.VITE_KEEPERS_ID + keeperId,  result, {
                    headers: { 'Authorization': 'Bearer ' + accessToken}
                })
                .then((res) => {
                    const response = res.data;
                    setApiData({ ...apiData, ...result });
                    setIsEditName(false);
                    setIsEditContact(false);
                    setIsEditAddress(false);
                    setOpen(true)
                    setAlertStatus('success')
                })
                .catch((err) => {
                    console.log(err);
                    setOpen(true)
                    setMessageLog(err.message)
                    setAlertStatus('error')
                });
        }
    };

    
    const EditProfileImg = async () => {
        const formData = new FormData();
        formData.append("file", isImg)
        await axios.patch(import.meta.env.VITE_KEEPERS_ID + keeperId + "/profile-img", formData, {
            headers: { 'content-type': 'multipart/form-data', 'Authorization' : 'Bearer ' + accessToken}
        }).then((res) => {
            setOpen(true)
            setAlertStatus('success')
            setIsError(false)
            fetchData()
        }).catch((error) => {
            error.message === "Network Error" ?  setMessageLog("This image is too large.") : setMessageLog(error.message)
            setIsError(true)
            setOpen(true)
            setAlertStatus('error')
        })
    };

    const onSubmit = (data) => {
        if(isImg !== undefined) {
            EditProfileImg()
        }
        EditKeeper(data);
    };

    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setOpen(false)
            setImg(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // Optionally, handle the case when the file is not an image.
            // For example, alert the user or clear the preview.
            setOpen(true)
            setMessageLog('Please select an image file.')
        }
    };

   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // if(getId !== keeperId) {
    //     return <Navigate to={`/at3/keeper-edit/${getId}`} />;
    // }

    return (
        <>
         <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}  anchorOrigin={{ vertical : 'top', horizontal : 'center' }} >
                <Alert onClose={handleClose} severity={alertStatus === 'success' ? 'success' : 'error'} elevation={6} >
                    {alertStatus === 'success' ?
                    <div>
                        <AlertTitle><b>Success</b></AlertTitle>
                        Your data has been successfully save.
                    </div>
                    :
                    <div>
                        <AlertTitle><b>Failed</b></AlertTitle>
                        {/* Signup Failed!! Email must be unique. */}
                        {messageLog}
                    </div>
                    }
                </Alert>
            </Snackbar>
            <GalleryEditer galleryData={galleryData} keeperId={keeperId} fetchData={fetchData} /> 
            <div className="container pb-lg-5">
                <div className="row mx-auto col-12">
                    <div className="col-lg-8">
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                            <div className="row">
                                <div className="col-md-8">
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        className="pb-4"
                                    >
                                        {apiData.categories &&
                                            apiData.categories.map(
                                                (category, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={category}
                                                    />
                                                )
                                            )}
                                    </Stack>
                                </div>
                                <div className="col-md-4 d-flex justify-content-end">
                                    <span className="fs-3">
                                        <i
                                            className="bi bi-pencil-square fs-3 ju"
                                            onClick={() =>
                                                setIsEditName(!isEditName)
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        {!isEditName ? 
                                        <Card sx={{
                                            maxWidth: 345,
                                            borderRadius: "15px",
                                        }}>
                                            <CardMedia
                                                className="profile"
                                                component="img"
                                                alt="profile"
                                                height="140"
                                                src={apiData.img ? import.meta.env.VITE_KEEPER_IMAGE + keeperId + "/" + apiData.img : null}
                                            />
                                        </Card>
                                        :
                                        <div>
                                            
                                        <Card
                                            sx={{
                                                maxWidth: 345,
                                                borderRadius: "15px",
                                            }}
                                        >
                                            {previewImage ? (
                                                <CardMedia
                                                    className="profile"
                                                    component="img"
                                                    alt="profile"
                                                    height="auto"
                                                    src={previewImage}
                                                />
                                            ) : (
                                                <CardMedia
                                                    className="profile"
                                                    component="img"
                                                    alt="profile"
                                                    height="140"
                                                    src={apiData.img ? import.meta.env.VITE_KEEPER_IMAGE + keeperId + "/" + apiData.img : null}
                                                />
                                            )}
                                        </Card>
                                        

                                        <Button
                                            className="w-100 mt-2 upload-image"
                                            component="label"
                                            variant="outlined"
                                            startIcon={<ImageIcon />}
                                        >
                                            Select Image
                                            <VisuallyHiddenInput
                                                onChange={handleFileChange}
                                                type="file"
                                            />
                                        </Button>
                                        </div>
                                        }
                                    </div>
                                    <div className="col">
                                        <div className="title d-flex justify-content-between align-items-center">
                                            {!isEditName ? (
                                                <h2 className="mb-lg-4 mt-lg-3">
                                                    {apiData.name}
                                                </h2>
                                            ) : (
                                                <TextField
                                                    label="Edit Keeper Name"
                                                    margin="normal"
                                                    fullWidth
                                                    required
                                                    {...register("name", {
                                                        required:
                                                            "Name is required",
                                                        maxLength: {
                                                            value: 200,
                                                            message:
                                                                "Name must not more than 200 characters",
                                                        },
                                                    })}
                                                />
                                            )}
                                            {errors.name && (
                                                <p className="error-message">
                                                    {errors.name.message}
                                                </p>
                                            )}

                                            {/* <span className="fs-3">
                                                <i
                                                    className="bi bi-pencil-square fs-3 ju"
                                                    onClick={() =>
                                                        setIsEditName(
                                                            !isEditName
                                                        )
                                                    }
                                                ></i>
                                            </span> */}
                                        </div>

                                        <div className="des">
                                            <h5>Description</h5>
                                            {!isEditName ? (
                                                <p>{apiData.detail}</p>
                                            ) : (
                                                <Textarea
                                                    minRows={3}
                                                    placeholder="Type in here…"
                                                    margin="normal"
                                                    
                                                    {...register("detail")}
                                                />
                                            )}
                                        </div>
                                        {isEditName && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: "red",
                                                        color: "white",
                                                    }}
                                                    onClick={() =>
                                                        setIsEditName(false)
                                                    }
                                                    
                                                    sx={{ mt: 3, ml: 1 }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{ mt: 3, ml: 1 }}
                                                    
                                                >
                                                    Submit
                                                </Button>
                                            </Box>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="title d-flex justify-content-between align-items-center">
                                <h2>Contact</h2>
                                <span className="fs-3">
                                    <i
                                        className="bi bi-pencil-square fs-3 ju"
                                        onClick={() =>
                                            setIsEditContact(!isEditContact)
                                        }
                                    ></i>
                                </span>
                            </div>

                            <div className="table">
                                <table className="w-100">
                                    <tr>
                                        <td>Name</td>
                                        {!isEditContact ? (
                                            <td className="text-end">
                                                {apiData.contact}
                                            </td>
                                        ) : (
                                            <td className="text-end">
                                                <TextField
                                                    label="Edit Name"
                                                    margin="normal"
                                                    // fullWidth
                                                    required
                                                    {...register("contact", {
                                                        maxLength: {
                                                            value: 200,
                                                            message:
                                                                "Contact must not more than 200 characters",
                                                        },
                                                    })}
                                                />
                                                {errors.contact && (
                                                <p className="error-message">
                                                    {errors.contact.message}
                                                </p>
                                            )}
                                            </td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td>Email</td>

                                        <td className="text-end">
                                            {apiData.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        {!isEditContact ? (
                                            <td className="text-end">
                                                {apiData.phone}
                                            </td>
                                        ) : (
                                            <td className="text-end">
                                                <TextField
                                                    label="Edit Phone"
                                                    margin="normal"
                                                    // fullWidth
                                                    required
                                                    {...register("phone", {
                                                        required:
                                                            "Phone is required",
                                                        maxLength: {
                                                            value: 10,
                                                            message:
                                                                "Phone number must not more than 10 characters",
                                                        },
                                                    })}
                                                />
                                                {errors.phone && (
                                                <p className="error-message">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                            </td>
                                        )}
                                    </tr>
                                </table>
                            </div>
                            {isEditContact && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                        }}
                                        onClick={() => setIsEditContact(false)}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            )}
                            </form>
                        </div>
                        
                    </div>
                    <div className="col-lg col-12">
                        <div className="bg-shadow mt-4">
                            <MapEditer editMap={isEditAddress} />
                            <div className="p-2 bg-white">
                            <div className="title d-flex justify-content-end align-items-center">
                                <span className="fs-3">
                                    <i
                                        className="bi bi-pencil-square fs-3 ju"
                                        onClick={() =>
                                            setIsEditAddress(!isEditAddress)
                                        }
                                    ></i>
                                </span>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="table">
                                    <table className="w-100">
                                        <tr>
                                            <td>Address</td>
                                            {!isEditAddress ? (
                                            <td className="text-end">
                                                {apiData?.address?.address}
                                            </td>
                                             ) : (
                                            <td className="text-end">
                                            <TextField
                                                    label="Edit Address"
                                                    margin="normal"
                                                    required
                                                    {...register("address", {
                                                        maxLength: {
                                                            value: 200,
                                                            message:
                                                                "Address must not more than 200 characters",
                                                        },
                                                    })}
                                                />
                                                {errors.address && (
                                                <p className="error-message">
                                                    {errors.address.message}
                                                </p>
                                            )}
                                            </td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td>District</td>
                                            {!isEditAddress ? (
                                            <td className="text-end">
                                                {apiData?.address?.district}
                                            </td>
                                            ) : (
                                            <td className="text-end">
                                            <TextField
                                                    label="Edit "
                                                    margin="normal"
                                                    {...register("district")}
                                                />
                                            </td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td>Province</td>
                                            {!isEditAddress ? (
                                            <td className="text-end">
                                                {apiData?.address?.province}
                                            </td>
                                            ) : (
                                            <td className="text-end">
                                            <TextField
                                                    label="Edit Province"
                                                    margin="normal"
                                                    {...register("province")}
                                                />
                                            </td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td>PostalCode</td>
                                            {!isEditAddress ? (
                                            <td className="text-end">
                                                {apiData.address?.postalCode}
                                            </td>
                                            ) : (
                                            <td className="text-end">
                                            <TextField
                                                    label="Edit Postal Code"
                                                    margin="normal"
                                                    {...register("postalCode")}
                                                />
                                            </td>
                                            )}
                                        </tr>
                                    </table>
                                    
                                </div>
                                {isEditAddress && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: "red",
                                                        color: "white",
                                                    }}
                                                    onClick={() =>
                                                        setIsEditAddress(false)
                                                    }
                                                    sx={{ mt: 3, ml: 1 }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{ mt: 3, ml: 1 }}
                                                >
                                                    Submit
                                                </Button>
                                            </Box>
                                        )}
                                </form>
                            </div>
                        </div>
                        <div className="bg-shadow p-2 p-sm-3 p-md-3 bg-white mt-4">
                            <div className="title">
                                <h4>Reviews</h4>
                            </div>
                            <div className="des">
                                <div className="rating">
                                    <span className="fs-3 rating-score me-2">
                                        {apiData.reviewStars}
                                    </span>
                                    <Rating
                                        name="half-rating-read"
                                        value={apiData.reviewStars || 0}
                                        precision={0.5}
                                        readOnly
                                    />
                                    {/* <span className="">10 review</span> */}
                                </div>
                                {/* <div className="review-des mt-3">
                                    <textarea
                                        className="form-control"
                                        cols="30"
                                        rows="5"
                                        placeholder="Message to reviews"
                                    ></textarea>
                                </div>
                                <div className="review-btn mt-3">
                                    <button className="btn btn-success w-100">
                                        Save
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default EditKeeperDetail;