import { useState, useMemo, useEffect } from "react";
import BannerPage from "../components/HomePage/BannerPage";
import KeeperCategory from "../components/HomePage/KeeperCategory";
import KeeperContents from "../components/HomePage/KeeperContents";
import axiosAuth from "../components/Global/AxiosService";
import axios from "axios";
import L from "leaflet";
import { Dropdown, useToaster, Tag } from "rsuite";
import { findSearch } from "../store/SearchSlice";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/LocationSlice";
import SortIcon from '@mui/icons-material/Sort';

function Home() {
  let customWidth = import.meta.env.VITE_CUSTOM_WIDTH;
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [apiData, setApiData] = useState([]);
  const [distanceAll, setDistanceAll] = useState([]);
  const [ratingScore, setRatingScore] = useState([0, 5]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortAscending, setSortAscending] = useState("");
  const [sortDistanceAsc, setSortDistanceAsc] = useState("");
  const [sortTitles, setSortTitles] = useState("");
  const [distanceTitle, setDistanceTitle] = useState("");
  const dispatch = useDispatch();
  const currentLocation = useSelector(
    (state) => state?.location?.currentLocation
  );
  const [favoriteData, setFavoriteData] = useState([]);
  const cacheApiData = useMemo(() => apiData, [apiData]);

  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_KEEPERS_ALL;
      await axios.get(apiUrl).then((response) => {
        const data = response.data;
        setApiData(data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOwner = async () => {
    try {
      if (userInfo.role === "Owner") {
        const apiUrl = import.meta.env.VITE_OWNER_ID + userInfo.id;
        await axiosAuth.get(apiUrl).then((response) => {
          const data = response.data;
          const favorites = data.favorites.map((item) => item.petKeeperId);
          setFavoriteData(favorites);
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchOwner();

    if (!currentLocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          dispatch(setLocation(location));
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    }
  }, []);

  function getURL(start, end) {
    return `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false&alternatives=true&steps=true&hints=;`;
  }

  useEffect(() => {
    let isMounted = true; // For avoiding state update on unmounted component

    async function calculateDistance(start, end) {
      const cacheKey = `${start.lat},${start.lng}-${end.lat},${end.lng}`;
      let distances = JSON.parse(localStorage.getItem("location_list")) || {};
      if (distances[cacheKey]) return parseFloat(distances[cacheKey]);

      //`http://router.project-osrm.org/route/v1/driving/
      //${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`;
      const apiUrl = getURL(start, end);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const distance = data.routes[0].distance;
        distances[cacheKey] = distance;
        localStorage.setItem("location_list", JSON.stringify(distances));
        return distance;
      } catch (error) {
        console.error("Error fetching data from OSRM:", error);
        throw error;
      }
    }

    async function updateSearchWithDistances() {
      if (!currentLocation) return;
      let batchDistances = [];
      for (const data of search) {
        if (data.map && data.map.length > 0) {
          const [lat, lng] = data.map[0].split(",").map(Number);
          const latlng = L.latLng(lat, lng);
          const current = L.latLng(
            currentLocation.latitude,
            currentLocation.longitude
          );
          try {
            const distance = await calculateDistance(current, latlng);
            const distanceKm = (distance / 1000).toFixed(2);
            batchDistances.push({ id: data.id, distance: distanceKm });

            if (batchDistances.length % 3 === 0) {
              if (isMounted) {
                setDistanceAll((prevDistances) => [
                  ...prevDistances,
                  ...batchDistances,
                ]);
                setTimeout(() => {
                  setLoading(true)
                },3000)
              }
              // batchDistances = []; // Reset after updating
            }
          } catch (error) {
            console.error("Error calculating distance for:", data, error);
          }
        }
      }

      // For any remaining distances not yet pushed
      if (batchDistances.length > 0 && isMounted) {
        setDistanceAll(batchDistances);
        setLoading(true)
      }
    }

    updateSearchWithDistances();

    return () => {
      isMounted = false;
    };
  }, [search, currentLocation]);

  // Pre-process distance data for quick lookup
  const distanceLookup = useMemo(() => {
    return distanceAll.reduce((acc, distance) => {
      acc[distance.id] = distance.distance;
      return acc;
    }, {});
  }, [distanceAll]);

  useEffect(() => {
    const filter = cacheApiData.filter(
      (item) => 
      item.reviewStars >= ratingScore[0] && item.reviewStars <= ratingScore[1] &&
        selected.every((filter) => item.categories?.includes(filter))
    );
    // console.log(cacheApiData)

    // console.log(filter)
    setSearch(filter);
    // if (filter.length > 0) {
    //   setLoading(true);
    // }
  }, [selected, cacheApiData, ratingScore]);

  const handleCategory = (category) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cate) => cate !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const [sortTitle, setSortTitle] = useState("Sort")

  const handleSelect = (eventKey, event) => {
    // console.log(event.target.innerText)
    setSortTitle(event.target.innerText)
    setSortAscending(eventKey)
    if(eventKey === "RatingDes" || eventKey === "RatingAsc") {
      SortReviewStar(eventKey)
    }else if(eventKey === "DistanceDes" || eventKey === "DistanceAsc") {
      SortDistance(eventKey)
    }
  }

  const SortReviewStar = (isSort) => {
    const sortStar = [...search].sort((a, b) =>
      isSort === "RatingDes"
        ? b.reviewStars - a.reviewStars
        : a.reviewStars - b.reviewStars
    );
    setSearch(sortStar);
  };

  const SortDistance = (isSort) => {
    const distanceSort = distanceAll.sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );
    const distanceMap = new Map(
      distanceSort.map((item) => [item.id, parseFloat(item.distance)])
    );
    const sortData = [...search].sort((a, b) =>
      isSort === "DistanceDes"
        ? distanceMap.get(b.id) - distanceMap.get(a.id)
        : distanceMap.get(a.id) - distanceMap.get(b.id)
    );
    setSearch(sortData);
  };

  const selectRatingRange = (range) => {
    setRatingScore(range);
    const ratingRange = cacheApiData.filter(
      (val) => 
      item.reviewStars >= range[0] && item.reviewStars <= range[1] &&
        selected.every((filter) => val.categories.includes(filter))
    );
    setSearch(ratingRange);
    setSortTitles("");
    setSortAscending("");
  };

  const resetFilter = () => {
    // reset sort rating
    setSortAscending("");
    setSortTitles("");
    // reset sort distance
    setSortDistanceAsc("");
    setDistanceTitle("");
    setSortTitle("Sort")
    // reset filter rating
    setRatingScore([0,5]);
    //reset filter categories
    setSelected([]);
    dispatch(findSearch(""))
  };

  return (
    <>
      {/* title */}
      <BannerPage />
      {/* Content */}
      <Container maxWidth={customWidth} className="my-5">
        {/* <div className="container-sm pt-3"> */}
        {/* <div className="container p-2 mb-5 mt-3"> */}
        <div className="keeper-panel">
          {/* KeeperCategory */}
          <KeeperCategory
            selected={selected}
            handlecategory={handleCategory}
            selectratingrange={selectRatingRange}
            ratingscore={ratingScore}
            resetfilter={resetFilter}
          />
          <div className="keeper-list">
            <div className="d-flex justify-content-end mb-3 mx-sm-3 mx-lg-0">
                {/* <h4>All Pet Keeper</h4> */}
              <div className="keeper-list-filter d-flex">
                <div className="sort-list">
                  <Dropdown className="sort-dropdown" onSelect={handleSelect} placement="bottomEnd" appearance="default" title={sortTitle} icon={<SortIcon />} activeKey={sortAscending}>
                    <Dropdown.Item
                      eventKey="RatingDes"
                    >
                      Rating: High to Low
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item
                      eventKey="RatingAsc"
                    >
                      Rating: Low to High
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item
                      eventKey="DistanceDes"
                    >
                      Distance: High to Low
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item
                      eventKey="DistanceAsc"
                    >
                      Distance: Low to High
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
              {/* <div className='keeper-list-pagination'>
                  page
                </div> */}
            </div>
            <div className="row">
              {!loading ? (
                <div className="grid-autofill">
                  {Array.from(new Array(8)).map((item, index) => (
                    <Box key={index}>
                      {" "}
                      {/* Add a unique key prop here */}
                      <Skeleton
                        variant="rectangular"
                        width={250}
                        height={150}
                      />
                      <Box sx={{ pt: 0.5 }}>
                        <Skeleton width={250} />
                        <Skeleton width={250} />
                      </Box>
                    </Box>
                  ))}
                </div>
              ) :
                <KeeperContents
                  search={search}
                  distanceLookup={distanceLookup}
                  favorites={favoriteData}
                  changeFavorite={setFavoriteData}
                  distanceAll={distanceAll}
                  sortDistanceAsc={sortDistanceAsc}
                  sortAscending={sortAscending}
                />}
              {/* <KeeperContents search={search} /> */}
            </div>
            {/* <PaginationButton /> */}
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </Container>
    </>
  );
}

export default Home;
