import { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
// import { Button as ButtonMui } from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Modal, Button, Placeholder, Rate, ButtonGroup, Form } from "rsuite";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
// import { useSelector, useDispatch } from 'react-redux'

const TakeCareDetail = ({ requests }) => {
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(requests);

       const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const SaveOwnerComment = async (data) => {
        await axios
            .post(import.meta.env.VITE_OWNER_REVIEWS, data, {
                headers: { Authorization: "Bearer " + accessToken },
            })
            .then(() => {
                console.log("success")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = (data) => {
        const result = {
            comment: data.comment,
            petownerId: userInfo.id,
            petkeeperId: parseInt(id, 10),
            star: data.star,
            date: moment().format(),
        };
        SaveOwnerComment(result);
        console.log(data);
    };

    const buttonStatus = (data) => {
        if (data.status === "Pending") {
            return (
                <ButtonGroup className="w-100">
                    <Button
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
                <Button appearance="primary" color="blue">
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
        } else {
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
            {requests.map((item, index) => {
                return (
                    <div key={index}>
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
                                    // make the card resizable for demo
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
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
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
                                        Categories
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
                                                082xxxxxxxx
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                level="body-xs"
                                                fontWeight="lg"
                                            >
                                                Rating
                                            </Typography>
                                            <Typography fontWeight="lg">
                                                3.2
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
                                        {/* Button Status */}
                                        {buttonStatus(item)}
                                        <Modal
                                            className="position-absolute top-50 start-50 translate-middle mt-0"
                                            backdrop={backdrop}
                                            keyboard={false}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <Modal.Header>
                                                <Modal.Title>
                                                    Review
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Form onSubmit={handleSubmit(SaveOwnerComment)}>
                                            <Modal.Body>
                                                {/* <Placeholder.Paragraph /> */}
                                                <div className="modal-body">
                                                    <div className="mb-3">
                                                        <Rate
                                                            size="lg"
                                                            color="yellow"
                                                            {...register("star")}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <textarea
                                                            className="form-control"
                                                            id="comment"
                                                            name="comment"
                                                            rows={5}
                                                            maxLength={200}
                                                              {...register("comment", { maxLength: {
                                                                value: 200,
                                                                message: "Message must not more than 200 characters"
                                                            }})}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            </Form>
                                            <Modal.Footer>
                                                <Button
                                                    onClick={handleClose}
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
