import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import Favorite from "../components/OwnerPage/Favorite";
import TakeCareDetail from "../components/OwnerPage/TakeCareDetail";
import UserProfile from "../components/OwnerPage/UserProfile";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import axiosAuth from "../components/Global/AxiosService";
import axios from "axios";
import { Radio, RadioGroup } from "rsuite";

function OwnerDetail() {
    const customWidth = import.meta.env.VITE_CUSTOM_WIDTH
    const { ownerId } = useParams();
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [requestsFilter, setRequestsFilter] = useState([]);
    const [ownerData, setOwnerData] = useState({});
    const [keeperData, setKeeperData] = useState([]);
    const [favoriteData, setFavoriteData] = useState([]);
    const [radioChange, setRadioChange] = useState("Pending");
    const ownerRef = useRef()
    const location = useLocation();

    useEffect(() => {
        if(location.hash === "#take-care") {
            ownerRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    },[location])
    
    const fetchRequests = async () => {
        await axiosAuth
        .get(import.meta.env.VITE_OWNER_APPOINTMENT_ID + ownerId, {
            // headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
            setRequests(response.data);
        }).catch((error) => {
            console.log(error.response.data)
        });
    };
    const cacheRequest = useMemo(() => requests, [requests]);

    useEffect(() => {
        const filter = cacheRequest.filter(req => req.status === radioChange)
        const sortFilter = filter.sort((a, b) => a.startDate - b.startDate)
        setRequestsFilter(sortFilter) 
    }, [cacheRequest, radioChange])
    
    const handleRadio = (value) => {
        // const filter = cacheRequest.filter(req => req.status === value)
        // // console.log(cacheRequest.filter(req => req.status === value))
        // setRequestsFilter(filter)
        setRadioChange(value)
    }

    const fetchOwner = async () => {
        try {
            const apiUrl = import.meta.env.VITE_OWNER_ID + ownerId;
            await axiosAuth
                .get(apiUrl
            )
                .then((response) => {
                    const data = response.data;
                    setOwnerData(data);
                    const favorites = data.favorites.map(
                        (item) => item.petKeeperId
                    );
                    setFavoriteData(favorites);
                });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getKeeperAll = async () => {
        try {
            const apiUrl = import.meta.env.VITE_KEEPERS_ALL;
            await axios.get(apiUrl).then((response) => {
                const data = response.data;
                setKeeperData(data);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
        fetchOwner();
        getKeeperAll();
    }, []);

    const filterFavorites = useMemo(() => {
        return keeperData.filter((item) => favoriteData.includes(item.id));
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
            <Container maxWidth={customWidth}>
                <div className="col-md-11 mx-auto">
                    <div className="row mx-auto col-12 px-0">
                        <UserProfile ownerId={ownerId} ownerData={ownerData} />
                        <Favorite favorites={filterFavorites} />
                    </div>
                </div>
                <div ref={ownerRef} className="col-md-11 mx-auto">
                    <div className=" mx-auto col-12 px-0">
                        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                            <h4 className="mb-4">Taking care of my pet</h4>
                            <RadioGroup
                                className="mb-3"
                                name="radio-group-inline-picker"
                                inline
                                appearance="picker"
                                value={radioChange}
                                onChange={handleRadio}
                            >
                                <Radio value="Pending">Pending</Radio>
                                <Radio value="Scheduled">Scheduled</Radio>
                                <Radio value="In Care">In Care</Radio>
                                <Radio value="Keeper Completed">Get a pet</Radio>
                                <Radio value="Completed">Completed</Radio>
                                <Radio value="Cancelled">Cancelled</Radio>
                            </RadioGroup>
                            <div className="pe-3 movedown-transition take-care-list">
                                {requestsFilter.length > 0 ? (
                                    <TakeCareDetail
                                        requests={requestsFilter}
                                        fetchRequests={fetchRequests}
                                    />
                                ) : (
                                    <div className="text-center mt-3 fs-4 fw-bold">
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
