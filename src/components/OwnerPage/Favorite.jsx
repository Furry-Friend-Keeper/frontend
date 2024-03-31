import { Rating, Stack, Chip } from "@mui/material/";
import { Rate } from "rsuite";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

const Favorite = (props) => {
    const { favorites } = props
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const { ownerId } = useParams();
    const navigate = useNavigate()

    console.log(favorites)

    const linkToKeeper = (item) => {
        navigate(`/at3/keepers/${item.id}`)
    }


    return (
        <>
            <div className="col-md-8 pe-0">
                <div className="bg-shadow rounded p-sm-3 p-lg-4 p-md-4 bg-white mt-4">
                    <div className="profile-favorite">
                        <h4>My Favorite Keeper</h4>
                        {/* {keeperfavorite ? <keeperFavorite/> : <div className='text-center mt-3 fs-4'>DON'T HAVE FAVORITE KEEPER</div>} */}
                        {favorites.map((favorite) => (
                            <div key={favorite.id} className="profile-favorite-list-all movedown-transition">
                                <div className="profile-favorite-list">
                                    <div className="profile-favorite-imge" onClick={() => linkToKeeper(favorite)}>
                                    <img
                                        src={
                                            import.meta.env.VITE_KEEPER_IMAGE +
                                            favorite.id +
                                            "/" +
                                            favorite.img
                                        }
                                        alt={favorite.title}
                                    />
                                    </div>
                                    <div className="profile-favorite-content">
                                        <div className="favorite-name">
                                            <h5>{favorite.name}</h5>
                                        </div>
                                        <div className="favorite-star mt-2">
                                            <Rate
                                                defaultValue={favorite.reviewStars}
                                                allowHalf
                                                size="xs"
                                                color="yellow"
                                                readOnly
                                            />
                                        </div>
                                        <div className="favorite-tags mt-2">
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
                                        </div>
                                    </div>
                                    <div className="favorite-icon ">
                                        <FavoriteIcon />
                                    </div>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div>
            </div>
        </>
    );
};

export default Favorite;
