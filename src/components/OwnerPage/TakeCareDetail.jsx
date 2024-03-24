import { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
// import { Button as ButtonMui } from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Modal, Button, Placeholder, DateRangePicker } from "rsuite";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Rate } from "rsuite";
// import { useSelector, useDispatch } from 'react-redux'

const TakeCareDetail = () => {
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [hoverValue, setHoverValue] = useState();
    // const getStatus = useSelector();
    return (
        <>
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
                            Keeper Name
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
                                <Typography level="body-xs" fontWeight="lg">
                                    Phone
                                </Typography>
                                <Typography fontWeight="lg">
                                    082xxxxxxxx
                                </Typography>
                            </div>
                            {/* <div>
              <Typography level="body-xs" fontWeight="lg">
                Followers
              </Typography>
              <Typography fontWeight="lg">980</Typography>
            </div> */}
                            <div>
                                <Typography level="body-xs" fontWeight="lg">
                                    Rating
                                </Typography>
                                <Typography fontWeight="lg">3.2</Typography>
                            </div>
                            <div>
                                <Typography level="body-xs" fontWeight="lg">
                                    Start Date
                                </Typography>
                                <Typography fontWeight="lg">
                                    2024-06-15
                                </Typography>
                            </div>
                            <div>
                                <Typography level="body-xs" fontWeight="lg">
                                    End Date
                                </Typography>
                                <Typography fontWeight="lg">
                                    2024-07-03
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
                            {/* {
              getStatus === 'Cancelled' ?  ""
              :
              <Button appearance="ghost" color="red">
                Cancel
              </Button>
            } */}
                            <Button appearance="ghost" color="red">
                                Cancel
                            </Button>

                            {/* {getStatus === "Pending" && <Button appearance="default"> Pending </Button>}
            {getStatus === "Cancelled" && <Button appearance="primary" color="red"> Cancelled </Button>}
            {getStatus === "Scheduled" && <Button appearance="ghost" color="blue"> Pet is Caring </Button>}
            {getStatus === "Keeper Completed" && <Button appearance=" primary"color="blue"> Already get a pet </Button>}
            {getStatus === "Completed" && <Button appearance="primary" color="green"> Reviews </Button>} */}
                            <Button
                                appearance="primary"
                                color="green"
                                onClick={handleOpen}
                            >
                                {" "}
                                Review{" "}
                            </Button>
                            <Modal
                                className="position-absolute top-50 start-50 translate-middle mt-0"
                                backdrop={backdrop}
                                keyboard={false}
                                open={open}
                                onClose={handleClose}
                            >
                                <Modal.Header>
                                    <Modal.Title>Review</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    {/* <Placeholder.Paragraph /> */}
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <Rate
                                                // defaultValue={3}
                                                onChangeActive={setHoverValue}
                                                // allowHalf
                                                size="lg"
                                                color="yellow"
                                            />
                                            {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/> */}
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                name="message"
                                                rows={5}
                                                maxLength={200}
                                                // value={formData.message}
                                                // onChange={handleChange}
                                                //   {...register("message", { maxLength: {
                                                //     value: 200,
                                                //     message: "Message must not more than 200 characters"
                                                // }})}
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
                            </Modal>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default TakeCareDetail;
