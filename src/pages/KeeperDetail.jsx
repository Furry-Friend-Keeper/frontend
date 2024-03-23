import { useState, useRef, useEffect } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useNavigate, Navigate ,useParams } from "react-router-dom";
import { Button, Chip, Stack, Card, CardMedia, Container  } from "@mui/material"
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@mui/joy";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import MapContainer from "../components/MapContainer";
import GallerySider from "../components/GallerySider";
import { useSelector } from "react-redux";
import Overviews from "../components/Overviews";
import ScheduleModal from "../components/ScheduleModal";

function KeeperDetail() {
    const [apiData, setApiData] = useState({});
    const [galleryData, setGalleryData] = useState([]);
    const [isEditComment, setIsEditComment] = useState(false);
    const [isReview, setIsReview] = useState([]);
    const { id } = useParams();
    const { loading, userInfo, error, success, accessToken } = useSelector((state) => state.auth)  
    const navigate = useNavigate()
    const [ isOwnerReview, setIsOwnerReview ] = useState(null);
    const [isMap, setMap] = useState([]);

    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_KEEPERS_ID + id;
            await axios.get(apiUrl).then((response) => {
                const data = response.data;
                setApiData(data);
                const splitMap = data.address.map.split(',').map(coord => parseFloat(coord));
                setMap(splitMap)
                // console.log(splitMap);
                const myReview = data.reviews.find((review) => review.petownerId === userInfo.id) || null
                // setValue('comment', myReview?.comment)
                // setValue('reviewId', myReview?.reviewId)
                const otherReview = data.reviews.filter((review) => review.petownerId !== userInfo.id)
                setIsReview(otherReview.sort((a,b) => b.date - a.date));
                setIsOwnerReview(myReview)
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

    useEffect(() => {
        fetchData();
    }, [id]);

    // const SaveOwnerComment = async (data) => {
    //     await axios
    //         .post(import.meta.env.VITE_OWNER_REVIEWS, data, {
    //             headers: { 'Authorization': 'Bearer ' + accessToken}
    //         })
    //         .then((res) => {
    //             const response = res.data;
    //             setApiData({ ...apiData, ...data });
    //             setIsEditComment(false);
    //             fetchData()
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
        
    // const onSubmit = (data) => {
    //     if(!accessToken){
    //         navigate("/at3/login")
    //     }
    //     const result = {
    //         comment: data.comment,
    //         petownerId: userInfo.id,
    //         petkeeperId: parseInt(id,10),
    //         star: data.stars,
    //         date: moment().format()
    //     };
    //     SaveOwnerComment(result);
    //     console.log(data);
    // };

    // const {
    //     register,
    //     handleSubmit,
    //     setValue,
    //     control,
    //     formState: { errors },
    // } = useForm();

    const [showPicker, setShowPicker] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);

    const handleOpen = () => {
        setShowPicker(true);
    };

    const handleClose = () => {
        setShowPicker(false);
    };

    const handleOk = () => {
        // send dateRange to backend here
        console.log(dateRange);
        handleClose();
    };

    return (
        <>
            <GallerySider id={id} galleryData={galleryData}/>
            <Container maxWidth="lg">
            {/* <div className="container pb-lg-5"> */}
                <div className="row mx-auto col-12 movedown-transition">
                    <div className="col-lg-8">
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                            <Stack direction="row" spacing={1} className="pb-4">
                                {apiData.categories &&
                                    apiData.categories.map(
                                        (category, index) => (
                                            <Chip
                                                className="keeper-tag"
                                                key={index}
                                                label={category}
                                            />
                                        )
                                    )}
                            </Stack>
                            <div className="row">
                                <div className="col-sm-4">
                                {!apiData.img ?
                                        <ImageNotSupportedIcon className="edit-notImage" /> :
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
                                            src={
                                                import.meta.env.VITE_KEEPER_IMAGE +
                                                apiData.id +
                                                "/" +
                                                apiData.img
                                            }
                                        />
                                    </Card>
                                }
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
                            {isMap.length > 0 && 
                                <MapContainer isMap={isMap}/>
                            }
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
                            <ScheduleModal keeperId={id} />
                    </div>
                    <Overviews 
                        reviews={apiData} 
                        isReview={isReview} 
                        isOwnerReview={isOwnerReview}
                    />
                    
                </div>
            {/* </div> */}
            </Container>
        </>
    );
}

export default KeeperDetail;
