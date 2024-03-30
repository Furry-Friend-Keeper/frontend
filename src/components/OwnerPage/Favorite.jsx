import { useState, useEffect } from "react";
import axios from "axios";
import { Rating, Stack, Chip } from "@mui/material/";
import { Rate } from "rsuite";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Favorite = () => {
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const { ownerId } = useParams();
    const [favorite, setFavorite] = useState([]);

    const fetchFavorite = async () => {
        await axios
            .get(import.meta.env.VITE_OWNER_FAVORITE_ID + ownerId, {
                headers: { Authorization: "Bearer " + accessToken },
            })
            .then((response) => {
                setFavorite(response.data);
                console.log(response.data);
            });
    };

    useEffect(() => {
        fetchFavorite();
    }, []);

    return (
        <>
            <div className="col-md-8 pe-0">
                <div className="bg-shadow rounded p-sm-3 p-lg-4 p-md-4 bg-white mt-4">
                    <div className="profile-favorite">
                        <h4>My Favorite Keeper</h4>
                        {/* {keeperfavorite ? <keeperFavorite/> : <div className='text-center mt-3 fs-4'>DON'T HAVE FAVORITE KEEPER</div>} */}
                        <div className="profile-favorite-list-all movedown-transition">
                            <div className="profile-favorite-list">
                                <div className="profile-favorite-imge">
                                    <img src="/assets/dog.jpg" alt="" />
                                </div>
                                <div className="profile-favorite-content">
                                    <div className="favorite-name">
                                        <h5>Paws & Claws Veterinary Clinic</h5>
                                    </div>
                                    <div className="favorite-star">
                                        <Rate
                                            defaultValue={3.5}
                                            allowHalf
                                            size="sm"
                                            color="yellow"
                                            readOnly
                                        />
                                    </div>
                                    <div className="favorite-tags">
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            className="justify-content-center d-block"
                                        >
                                            {/* {item.categories && 
                                                    item.categories.map(
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
                                                    } */}
                                            <Chip
                                                className="keeper-tag"
                                                label="Dog"
                                                size="small"
                                            />
                                            <Chip
                                                className="keeper-tag"
                                                label="Cat"
                                                size="small"
                                            />
                                            <Chip
                                                className="keeper-tag"
                                                label="Batman"
                                                size="small"
                                            />
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Favorite;
