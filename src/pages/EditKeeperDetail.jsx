import { useState, useRef, useEffect } from "react";
import axiosAuth from "../components/Global/AxiosService";
import axios from "axios";
import { Container, TextField, Button, styled, IconButton, Rating, Select, Chip, Stack, Card, CardMedia, Box, Snackbar, Alert, AlertTitle, OutlinedInput, MenuItem, FormControl, InputLabel,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { Button as ButtonSuite } from "rsuite";
import { useForm } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import MapEditer from "../components/EditKeeperPage/MapEditer";
import GalleryEditer from "../components/EditKeeperPage/GalleryEditer";
import moment from "moment";
import ScheduleRequest from "../components/EditKeeperPage/ScheduleRequest";
import Overviews from "../components/Global/Overviews";
import DisableDate from "../components/EditKeeperPage/DisableDate";

function EditKeeperDetail() {
    const customWidth = import.meta.env.VITE_CUSTOM_WIDTH;
    const [apiData, setApiData] = useState({});
    const [petCategories, setPetCategories] = useState([]);
    const [defaultCategories, setDefaultCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [alertStatus, setAlertStatus] = useState("");
    const [messageLog, setMessageLog] = useState("");
    const [open, setOpen] = useState(false);
    const [galleryData, setGalleryData] = useState([]);
    const [isEditName, setIsEditName] = useState(false);
    const [isEditContact, setIsEditContact] = useState(false);
    const [isEditAddress, setIsEditAddress] = useState(false);
    const [isMap, setIsMap] = useState([]);
    const [getLocation, setLocation] = useState("");
    const [addressLabel, setAddressLabel] = useState("");
    const [isImg, setImg] = useState();
    const { keeperId } = useParams();
    const [permanentDisable, setPersistentDisable] = useState("");
    // const [isError, setIsError] = useState(false);
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const [isReview, setIsReview] = useState([]);

    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_KEEPERS_ID + keeperId;
            await axiosAuth
                .get(apiUrl)
                .then((response) => {
                    const data = response.data;
                    setApiData(data);
                    console.log(data)
                    setValue("name", data.name);
                    setValue("detail", data.detail);
                    setValue("contact", data.contact);
                    setValue("email", data.email);
                    setValue("phone", data.phone);
                    setValue("district", data.address.district);
                    setValue("province", data.address.province);
                    setValue("postalCode", data.address.postalCode);
                    setValue("petcategories", data.categories);
                    setDefaultCategories(data.categories);
                    const otherReview = data.reviews.filter(
                        (review) => review.petownerId !== userInfo.id
                    );
                    const splitMap = data.address.map.split(",").map((coord) => parseFloat(coord));
                    setIsMap(splitMap);
                    setAddressLabel(data.address.address);
                    setLocation(data.address.map);
                    setIsReview(otherReview);
                    const transformedGallery = data.gallery.map((item) => {
                        const splitItem = item.split(",");
                        return splitItem.length === 2 ? splitItem[1] : item;
                    });

                    setGalleryData(transformedGallery);
                });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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

    useEffect(() => {
        fetchData();
        PetKeeperCategories();
    }, []);

    useEffect(() => {
        let arr = [];
        for (const category of petCategories) {
            if (defaultCategories.includes(category.name)) {
                arr.push(category.id);
            }
        }
        // console.log(arr);
        setCategoryId(arr);
    }, [petCategories, defaultCategories])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const EditKeeper = async (data, isError) => {
        const result = {
            name: data.name,
            detail: data.detail,
            contact: data.contact,
            phone: data.phone,
            categories: categoryId,
            address: {
                address: addressLabel,
                district: data.district,
                province: data.province,
                postalCode: data.postalCode,
                map: getLocation,
            },
        };
        console.log(result);
        if (!isError) {
            await axiosAuth
                .patch(import.meta.env.VITE_KEEPERS_ID + keeperId, result)
                .then((res) => {
                    fetchData();
                    setApiData({ ...apiData, ...result });
                    setIsEditName(false);
                    setIsEditContact(false);
                    setIsEditAddress(false);
                    setOpen(true);
                    setAlertStatus("success");
                    const splitMap = getLocation
                        .split(",")
                        .map((coord) => parseFloat(coord));
                    setIsMap(splitMap);
                })
                .catch((err) => {
                    console.log(err);
                    setOpen(true);
                    setMessageLog(err.message);
                    setAlertStatus("error");
                });
        }
    };

    const EditProfileImg = async (data) => {
        let isError = false;
        if (isImg !== undefined) {
            const formData = new FormData();
            formData.append("file", isImg);
            await axiosAuth
                .patch(
                    import.meta.env.VITE_KEEPERS_ID + keeperId + "/profile-img",
                    formData,
                    {
                        headers: {
                            "content-type": "multipart/form-data"
                        },
                    }
                )
                .then((res) => {
                    fetchData();
                    setOpen(true);
                    setAlertStatus("success");
                    // setIsError(false)
                    isError = false;
                })
                .catch((error) => {
                    if (error.response?.status === 413) {
                        // Handle Payload Too Large error specifically
                        setMessageLog("The file you are trying to upload is too large.");
                    } else if (error.message === "Network Error") {
                        setMessageLog("The file you are trying to upload is too large.");
                    } else {
                        setMessageLog(error.message);
                    }
                    // setIsError(true)
                    setOpen(true);
                    isError = true;
                    setAlertStatus("error");
                });
        }

        EditKeeper(data, isError);
    };

    const onSubmit = (data) => {
        EditProfileImg(data);
        // EditKeeper(data);
    };

    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (validImageTypes.includes(file.type)) {
                setOpen(false);
                console.log(file);
                setImg(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Handling the case when the file is not a JPG, PNG, or JPEG image.
                setOpen(true);
                setMessageLog("Please select a JPG, PNG, or JPEG image file.");
            }
        } else {
            // Optionally, handle the case when the file is not an image.
            // For example, alert the user or clear the preview.
            setOpen(true);
            setMessageLog("Please select an image file.");
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDefaultCategories(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <>
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
            </Snackbar>
            <GalleryEditer
                galleryData={galleryData}
                keeperId={keeperId}
                fetchData={fetchData}
            />
            <Container maxWidth={customWidth}>
                <div className="row mx-auto col-10">
                    <div className="col-lg-12">
                        <ScheduleRequest keeperId={keeperId} />
                    </div>
                    <div className="col-lg-12">
                        <DisableDate apiData={apiData} fetchData={fetchData} />
                    </div>
                    <div className="row mx-auto col-12 px-0">
                        <div className="col-lg-6">
                            <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <FormControl sx={{ mb: 5, width: "100%" }}>
                                                <InputLabel id="demo-multiple-chip-label">
                                                    Category
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    label="Category"
                                                    multiple
                                                    required
                                                    value={defaultCategories}
                                                    onChange={handleChange}
                                                    input={
                                                        <OutlinedInput
                                                            id="select-multiple-chip"
                                                            label="Category"
                                                        />
                                                    }
                                                    renderValue={(selected) => (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexWrap: "wrap",
                                                                gap: 0.5,
                                                            }}
                                                        >
                                                            {selected.map((value) => (
                                                                <Chip
                                                                    key={value}
                                                                    label={value}
                                                                    className="keeper-tag"
                                                                />
                                                            ))}
                                                        </Box>
                                                    )}
                                                >
                                                    {petCategories.map((category, index) => (
                                                        <MenuItem key={index} value={category.name}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 col-lg-12">
                                            {!apiData.img ? (
                                                <div>
                                                    {previewImage ? (
                                                        <CardMedia
                                                            className="profile"
                                                            component="img"
                                                            alt="profile"
                                                            height="auto"
                                                            src={previewImage}
                                                        />
                                                    ) : (
                                                        <ImageNotSupportedIcon className="edit-notImage" />
                                                    )}
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
                                            ) : (
                                                <div className="">
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
                                                                src={
                                                                    apiData.img
                                                                        ? import.meta.env.VITE_KEEPER_IMAGE +
                                                                        keeperId +
                                                                        "/" +
                                                                        apiData.img
                                                                        : null
                                                                }
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
                                            )}
                                        </div>
                                        <div className="col">
                                            <div className="title d-flex justify-content-between align-items-center">
                                                    <TextField
                                                        label="Edit Keeper Name"
                                                        margin="normal"
                                                        fullWidth
                                                        required
                                                        defaultValue="Edit Keeper Name"
                                                        {...register("name", {
                                                            required: "Name is required",
                                                            maxLength: {
                                                                value: 200,
                                                                message:
                                                                    "Name must not more than 200 characters",
                                                            },
                                                        })}
                                                    />
                                                {errors.name && (
                                                    <p className="error-message">{errors.name.message}</p>
                                                )}
                                            </div>
                                            <div className="des">
                                                <TextField 
                                                    label="Description"
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    defaultValue="Type in here…"
                                                    placeholder="Type in here…"
                                                    {...register("detail")}
                                                />
                                            </div>
                                                <div className="blue-btn mt-4">
                                                    <ButtonSuite type="submit" appearance="primary" block>
                                                    Submit
                                                    </ButtonSuite>
                                                </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h2>Contact</h2>
                                    <div className="table">
                                        <table className="w-100">
                                            <tr>
                                                <td>Name</td>
                                                    <td className="text-end">
                                                        <TextField
                                                            label="Edit Name"
                                                            margin="normal"
                                                            defaultValue="Please enter a name"
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
                                            </tr>
                                            <tr>
                                                <td>Email</td>

                                                <td className="text-end">{apiData.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td className="text-end">
                                                    <TextField
                                                        type="number"
                                                        label="Edit Phone"
                                                        margin="normal"
                                                        // fullWidth
                                                        defaultValue="089999999"
                                                        required
                                                        {...register("phone", {
                                                            required: "Phone is required",
                                                            maxLength: {
                                                                value: 10,
                                                                message: "Phone number must be 10 digits",
                                                            },
                                                            minLength: {
                                                                value: 10,
                                                                message: "Phone number must be 10 digits",
                                                            },
                                                        })}
                                                    />
                                                    {errors.phone && (
                                                        <p className="error-message">
                                                            {errors.phone.message}
                                                        </p>
                                                    )}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="blue-btn mt-4">
                                        <ButtonSuite type="submit" appearance="primary" block>
                                        Submit
                                        </ButtonSuite>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg col-12">
                        <div className="bg-shadow mt-4">
                            {isMap.length > 0 && (
                                <MapEditer
                                    // editMap={isEditAddress}
                                    isMap={isMap}
                                    getLocation={setLocation}
                                    getLocationLabel={setAddressLabel}
                                />
                            )}
                            <div className="p-3 p-sm-3 p-md-4 p-lg-5 bg-white">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="table">
                                        <table className="w-100">
                                            <tr>
                                                <td>Address</td>
                                                    <td className="text-end">
                                                        <TextField
                                                            label="Edit Address"
                                                            margin="normal"
                                                            required
                                                            value={addressLabel}
                                                            onChange={(event) =>
                                                                setAddressLabel(event.target.value)
                                                            }
                                                        />
                                                        {errors.address && (
                                                            <p className="error-message">
                                                                {errors.address.message}
                                                            </p>
                                                        )}
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td>District</td>
                                                    <td className="text-end">
                                                        <TextField
                                                            label="Edit District"
                                                            margin="normal"
                                                            {...register("district")}
                                                        />
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td>Province</td>
                                                <td className="text-end">
                                                    <TextField
                                                        label="Edit Province"
                                                        margin="normal"
                                                        {...register("province")}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>PostalCode</td>
                                                <td className="text-end">
                                                    <TextField
                                                        label="Edit Postal Code"
                                                        margin="normal"
                                                        {...register("postalCode")}
                                                    />
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="blue-btn mt-4">
                                        <ButtonSuite type="submit" appearance="primary" block>
                                        Submit
                                        </ButtonSuite>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Overviews
                        reviews={apiData}
                        isReview={isReview}
                        isOwnerReview={null}
                    />
                </div>
            </Container>
            {/* </div> */}
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
