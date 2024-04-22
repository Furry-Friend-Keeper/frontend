import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axiosAuth from "../Global/AxiosService";
import axios from "axios";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { Rating, Stack, Chip } from "@mui/material/";
import StarIcon from "@mui/icons-material/Star";
import { Pagination, Rate } from "rsuite";
import Skeleton from "@mui/material/Skeleton";
import L from "leaflet";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CircleIcon from "@mui/icons-material/Circle";
import { useSelector } from "react-redux";

function KeeperContents(props) {
  const { search, distanceLookup, favorites, changeFavorit, distanceAll,sortDistanceAsc, sortAscending } = props;

  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [activePage, setActivePage] = useState(1);
  // const [favoriteData, setFavoriteData] = useState({});
  const [limit, setLimit] = useState(
    parseInt(import.meta.env.VITE_LIMIT_PAGINATION)
  );

  const limitOptions = [6, 9, 12, 15];
  const size = "md";
  const maxButtons = 5;
  const total = search.length;
  const layout = ["total", "-","limit", "|", "pager", "skip"];

  // Calculate the current page's items
  const paginatedItems = useMemo(() => {
    const startIndex = (activePage - 1) * limit;
    const endIndex = startIndex + limit;
    const distanceSort = distanceAll.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    const distanceMap = new Map(distanceSort.map(item => [item.id, parseFloat(item.distance)]));
    if(sortAscending || sortDistanceAsc) {
      return search.slice(startIndex, endIndex);
    }
    const sortData = [...search].sort((a, b) => distanceMap.get(a.id) - distanceMap.get(b.id));
    return sortData.slice(startIndex, endIndex);

  }, [activePage, limit, search, distanceAll, sortAscending, sortDistanceAsc]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setActivePage(1); // Reset to first page when limit changes
  };

  const handleFavorite = async (value) => {
    try {
      if(userInfo.role === "Owner") {
          const data = {
            "petOwnerId" : userInfo.id,
            "petKeeperId": value.id
          }
          const apiUrl = import.meta.env.VITE_OWNER_FAVORITE_ID + userInfo.id;
          await axiosAuth.put(apiUrl, data, 
              // {
              //     headers: {
              //     Authorization: "Bearer " + accessToken,
              // },
              // }
            )
              .then(() => {
                  console.log("success")
                  if(favorites.includes(value.id)) {
                    changeFavorite(favorites.filter(item => item !== value.id))
                  }else {
                    changeFavorite([...favorites, value.id])
                  }
              });
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
  };

  return (
    <>
      {paginatedItems.map((item, index) => {
        const distance = distanceLookup[item.id];
        return (
          <div
            key={index}
            className="col-xs-12 col-md-6 col-lg-4 col-xl-3 my-2 px-2 "
          >
            <div className="keeper card bg-shadow text-center border-0 movedown-transition">
              {item.img ? (
                <Link to={`/at3/keepers/${item.id}`} className="image-status">

                  <div className="img-close-status">
                  {item.available === false && <div className="bg-tranparency">Closed</div>}
                    <img
                      src={
                        import.meta.env.VITE_KEEPER_IMAGE +
                        item.id +
                        "/" +
                        item.img
                      }
                      alt={item.title}
                    />
                  </div>
                </Link>
              ) : (
                <Link to={`/at3/keepers/${item.id}`} className="image-status">
                  <div className="img-close-status">
                    {item.available === false && <div className="bg-tranparency">Closed</div>}
                    <ImageNotSupportedIcon className="notImage" />
                  </div>
                </Link>
              )}
              <div className="card-body keeper-radius keeeper-container">
                <div className="keeeper-warpper">
                  <div className="border-2 border-bottom-0 mb-2 ">
                    {distance ? (
                      <div className="distance-keeper d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-end">
                          <PlaceOutlinedIcon />
                          <p className="mt-0 fs-6">{distance} km</p>
                        </div>
                          {userInfo.role === "Owner" && 
                            <div className="favorite-icon">
                              {favorites && favorites?.includes(item.id) ? (
                                <FavoriteIcon onClick={() => handleFavorite(item)} className="favorite-icon" />
                              ) : (
                                <FavoriteBorderIcon onClick={() => handleFavorite(item)} className="favorite-icon" />
                              )}
                            </div>
                          }
                      </div>
                    ) : (
                      <Skeleton className="mx-auto mt-2" width={100} />
                    )}
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <h5 className="text-overflow">
                      <Link
                        to={`/at3/keepers/${item.id}`}
                        className="text-black"
                      >
                        {item.name}
                      </Link>
                    </h5>
                  </div>
                  <div>
                    <Rate
                      className="mb-2"
                      value={item.reviewStars}
                      size="xs"
                      color="yellow"
                      readOnly
                    />
                    {/* <Rating className='mb-2' name="half-rating-read" value={item.reviewStars} precision={1} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /> */}
                    <Stack
                      direction="row"
                      spacing={1}
                      className="justify-content-center d-block"
                    >
                      {item.categories &&
                        item.categories.map((category, i) => (
                          <Chip
                            className="keeper-tag"
                            key={i}
                            label={category}
                            size="small"
                          />
                        ))}
                    </Stack>
                  </div>
                </div>
                {/* <div className='border-2 border-top mt-2'>
                        {distance ? 
                        <div className='d-flex justify-content-between align-items-center mt-2'>
                            <div className='distance-keeper d-flex'>
                                <PlaceIcon color='error' />
                                <p className='mt-0'><b>{distance} Km.</b></p>
                            </div>
                            <div>
                                <FavoriteBorderIcon />
                            </div>
                        </div>
                            : 
                            <Skeleton className='mx-auto mt-2' width={100} />
                        }
                    </div> */}
              </div>
            </div>
          </div>
        );
      })}
      <div className="w-100 mt-4">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          layout={layout}
          size={size}
          total={total}
          limit={limit}
          limitOptions={limitOptions}
          maxButtons={maxButtons}
          activePage={activePage}
          onChangePage={handlePageChange}
          onChangeLimit={handleLimitChange}
        />
      </div>
    </>
  );
}

export default KeeperContents;
