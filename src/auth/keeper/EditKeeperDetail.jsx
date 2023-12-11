import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import {
    GoogleMap,
    LoadScript,
    StandaloneSearchBox,
    MarkerF,
} from "@react-google-maps/api";
import Rating from "@mui/material/Rating";
import $ from "jquery";
import axios from "axios";
import { useParams } from "react-router-dom";
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

function KeeperDetail() {
    const [apiData, setApiData] = useState({});
    const [alertStatus, setAlertStatus] = useState("");
    const [messageLog, setMessageLog] = useState('')
    const [open, setOpen] = useState(false);
    const [galleryData, setGalleryData] = useState([]);
    const [galleryDelete, setGalleryDelete] = useState([]);
    const [isEditName, setIsEditName] = useState(false);
    const [isEditContact, setIsEditContact] = useState(false);
    const [isEditAddress, setIsEditAddress] = useState(false);
    const [isImg, setImg] = useState();
    const maxGallery = 8;

    // const [isEdit, setIsEdit] = useState(false);
    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_KEEPERS_ID + keeperId;
            await axios.get(apiUrl).then((response) => {
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
        
        await axios
            .patch(import.meta.env.VITE_KEEPERS_ID + keeperId, result)
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
    };

    
    const EditProfileImg = async () => {
        const formData = new FormData();
        formData.append("file", isImg)
        await axios.patch(import.meta.env.VITE_KEEPERS_ID + keeperId + "/profile-img", formData, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then((res) => {
            setOpen(true)
            setAlertStatus('success')
            fetchData()
        }).catch((err) => {
            console.log(err)
            setOpen(true)
            setMessageLog(err.message)
            setAlertStatus('error')
        })
    };

    const onSubmit = (data) => {
        EditKeeper(data);
        if(isImg !== undefined) {
            EditProfileImg();
        }
    };

    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImg(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const { keeperId } = useParams();

    const API_KEY = "AIzaSyD9JUPIBgFol7hDEGVGS6ASoubOOcGGtME";
    const [libraries] = useState(["places"]);

    const [galleryPreviews, setGalleryPreviews] = useState(Array(maxGallery).fill(''));
    const [imageGallery, setImageGallery] = useState([]);

    const handleGalleryChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const updatedPreviews = [...galleryPreviews];
            updatedPreviews[index] = e.target.result;
            setGalleryPreviews(updatedPreviews);
        };

        if (file) {
            reader.readAsDataURL(file);
            setImageGallery([...imageGallery,file])
        }
    };

    const removeImagePreview = (index) => {
        const updatedPreviews = [...galleryPreviews];
        updatedPreviews[index] = '';
        setGalleryPreviews(updatedPreviews);
    };

    const removeImageGallery = (data) => {
        console.log(galleryData)
        setGalleryData(galleryData.filter(image => image !== data))
        setGalleryDelete([...galleryDelete,data])
    }

    const GalleryImageKeeper = async () => {
        const formData = new FormData();
        console.log(galleryDelete)
        console.log(imageGallery)
        galleryDelete.forEach(image => {
            formData.append('delete', image)
        })
        imageGallery.forEach((preview) => {
            formData.append(`file`, preview);
        });
        if( galleryDelete.length === 0 ) {
            formData.append('delete', '')
        }
        if (imageGallery.length === 0) {
            const emptyFile = new Blob([], { type: 'application/octet-stream' });
            formData.append('file', emptyFile)
        }
        // galleryData.length === 0 ? formData.append('delete', '') : formData.append('file', null)
        await axios.patch(import.meta.env.VITE_KEEPERS_ID + keeperId + "/gallery", formData, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then((res) => {
            setOpen(true)
            setAlertStatus('success')
        }).catch((err) => {
            console.log(err)
            setOpen(true)
            setMessageLog(err.message)
            setAlertStatus('error')
        })
   
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
         <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}  anchorOrigin={{ vertical : 'top', horizontal : 'center' }} >
                <Alert onClose={handleClose} severity={alertStatus === 'success' ? 'success' : 'error'} elevation={6} >
                    {alertStatus === 'success' ?
                    <div>
                        <AlertTitle>Success</AlertTitle>
                        Successful!!!
                    </div>
                    :
                    <div>
                        <AlertTitle>Failed</AlertTitle>
                        {/* Signup Failed!! Email must be unique. */}
                        {messageLog}
                    </div>
                    }
                </Alert>
            </Snackbar>
            <div className="container pt-lg-4">
                <div className="carousel col-md-11">
                    <div className="m-4">
                        <div className="gallery-wrapper">
                        <div className="gallery">
                            {galleryData.map((gallery, index) => (
                                <div key={index} className="position-relative">
                                    <img
                                        src={import.meta.env.VITE_KEEPER_IMAGE + keeperId + "/gallery/" + gallery}
                                        alt={`Preview ${index}`}
                                        style={{ maxWidth: '100%', maxHeight: 'auto' }}
                                    />
                                    <IconButton
                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                        onClick={() => removeImageGallery(gallery)}
                                    >
                                        <CloseIcon className="close-gallery" />
                                    </IconButton>
                                </div>
                            ))}
                            {Array.from(Array(maxGallery-galleryData.length),(_, index) => (
                            <div key={index} className="gallery-list">
                                <Button component="label">
                                    {!galleryPreviews[index] && (
                                    <div>
                                        <AddPhotoAlternateIcon className="add-gallery" />
                                        <VisuallyHiddenInput type="file" onChange={(e) => handleGalleryChange(e, index)} />
                                    </div>
                                    )}
                                    {/* <AddPhotoAlternateIcon /> */}
                                </Button>

                                {galleryPreviews[index] && (
                                        <div className="position-relative">
                                            <img
                                                src={galleryPreviews[index]}
                                                alt={`Preview ${index}`}
                                                style={{ maxWidth: '100%', maxHeight: 'auto' }}
                                            />
                                             <IconButton
                                                style={{ position: 'absolute', top: 0, right: 0 }}
                                                onClick={() => removeImagePreview(index)}
                                            >
                                                <CloseIcon className="close-gallery" />
                                            </IconButton>
                                        </div>  ) }
                            </div>
                            ))}
                        </div>
                            {/* <h4 className="error-message text-center">Image  (0/9)</h4> */}
                            <div className="text-center">
                                <Button onClick={GalleryImageKeeper} className="rounded-5 py-3 px-4 fs-6" variant="contained" size="large" color="warning" startIcon={ <CollectionsIcon />}>
                                    Save Gallery
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pb-lg-5">
                <div className="row mx-auto col-11">
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
                                                src={import.meta.env.VITE_KEEPER_IMAGE + keeperId + "/" + apiData.img}
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
                                                    src={import.meta.env.VITE_KEEPER_IMAGE + keeperId + "/" + apiData.img}
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
                                                    required
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
                                        {/* <td className="text-end">
                                                <TextField
                                                    label="Edit Email"
                                                    margin="normal"
                                                    
                                                    // fullWidth
                                                    required
                                                    {...register("email", {
                                                        required:
                                                            "Email is required",
                                                        maxLength: 100,
                                                        pattern: {
                                                            value: /\S+@\S+\.\S+/,
                                                            message:
                                                                "Entered value does not match email format",
                                                        },
                                                    })}
                                                />
                                            </td> */}
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
                            <LoadScript
                                googleMapsApiKey={API_KEY}
                                libraries={libraries}
                            >
                                <GoogleMap
                                    // onLoad={onLoad}
                                    center={{ lat: -33.8688, lng: 151.2195 }}
                                    zoom={13}
                                    mapContainerStyle={{
                                        width: "100%",
                                        height: "200px",
                                    }}
                                ></GoogleMap>
                            </LoadScript>
                            <div className="p-md-2 bg-white">
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

export default KeeperDetail;
