import { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import {
    Modal,
    Button,
    Placeholder,
    Rate,
    ButtonGroup,
    Form,
    Radio,
    RadioGroup,
} from "rsuite";
import moment from "moment";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TakeCareDetail = ({ requests, fetchRequests }) => {
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const { userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    let arrReview = []

    const checkReviews = async (review) => {
        try {
            const apiUrl = `${import.meta.env.VITE_OWNER_REVIEW_ID}${userInfo.id}?keeperId=${review.keeperId}`;
            await axios.get(apiUrl, { headers: { Authorization: "Bearer " + accessToken }}).then((response) => {
                const data = response.data;
                if(data){
                    setValue("star", data.stars);
                    setValue("comment", data.comment);
                    // setReviews([...reviews, review.keeperId]);
                    arrReview.push(review.keeperId)
                }
            });         
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const filter = requests.filter((item) => item.status === "Completed") || [];

        if (filter.length > 0) {
            for (let review of filter) {
                checkReviews(review);
            }
        }
    }, [requests]);

    const goToStore = () => {
        navigate("/at3/keeper/" + requests.keeperId);
    };

    const SaveOwnerComment = async (data) => {
        await axios
            .post(import.meta.env.VITE_OWNER_REVIEWS, data, {
                headers: { Authorization: "Bearer " + accessToken },
            })
            .then(() => {
                console.log("success");
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const OwnerCompleted = async (value) => {
        await axios
            .patch(
                import.meta.env.VITE_APPOINTMENT_OWNER_COMPLETED_ID + value.id,
                "",
                {
                    headers: { Authorization: "Bearer " + accessToken },
                }
            )
            .then(() => {
                fetchRequests();
            });
    };

    const OwnerCancelled = async (value) => {
        await axios
            .patch(import.meta.env.VITE_APPOINTMENT_CANCEL_ID + value.id, "", {
                headers: { Authorization: "Bearer " + accessToken },
            })
            .then(() => {
                fetchRequests();
            });
    };

    const EditOwnerComment = async (data) => {
        await axios
            .patch(
                import.meta.env.VITE_OWNER_REVIEWS_EDIT + data.reviewId,
                data,
                {
                    headers: { Authorization: "Bearer " + accessToken },
                }
            )
            .then(() => {
                // console.log(reviewsData)
                // console.log({...reviewsData, ...data})
                data.date = moment(data.date).unix();
                setReviewsData({ ...reviewsData, ...data });
                setIsEditComment(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const onEditSubmit = (data) => {
        const result = {
            reviewId: parseInt(data.reviewId),
            comment: data.comment,
            star: data.rating,
            date: moment().format(),
        };
        EditOwnerComment(result);
    };

    const onSubmit = (data) => {
        const result = {
            comment: data.comment,
            petownerId: userInfo.id,
            petkeeperId: parseInt(data.keeperId, 10),
            star: data.star,
            date: moment().format(),
        };
        SaveOwnerComment(result);
        console.log(data);
    };

    const buttonStatus = (data) => {
        console.log(arrReview)
        if (data.status === "Pending") {
            return (
                <ButtonGroup className="w-100">
                    <Button
                        onClick={() => OwnerCancelled(data)}
                        className="col-12 col-md-6"
                        appearance="primary"
                        color="red"
                    >
                        {" "}
                        Cancel{" "}
                    </Button>
                    <Button appearance="default" className="col-12 col-md-6">
                        {" "}
                        Pending{" "}
                    </Button>
                </ButtonGroup>
            );
        } else if (data.status === "Scheduled") {
            return (
                <Button appearance="ghost" color="yellow">
                    {" "}
                    Scheduled{" "}
                </Button>
            );
        } else if (data.status === "In Care") {
            return (
                <Button appearance="ghost" color="blue">
                    {" "}
                    Pet is Caring{" "}
                </Button>
            );
        } else if (data.status === "Keeper Completed") {
            return (
                <Button
                    onClick={() => OwnerCompleted(data)}
                    appearance="primary"
                    color="blue"
                    type="submit"
                >
                    {" "}
                    Already get a pet{" "}
                </Button>
            );
        } else if (data.status === "Cancelled") {
            return (
                <Button appearance="primary" color="red">
                    {" "}
                    Cancelled{" "}
                </Button>
            );
        } else if (data.status === "Completed" && arrReview.includes(data.keeperId)) {
            return (
                <ButtonGroup className="w-100">
                    <Button
                        appearance="primary"
                        color="green"
                        className="col-12 col-md-6"
                        onClick={handleOpen}
                    >
                        {" "}
                        Edit Review{" "}
                    </Button>
                    <Button appearance="primary" className="col-12 col-md-6" onClick={goToStore}>
                        {" "}
                        Go to Store{" "}
                    </Button>
                </ButtonGroup>
            );
        } else if (data.status === "Completed") {
            return (
                <Button appearance="primary" color="green" onClick={handleOpen}>
                    {" "}
                    Review{" "}
                </Button>
            );
        }
    };
    return (
        <>
            {/* <RadioGroup
                name="radio-group-inline-picker"
                inline
                appearance="picker"
                value={radioChange}
                onChange={(value) => setRadioChange(value)}
                className="mb-3"
            >
                <Radio value="Pending">In Progress</Radio>
                <Radio value="Completed">Completed</Radio>
            </RadioGroup> */}
            {requests.map((item, index) => {
                return (
                    <div key={index} className="mb-3">
                        <Box
                            sx={{
                                width: "100%",
                                position: "relative",
                                overflow: { xs: "auto", sm: "initial" },
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    display: "block",
                                    width: "1px",
                                    left: "500px",
                                    top: "-24px",
                                    bottom: "-24px",
                                }}
                            />
                            <Card
                                orientation="horizontal"
                                sx={{
                                    width: "100%",
                                    flexWrap: "wrap",
                                    [`& > *`]: {
                                        "--stack-point": "500px",
                                        minWidth:
                                            "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                                    },
                                    overflow: "auto",
                                    resize: "horizontal",
                                }}
                            >
                                <AspectRatio
                                    flex
                                    ratio="1"
                                    maxHeight={182}
                                    sx={{ minWidth: 182 }}
                                >
                                    <img
                                        src={
                                            item.keeperImg
                                                ? import.meta.env
                                                      .VITE_KEEPER_IMAGE +
                                                  item.keeperId +
                                                  "/" +
                                                  item.keeperImg
                                                : null
                                        }
                                        loading="lazy"
                                    />
                                </AspectRatio>
                                <CardContent>
                                    <Typography fontSize="xl" fontWeight="lg">
                                        {item.petKeeper}
                                    </Typography>
                                    <Typography
                                        level="body-sm"
                                        fontWeight="lg"
                                        textColor="text.tertiary"
                                    >
                                        Category : {item.category}
                                    </Typography>
                                    <Sheet
                                        sx={{
                                            bgcolor: "background.level1",
                                            borderRadius: "sm",
                                            p: 1.5,
                                            my: 1.5,
                                            display: "flex",
                                            gap: 2,
                                            "& > div": { flex: 1 },
                                        }}
                                    >
                                        <div>
                                            <Typography
                                                level="body-xs"
                                                fontWeight="lg"
                                            >
                                                Phone
                                            </Typography>
                                            <Typography fontWeight="lg">
                                                {item.keeperPhone}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                level="body-xs"
                                                fontWeight="lg"
                                            >
                                                Start Date
                                            </Typography>
                                            <Typography fontWeight="lg">
                                                {moment
                                                    .unix(item.startDate)
                                                    .format(
                                                        "DD/MM/YYYY, HH:mm:ss"
                                                    )}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                level="body-xs"
                                                fontWeight="lg"
                                            >
                                                End Date
                                            </Typography>
                                            <Typography fontWeight="lg">
                                                {moment
                                                    .unix(item.endDate)
                                                    .format(
                                                        "DD/MM/YYYY, HH:mm:ss"
                                                    )}
                                            </Typography>
                                        </div>
                                    </Sheet>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1.5,
                                            "& > button": { flex: 1 },
                                        }}
                                    >
                                        {buttonStatus(item)}
                                        <Modal
                                            className="position-absolute top-50 start-50 translate-middle mt-0"
                                            backdrop={backdrop}
                                            keyboard={false}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <Form
                                                onSubmit={handleSubmit(
                                                    onSubmit
                                                )}
                                            >
                                                <Modal.Header>
                                                    <Modal.Title>
                                                        Review
                                                    </Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>
                                                    {/* <Placeholder.Paragraph /> */}
                                                    <input
                                                        type="hidden"
                                                        {...register(
                                                            "keeperId"
                                                        )}
                                                        defaultValue={
                                                            item?.keeperId
                                                        }
                                                    />
                                                    <div className="modal-body">
                                                        <div className="mb-3">
                                                            <Controller
                                                                name="star"
                                                                control={
                                                                    control
                                                                }
                                                                rules={{
                                                                    required:
                                                                        "Please enter star",
                                                                }}
                                                                render={({
                                                                    field: {
                                                                        onChange,
                                                                        value,
                                                                    },
                                                                }) => (
                                                                    <Rate
                                                                        value={
                                                                            value
                                                                        }
                                                                        onChange={(
                                                                            newValue
                                                                        ) =>
                                                                            onChange(
                                                                                newValue
                                                                            )
                                                                        }
                                                                        size="md"
                                                                        color="yellow"
                                                                    />
                                                                )}
                                                            />
                                                            <br />
                                                            {errors.star && (
                                                                <small className="error-message">
                                                                    {
                                                                        errors
                                                                            .star
                                                                            .message
                                                                    }
                                                                </small>
                                                            )}
                                                        </div>
                                                        <div className="mb-3">
                                                            <textarea
                                                                className="form-control"
                                                                id="comment"
                                                                name="comment"
                                                                rows={5}
                                                                maxLength={200}
                                                                {...register(
                                                                    "comment",
                                                                    {
                                                                        // required: "Please enter message before OK",
                                                                        maxLength:
                                                                            {
                                                                                value: 200,
                                                                                message:
                                                                                    "Message must not more than 200 characters",
                                                                            },
                                                                    }
                                                                )}
                                                            ></textarea>
                                                            {/* {errors.comment && <small className="error-message">{errors.comment.message}</small>} */}
                                                        </div>
                                                    </div>
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button
                                                        // onClick={handleClose}
                                                        type="submit"
                                                        appearance="primary"
                                                    >
                                                        Ok
                                                    </Button>
                                                    <Button
                                                        onClick={handleClose}
                                                        appearance="subtle"
                                                        className="ms-2"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                        </Modal>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </div>
                );
            })}
        </>
    );
};

export default TakeCareDetail;
