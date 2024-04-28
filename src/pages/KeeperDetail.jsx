import { useState, useRef, useEffect, useMemo } from "react";
import axiosAuth from "../components/Global/AxiosService";
import axios from "axios";
import { useNavigate, Navigate ,useParams } from "react-router-dom";
import { Button, Chip, Stack, Card, CardMedia, Container  } from "@mui/material"
import { useForm, Controller } from "react-hook-form";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import MapContainer from "../components/KeeperPage/MapContainer";
import GallerySider from "../components/KeeperPage/GallerySider";
import { useSelector } from "react-redux";
import Overviews from "../components/Global/Overviews";
import ScheduleModal from "../components/KeeperPage/ScheduleModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function KeeperDetail() {
    const customWidth = import.meta.env.VITE_CUSTOM_WIDTH
    const [apiData, setApiData] = useState({});
    const [galleryData, setGalleryData] = useState([]);
    const [isEditComment, setIsEditComment] = useState(false);
    const [isReview, setIsReview] = useState([]);
    const { id } = useParams();
    const { loading, userInfo, error, success, accessToken } = useSelector((state) => state.auth)  
    const navigate = useNavigate()
    const [ isOwnerReview, setIsOwnerReview ] = useState(null);
    const [isMap, setMap] = useState([]);
    const [favoriteData, setFavoriteData] = useState([])
    const cacheMap = useMemo(() => isMap,[isMap])
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

    const fetchOwner = async () => {
        try {
          if(userInfo.role === "Owner") {
            const apiUrl = import.meta.env.VITE_OWNER_ID + userInfo.id;
            await axiosAuth
              .get(apiUrl)
              .then((response) => {
                const data = response.data;
                const favorites = data.favorites.map(item => item.petKeeperId)
                setFavoriteData(favorites)
              });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    

    useEffect(() => {
        fetchData();
        fetchOwner()
    }, [id]);

    const handleFavorite = async (value) => {
        try {
          if(userInfo.role === "Owner" && accessToken) {
              const data = {
                "petOwnerId" : userInfo.id,
                "petKeeperId": value.id
              }
              const apiUrl = import.meta.env.VITE_OWNER_FAVORITE_ID + userInfo.id;
              await axiosAuth.put(apiUrl, data)
                  .then(() => {
                      console.log("success")
                      if(favoriteData.includes(value.id)) {
                        setFavoriteData(favoriteData.filter(item => item !== value.id))
                      }else {
                        setFavoriteData([...favoriteData, value.id])
                      }
                  });
            } else {
                navigate("/at3/login")
            }
            } catch (error) {
            console.error("Error fetching data:", error);
            }
      };

    return (
        <>
            <GallerySider id={id} galleryData={galleryData}/>
            <Container maxWidth={customWidth}>
            {/* <div className="container pb-lg-5"> */}
                <div className="row mx-auto col-10 movedown-transition">
                    <div className="col-lg-8">
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                            <div className="d-flex">
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
                                <div className="favorite-icon">
                                {favoriteData && favoriteData?.includes(apiData.id) ? (
                                    <FavoriteIcon onClick={() => handleFavorite(apiData)} className="favorite-icon" />
                                ) : (
                                    <FavoriteBorderIcon onClick={() => handleFavorite(apiData)} className="favorite-icon" />
                                )}
                                </div>
                            </div>
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
                                        <h3 className="mb-lg-4 mt-lg-3">
                                            {apiData.name}
                                        </h3>
                                        {/* <span className="fs-3">
                                        <i className="bi bi-star"></i>
                                    </span> */}
                                    </div>

                                    <div className="des">
                                        <h5>Description</h5>
                                        <p className="text-break">{apiData.detail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                            <div className="title">
                                <h4>Contact</h4>
                            </div>
                            <div className="table table-keeper">
                                <table className="w-100">
                                    <tbody>
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg col-12">
                        <div className="bg-shadow mt-4">
                            {cacheMap.length > 0 && 
                                <MapContainer isMap={cacheMap}/>
                            }
                            <div className="keeper-address p-md-2 bg-white">
                                <div className="table table-keeper">
                                    <table className="w-100">
                                        <tbody>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                            <ScheduleModal 
                                keeperId={id} 
                                closedDays={apiData.closedDay} 
                                availableStore={apiData.available}
                                disableDate={apiData.disableAppointment}
                                categoryData={apiData.categories}
                            />
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
