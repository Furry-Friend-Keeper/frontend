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

const TakeCareDetail = ({ requests }) => {
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const { userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, control, handleSubmit } = useForm();
    const [radioChange, setRadioChange] = useState("Pending");
    const [loading, setLoading] = useState(false);
    const [statusRequests, setStatusRequests] = useState([]);

    const SaveOwnerComment = async (data) => {
        await axios
            .post(import.meta.env.VITE_OWNER_REVIEWS, data, {
                headers: { Authorization: "Bearer " + accessToken },
            })
            .then(() => {
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const OwnerCompleted = async (value) => {
        await axios.patch(
            import.meta.env.VITE_APPOINTMENT_OWNER_COMPLETED_ID + value.id,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };

    const OwnerCancelled = async (value) => {
        await axios.patch(
            import.meta.env.VITE_APPOINTMENT_CANCEL_ID + value.id,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
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

    useEffect(() => {
        const filter = requests.filter((item) => item.status === radioChange);
        setStatusRequests(filter);
    }, [requests, radioChange]);

    const buttonStatus = (data) => {
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
            <RadioGroup
                name="radio-group-inline-picker"
                inline
                appearance="picker"
                value={radioChange}
                onChange={(value) => setRadioChange(value)}
                className="mb-3"
            >
                <Radio value="Pending">In Progress</Radio>
                <Radio value="Completed">Completed</Radio>
            </RadioGroup>
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
                                        {/* Button Status */}
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
                                                                        maxLength:
                                                                            {
                                                                                value: 200,
                                                                                message:
                                                                                    "Message must not more than 200 characters",
                                                                            },
                                                                    }
                                                                )}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </Modal.Body>

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
