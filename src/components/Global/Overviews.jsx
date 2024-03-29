import React, { useState, useEffect } from 'react'
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { Rate } from "rsuite";

function Overviews(props) {
    const {reviews, isOwnerReview, isReview } = props
    const [reviewsData, setReviewsData] = useState(isOwnerReview)

    useEffect(() => {
        setReviewsData(isOwnerReview)
        console.log("test")
    },[isOwnerReview])

    const {  userInfo, accessToken } = useSelector((state) => state.auth)  
    const [isEditComment, setIsEditComment] = useState(false);
    const [hoverValue, setHoverValue] = useState(3);

    const EditOwnerComment = async (data) => {
        await axios
        .patch(import.meta.env.VITE_OWNER_REVIEWS_EDIT + data.reviewId, data, {
            headers: { 'Authorization': 'Bearer ' + accessToken}
        })
        .then(() => {
            // console.log(reviewsData)
            // console.log({...reviewsData, ...data})
            data.date = moment(data.date).unix();
            setReviewsData({...reviewsData, ...data})
            setIsEditComment(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    const onEditSubmit = (data) => {
        const result = {
            reviewId: parseInt(data.reviewId),
            comment: data.comment,
            star: data.rating,
            date: moment().format()
        };
        EditOwnerComment(result)
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
  return (
            <div className="mt-4">
            <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-1">
                <div className="title">
                    <h2>Overviews</h2>
                </div>
                <div className="rating">
                    <span className="fs-3 rating-score me-2">
                        {reviews.reviewStars}
                    </span>
                    <Rate value={reviews.reviewStars || 0} allowHalf size="md" color="yellow" readOnly/>
                    {/* <Rating
                        name="read-only"
                        value={reviews.reviewStars || 0}
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        readOnly
                    /> */}
                    <span className="ms-1">({reviews.reviews?.length})</span>
                </div>
                <div className="row justify-content-start mt-4">
                    { reviewsData !== null &&
                    <div className="mb-3">
                        <p>
                            My Review
                        </p>
                    <form onSubmit={handleSubmit(onEditSubmit)}>
                        <input type="hidden" {...register("reviewId")} defaultValue={reviewsData?.reviewId}/>
                        <div className="d-flex align-items-center mt-4">
                                <div className="col-md-3">
                                    <span className="ps-4">
                                        {
                                            reviewsData?.petownerFirstname
                                        }
                                    </span>
                                </div>
                                <div className="col-md-4">
                                {!isEditComment ? (
                                    <Rate value={isOwnerReview?.stars} allowHalf size="sm" color="yellow" readOnly/>
                                    // <Rating
                                    //     name="read-only"
                                    //     value={isOwnerReview?.stars}
                                    //     emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    //     readOnly
                                    // />
                                ) : (
                                    <div className="rating">
                                        <Controller
                                            name="rating"
                                            control={control}
                                            defaultValue={isOwnerReview?.stars}
                                            render={({ field: { onChange, value } }) => (
                                                <Rate
                                                  value={value}
                                                  onChange={(newValue) => onChange(newValue)}
                                                  size="sm"
                                                  color="yellow"
                                                />
                                              )}
                                        />
                                    </div>
                                )}
                                    <div>
                                        {moment.unix(reviewsData?.date).format("DD/MM/YYYY, HH:mm:ss")}
                                    </div>
                                </div>
                                <div className="col-md-4 text-break">
                                            {!isEditComment ? (
                                                <div>
                                                    <span>{reviewsData?.comment}</span>
                                                </div>
                                            ) : (
                                                <TextField
                                                    label="Edit Comment"
                                                    margin="normal"
                                                    defaultValue={isOwnerReview?.comment}
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
                                                            backgroundColor:
                                                                "red",
                                                            color: "white",
                                                        }}
                                                        onClick={() =>
                                                            setIsEditComment(
                                                                false
                                                            )
                                                        }
                                                        sx={{
                                                            ml: 1,
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        Save
                                                    </Button>
                                                </Box>
                                            )}
                                        </div>
                                        <div className="col-md-1">
                                            {userInfo.id === reviewsData?.petownerId &&
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
                                </form>
                    </div>
                    }
                    <div className="col">
                        <div className="row">
                            <div>
                                Other Reviews
                            </div>
                            {isReview && isReview.map((review, index) => (
                                <div className="d-flex align-items-center mt-4" key={index}>
                                        {/* <div className="col-md-1">
                                            <img
                                                src={
                                                    import.meta.env.VITE_KEEPER_IMAGE + review?.petownerImg
                                                }
                                            />
                                        </div> */}
                                        <div className="col-md-3">
                                            <span className="ps-4">
                                                {
                                                    review?.petownerFirstname
                                                }
                                            </span>
                                        </div>
                                        <div className="col-md-4">
                                            <Rate value={review?.stars} allowHalf size="sm" color="yellow" readOnly/>
                                            {/* <Rating
                                                name=""
                                                value={review?.stars}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                readOnly
                                            /> */}
                                            <div>
                                                {moment.unix(review?.date).format("DD/MM/YYYY, HH:mm:ss")}
                                            </div>
                                        </div>
                                        <div className="col-md-5 text-break">
                                                <span>{review?.comment}</span>
                                        </div>
                                
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Overviews