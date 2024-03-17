import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import axios from "axios";
import Favorite from '../components/Favorite';
import TakeCareDetail from '../components/TakeCareDetail';

function OwnerDetail() {

    const { ownerId } = useParams();
    const [apiData, setApiData] = useState([]);
    const fetchData = async () => {
        try {
          const apiUrl = import.meta.env.VITE_OWNER_ID + ownerId;
          await axios.get(apiUrl).then(response => {
            const data = response.data;
            setApiData(data)
          });
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

    const SizedAvatar = styled(Avatar)`
    ${({ size, theme }) => `
        width: ${theme.spacing(size)}rem; 
        height: ${theme.spacing(size)}rem; 
    `};
    `;
  return (
    <>
        <div className="container pt-lg-4">
            <div className="col-12">
                <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4 m-auto">
                            <div className="d-flex justify-content-center">
                                <SizedAvatar size="12" alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-8 personal-info">
                            <h3>Personal info</h3>
                            <form className="form p-3" role="form">
                                <div className="mb-3 row">
                                    <label className="col-lg-3 control-label">Name</label>
                                    <div className="col-lg-8">
                                        <p>test</p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-lg-3 control-label">Email</label>
                                    <div className="col-lg-8">
                                        <p>test@mail.com</p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-lg-3 control-label">Phone</label>
                                    <div className="col-lg-8">
                                        <p>083xxxxxxx</p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-md-3 control-label">Pet Name</label>
                                    <div className="col-md-8">
                                        <p>john</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                    <h3>My Favorite Keeper</h3>
                    {/* { Keeper ? <div className="scrollmenu bg-white p-3">
                        <Favorite/>
                    </div> 
                    : 
                    <div className='text-center mt-3 fs-4'>NO FAVORITE PET KEEPER</div>} */}
                    <div className="scrollmenu bg-white p-3">
                        <Favorite/>
                    </div>
                </div>
                <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                    <h3>Taking care of my pet</h3>
                    <div className="p-4">
                    {/* { Keeper ? <TakeCareDetail/> : <div className='text-center mt-3 fs-4'>DON'T HAVE AT THIS TIME</div>} */}
                    <TakeCareDetail/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default OwnerDetail