import { useState, useRef, useEffect } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useNavigate, Navigate ,useParams } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { TextField, Button, styled, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Textarea } from "@mui/joy";

import moment from "moment";
import MapContainer from "../components/MapContainer";
import GallerySider from "../components/GallerySider";
import { useSelector } from "react-redux";

function KeeperDetail() {
    const [apiData, setApiData] = useState({});
    const [galleryData, setGalleryData] = useState([]);
    const [isEditComment, setIsEditComment] = useState(false);
    const [isReview, setIsReview] = useState([]);
    const { id } = useParams();
    const { loading, userInfo, error, success, accessToken } = useSelector((state) => state.auth)  
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_KEEPERS_ID + id;
                await axios.get(apiUrl).then((response) => {
                    const data = response.data;
                    setApiData(data);
                    setIsReview(data.reviews);
                    console.log(data.reviews);
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

        fetchData();
    }, [id]);

    const EditOwnerComment = async (data) => {
        const result = {
            comment: data.comment,
            petkeeperId: parseInt(id,10),
            petownerId: userInfo.id,
            stars: data.stars,
            date: moment().format()
        };
        await axios
            .post(import.meta.env.VITE_OWNER_REVIEWS, result)
            .then((res) => {
                const response = res.data;
                setApiData({ ...apiData, ...result });
                setIsEditComment(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const onSubmit = (data) => {
        if(!accessToken){
            navigate("/at3/login")
        }
        EditOwnerComment(data);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    return (
        <>
            {/* <div className="container pt-lg-4">
                <div className="carousel col-md-11">
                    <div className="slider-for">
                        {galleryData.length > 0 && 
                        <Slider
                            className="slider"
                            ref={(slider) => setSlider1(slider)}
                            {...slider_main}
                        >
                            {galleryData.map((gallery, index) => (
                                <img key={index} src={import.meta.env.VITE_KEEPER_IMAGE + id + "/gallery/" + gallery}/>
                            ))}
                        </Slider>}
                    </div>
                    <div className="slider-nav">
                        {galleryData.length > 0 && 
                        <Slider
                            className="slider"
                            ref={(slider) => setSlider2(slider)}
                            {...slider_nav}
                        >
                            {galleryData.map((gallery, index) => (
                                <img key={index} src={import.meta.env.VITE_KEEPER_IMAGE + id + "/gallery/" + gallery} />
                            ))}
                        </Slider>}
                    </div>
                </div>
            </div> */}
            <GallerySider id={id} galleryData={galleryData} />
            <div className="container pb-lg-5">
                <div className="row mx-auto col-11">
                    <div className="col-lg-8">
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                            <Stack direction="row" spacing={1} className="pb-4">
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
                            <div className="row">
                                <div className="col-sm-4">
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <CardMedia
                                            className="profile"
                                            component="img"
                                            alt="profile"
                                            height="140"
                                            img
                                            src={
                                                import.meta.env
                                                    .VITE_KEEPER_IMAGE +
                                                apiData.id +
                                                "/" +
                                                apiData.img
                                            }
                                        />
                                    </Card>
                                </div>
                                <div className="col">
                                    <div className="title d-flex justify-content-between align-items-center">
                                        <h2 className="mb-lg-4 mt-lg-3">
                                            {apiData.name}
                                        </h2>
                                        {/* <span className="fs-3">
                                        <i className="bi bi-star"></i>
                                    </span> */}
                                    </div>

                                    <div className="des">
                                        <h5>Description</h5>
                                        <p>{apiData.detail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                            <div className="title">
                                <h2>Contact</h2>
                            </div>
                            <div className="table">
                                <table className="w-100">
                                    <tr>
                                        <td>Name</td>
                                        <td className="text-end">
                                            {apiData.contact}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td className="text-end">
                                            {apiData.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td className="text-end">
                                            {apiData.phone}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg col-12">
                        <div className="bg-shadow mt-4">
                            <MapContainer />
                            <div className="keeper-address p-md-2 bg-white">
                                <div className="table">
                                    <table className="w-100">
                                        <tr>
                                            <td>Address 1</td>
                                            <td className="text-end">
                                                {apiData?.address?.address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>District</td>
                                            <td className="text-end">
                                                {apiData?.address?.district}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Province</td>
                                            <td className="text-end">
                                                {apiData?.address?.province}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>PostalCode</td>
                                            <td className="text-end">
                                                {apiData?.address?.postalCode}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="review-des mt-3">
                                        <Textarea
                                            cols="30"
                                            rows="5"
                                            placeholder="Message to reviews"
                                            {...register("comment", {
                                                maxLength: {
                                                    value: 200,
                                                    message:
                                                        "Comment must not more than 200 characters",
                                                },
                                            })}
                                        ></Textarea>
                                    </div>
                                    <div className="review-btn mt-3">
                                        <button type="submit" className="btn btn-success w-100">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-1">
                            <div className="title">
                                <h2>Reviews</h2>
                            </div>
                            <div className="row justify-content-start mt-4">
                                <div className="col">
                                    <div className="row">
                                        {isReview.map((review, index) => (
                                            <div className="d-flex align-items-center mt-4" key={index}>
                                                    <div className="col-md-1">
                                                        <Avatar
                                                            src={
                                                                review?.petownerImg
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <span className="ps-4">
                                                            {
                                                                review?.petownerFirstname
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <span className="ps-4">
                                                            {review?.date}
                                                        </span>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                                {!isEditComment ? (
                                                                    <div>
                                                                        <span>{review?.comment}</span>
                                                                    </div>
                                                                ) : (
                                                                    <TextField
                                                                        label="Edit Comment"
                                                                        margin="normal"
                                                                        fullWidth
                                                                        {...register("comment", {
                                                                            maxLength: {
                                                                                value: 200,
                                                                                message:
                                                                                    "Comment must not more than 200 characters",
                                                                            },
                                                                        })}
                                                                    />
                                                                )}
                                                                {errors.comment && (
                                                                    <p className="error-message">
                                                                        {errors.comment.message}
                                                                    </p>
                                                                )}
                                                                {isEditComment && (
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
                                                                                setIsEditComment(false)
                                                                            }
                                                                            sx={{ ml: 1 }}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                        <Button
                                                                            type="submit"
                                                                            variant="contained"
                                                                            sx={{ ml: 1 }}
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                    </Box>
                                                                )}
                                                        </form>
                                                    </div>
                                                    <div className="col-md-1">
                                                        {userInfo.id === review.petownerId &&
                                                            <span className="fs-3 flex">
                                                                <i
                                                                    className="bi bi-pencil-square fs-3 ju"
                                                                    onClick={() =>
                                                                        setIsEditComment(
                                                                            !isEditComment
                                                                        )
                                                                    }
                                                                ></i>
                                                            </span>
                                                        }
                                                    </div>
                                               
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default KeeperDetail;
