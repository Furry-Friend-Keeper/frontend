import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Favorite from "../components/OwnerPage/Favorite";
import TakeCareDetail from "../components/OwnerPage/TakeCareDetail";
import UserProfile from "../components/OwnerPage/UserProfile";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import axios from "axios";

function OwnerDetail() {
  const { ownerId } = useParams();
  const { loading, userInfo, error, success, accessToken } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [ownerData, setOwnerData] = useState({});
  const [keeperData, setKeeperData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);

  const fetchRequests = async () => {
    await axios
      .get(import.meta.env.VITE_OWNER_APPOINTMENT_ID + ownerId, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((response) => {
        setRequests(response.data);
      });
  };

  const fetchOwner = async () => {
    try {
      const apiUrl = import.meta.env.VITE_OWNER_ID + ownerId;
      await axios
        .get(apiUrl, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) => {
          const data = response.data;
          setOwnerData(data);
          const favorites = data.favorites.map(item => item.petKeeperId)
          setFavoriteData(favorites)
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getKeeperAll = async () => {
    try {
      const apiUrl = import.meta.env.VITE_KEEPERS_ALL;
      await axios.get(apiUrl).then(response => {
        const data = response.data;
        setKeeperData(data)
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchOwner()
    getKeeperAll()
  }, []);

  const filterFavorites = useMemo(() => {
    return keeperData.filter(item => favoriteData.includes(item.id));
  }, [keeperData, favoriteData]);

  useEffect(() => {
    if (!accessToken) {
      // Redirect to login if not logged in
      navigate("/at3/login");
    } else if (userInfo?.role !== "Owner") {
      navigate("/at3/");
    } else if (
      userInfo?.id !== parseInt(ownerId) &&
      userInfo?.role === "Owner"
    ) {
      // Redirect to their keeper edit page if ownerId doesn't match
      navigate("/at3/unauthorized");
      // Adding navigate, success, userInfo, and ownerId as dependencies ensures that
      // the effect runs again if any of these values change.
    }
  }, [navigate, accessToken, userInfo, ownerId]);

  return (
    <>
      {/* <div className="container pt-lg-4"> */}
      <Container maxWidth="lg">
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto col-12 px-0">
            <UserProfile ownerId={ownerId} ownerData={ownerData}  />
            <Favorite favorites={filterFavorites} />
          </div>
        </div>
        <div className="col-md-12 mx-auto">
          <div className=" mx-auto col-12 px-0">
            <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
              <h4>Taking care of my pet</h4>
              <div className="p-4 movedown-transition">
                {requests.length > 0 ? (
                  <TakeCareDetail requests={requests} fetchRequests={fetchRequests} />
                ) : (
                  <div className="text-center mt-3 fs-4">
                    DON'T HAVE AT THIS TIME
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* </div> */}
    </>
  );
}

export default OwnerDetail;
