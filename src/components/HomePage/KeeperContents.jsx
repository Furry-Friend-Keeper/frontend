import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axiosAuth from "../Global/AxiosService";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Pagination, Rate, useToaster, Message, Tag, TagGroup, Notification, ButtonToolbar } from "rsuite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import Slider from "react-slick";

function KeeperContents(props) {
  const { search, distanceLookup, favorites, changeFavorite, distanceAll,sortDistanceAsc, sortAscending } = props;
  const { searchInput } = useSelector((state) => state.search)
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState([])

  useEffect(() => {
    const filteredBySearch = search.filter((item) =>
    item.name?.toLowerCase().includes(searchInput?.toLowerCase())
  );
    setSearchValue(filteredBySearch)
  },[search, searchInput])
  // const [favoriteData, setFavoriteData] = useState({});
  const [limit, setLimit] = useState(
    parseInt(import.meta.env.VITE_LIMIT_PAGINATION)
  );

  const limitOptions = [4, 8, 12, 16];
  const size = "md";
  const maxButtons = 5;
  const total = searchValue.length;
  const layout = [ "-","limit", "|", "pager"];

  // Calculate the current page's items
  const paginatedItems = useMemo(() => {
    const startIndex = (activePage - 1) * limit;
    const endIndex = startIndex + limit;
    const distanceSort = distanceAll.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    const distanceMap = new Map(distanceSort.map(item => [item.id, parseFloat(item.distance)]));
    if(sortAscending || sortDistanceAsc) {
      return searchValue.slice(startIndex, endIndex);
    }
    const sortData = [...searchValue].sort((a, b) => distanceMap.get(a.id) - distanceMap.get(b.id));
    return sortData.slice(startIndex, endIndex);

  }, [activePage, limit, searchValue, distanceAll, sortAscending, sortDistanceAsc]);

  const toaster = useToaster();
  const placement = "topEnd";
  const duration = 3000;

  const message = (type, header, error) => {
      return (
      <Message
        showIcon
        type={type}
        header={header}
        closable
      >
        <small className="text-black">{error}</small>
      </Message>
      )
  }

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setActivePage(1); // Reset to first page when limit changes
  };
  
  const handleFavorite = async (value) => {
    try {
      if(!accessToken){
        toaster.push(message("warning", "Please Login", "Please log in to continue."), { placement, duration })
        // toaster.push(messageNoti("warning"), { placement, duration })
      }
      else if(userInfo.role !== "Owner") {
        toaster.push(message("warning", "Restricted Access", "This section is reserved for pet owners only."), { placement, duration })
      }
      else if(userInfo.role === "Owner") {
          const data = {
            "petOwnerId" : userInfo.id,
            "petKeeperId": value.id
          }
          const apiUrl = import.meta.env.VITE_OWNER_FAVORITE_ID + userInfo.id;
          await axiosAuth.put(apiUrl, data)
              .then(() => {
                  if(favorites.includes(value.id)) {
                    changeFavorite(favorites.filter(item => item !== value.id))
                    toaster.push(message("warning","Favorite Removed", "Removed from favorite. 😔"), { placement, duration });
                  }else {
                    changeFavorite([...favorites, value.id])
                    toaster.push(message("success","Favorite Added", "Favorite added successfully! 🌟"), { placement, duration });
                  }
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

  const detail = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolorem fugiat modi aliquid aspernatur sed facere ipsum iste placeat, expedita, nulla quia alias architecto ea enim eligendi repellendus? Totam, quod!"

  return (
    <>
      {paginatedItems.length > 0 ? paginatedItems.map((item, index) => {
        const distance = distanceLookup[item.id];
        return (
          <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-4 mb-3 px-2 ">
            <div className="keeper-card movedown-transition">
            <Link to={`/at3/keepers/${item.id}`} className="image-status">
              <div className="keeper-card-image">
              {!item.img ? (
                <div className="img-close-status">
                  {item.available === false && <div className="bg-tranparency">Closed</div>}
                  <ImageNotSupportedIcon className="notImage" />
                </div>
              ) : (
                <div className="img-close-status">
                  {item.available === false && <div className="bg-tranparency">Closed</div>}
                  <img 
                    src={
                        import.meta.env.VITE_KEEPER_IMAGE +
                        item.id +
                        "/" +
                        item.img
                      }
                    alt="" />
                </div>
              )}
                <div className="keeper-card-rating">
                  <StarRoundedIcon /> 
                  <span>{item.reviewStars.toFixed(1)}</span>
                </div>         
              </div>
              </Link>
              <div className="keeper-card-body">
                  <div className="keeper-card-header">
                    <div className="keeper-card-name">
                      <h5 className="text-overflow">{item.name}</h5>
                    </div>
                    <div className="keeper-card-favorite">
                      {favorites && favorites?.includes(item.id) ? (
                        <FavoriteIcon onClick={() => handleFavorite(item)} className="favorite-icon" />
                      ) : (
                        <FavoriteBorderIcon onClick={() => handleFavorite(item)} className="favorite-icon" />
                      )}
                    </div>
                  </div>
                  <div className="keeper-card-detail text-break">
                    <p>{item.detail.slice(0, 75)}...</p>
                  </div>
                  <div className="keeper-card-distance">
                    <p className="mt-0 fs-6">{distance} km.</p>
                  </div>
                  <div className="border"></div>
                  <div className="keeper-card-tags">
                    <TagGroup className="m-0">
                      <Slider {...settings}>
                        {item.categories &&
                         item.categories.map((category, i) => (
                            <Tag key={i}>{category}</Tag>
                         ))}
                      </Slider>
                      
                    </TagGroup>
                  </div>
              </div>
            </div>
          </div>
        );
      }) :
        <div className="text-center fw-bold mt-5 fs-4">
          NO PET KEEPER FOUND
        </div>
      }
      <div className="d-flex justify-content-between align-items-center w-100 mt-4">
        <div>Total: {total}</div>
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
