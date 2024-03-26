import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Favorite from '../components/OwnerPage/Favorite';
import TakeCareDetail from '../components/OwnerPage/TakeCareDetail';
import UserProfile from "../components/OwnerPage/UserProfile";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function OwnerDetail() {

    const { ownerId } = useParams();
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
        )
    const navigate = useNavigate();

      useEffect(() => {
        if (!accessToken) {
          // Redirect to login if not logged in
            navigate('/at3/login');
        } else if (userInfo?.role !== "Owner") { 
            navigate('/at3/')
        } else if (userInfo?.id !== parseInt(ownerId) && userInfo?.role === "Owner") {
          // Redirect to their keeper edit page if ownerId doesn't match
            navigate('/at3/unauthorized');
        // Adding navigate, success, userInfo, and ownerId as dependencies ensures that
        // the effect runs again if any of these values change.
      } },  [navigate, accessToken, userInfo, ownerId]);
    
  return (
    <>
        {/* <div className="container pt-lg-4"> */}
        <Container maxWidth="lg">
            <div className="col-md-12 mx-auto">
                <div className="row mx-auto col-12 px-0">
                    <UserProfile ownerId={ownerId} />
                    <Favorite  />
                </div>
            </div>
            <div className="col-md-12 mx-auto">
                <div className=" mx-auto col-12 px-0">
                    <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                        <h3>Taking care of my pet</h3>
                        <div className="p-4 movedown-transition">
                        {/* { Keeper ? <TakeCareDetail/> : <div className='text-center mt-3 fs-4'>DON'T HAVE AT THIS TIME</div>} */}
                        <TakeCareDetail/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        {/* </div> */}
    </>
  )
}

export default OwnerDetail