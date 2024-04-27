import { useState, useEffect } from "react";
import { Rating, Stack, Chip } from "@mui/material/";
import { Rate, Tag, TagGroup } from "rsuite";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import axiosAuth from "../Global/AxiosService";
import axios from "axios";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Slider from "react-slick";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const Favorite = (props) => {
    const { favorites } = props
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const { ownerId } = useParams();
    const navigate = useNavigate()
    const [favvoriteData, setFavoriteData] = useState([])

    useEffect(() => {
        setFavoriteData(favorites)
    },[favorites])

    const linkToKeeper = (item) => {
        navigate(`/at3/keepers/${item.id}`)
    }

    const handleFavorite = async (value) => {
        try {
          if(userInfo.role === "Owner") {
              const data = {
                "petOwnerId" : userInfo.id,
                "petKeeperId": value.id
              }
              const apiUrl = import.meta.env.VITE_OWNER_FAVORITE_ID + userInfo.id;
              await axiosAuth.put(apiUrl, data)
                  .then(() => {
                    console.log(favorites)
                    const filter = favvoriteData.filter(item => item.id !== value.id)
                    console.log(filter)
                    setFavoriteData(filter)
                });
            }
            } catch (error) {
            console.error("Error fetching data:", error);
            }
      };

      const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        variableWidth: true,
        slidesToShow: 2,
        slidesToScroll: 2
      };


    return (
        <>
            <div className="col-md-8 pe-0">
                <div className="bg-shadow rounded p-sm-3 p-lg-4 p-md-4 bg-white mt-4">
                    <div className="profile-favorite">
                        <h4>My Favorite Keeper</h4>
                        <div className="profile-favorite-list-all">
                            {favvoriteData.length === 0 && <div className='d-flex justify-content-center align-items-center h-100 fs-4 fw-bold'>DON'T HAVE FAVORITE KEEPER</div>}
                            {favvoriteData.map((favorite) => (
                                <div key={favorite.id} className="movedown-transition">
                                    <div className="profile-favorite-list">
                                        <div className="profile-favorite-imge" onClick={() => linkToKeeper(favorite)}>
                                        {favorite.img ? (
                                            <img
                                                src={
                                                    import.meta.env.VITE_KEEPER_IMAGE +
                                                    favorite.id +
                                                    "/" +
                                                    favorite.img
                                                }
                                                alt={favorite.title}
                                            />
                                        ) : (
                                            <div className="notimage-width">
                                                <ImageNotSupportedIcon className="notImage" />
                                            </div>
                                        )
                                    }
                                            <div className="profile-favorite-rating">
                                                <StarRoundedIcon /> 
                                                <span>{favorite.reviewStars.toFixed(1)}</span>
                                            </div>   
                                        </div>
                                        <div className="profile-favorite-content">
                                            <div className="favorite-name">
                                                <h5 className="text-overflow">{favorite.name}</h5>
                                                <div className="favorite-icon">
                                                    <FavoriteIcon onClick={() => handleFavorite(favorite)} />
                                                </div>
                                            </div>
                                            <div className="profile-favorite-tags">
                                                <TagGroup className="m-0">
                                                    <Slider {...settings}>
                                                        {favorite.categories &&
                                                        favorite.categories.map((category, i) => (
                                                            <Tag key={i}>{category}</Tag>
                                                        ))}
                                                    </Slider>
                                                    
                                                </TagGroup>
                                            </div>
                                            {/* <div className="favorite-tags mt-2">
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    className="justify-content-center d-block"
                                                >
                                                    {favorite.categories && 
                                                            favorite.categories.map(
                                                                (category, index) => 
                                                                (
                                                                    <Chip
                                                                        className="keeper-tag"
                                                                        key={index}
                                                                        label={category}
                                                                        size='small'
                                                                    />
                                                                )
                                                            )
                                                            }
                                                </Stack>
                                            </div> */}
                                        </div>
                                        {/* <div className="favorite-icon">
                                            <FavoriteIcon onClick={() => handleFavorite(favorite)} />
                                        </div> */}
                                    </div>
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Favorite;
