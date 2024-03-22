import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import axios from "axios";
import Favorite from '../components/Favorite';
import TakeCareDetail from '../components/TakeCareDetail';
import { Container } from "@mui/material";
import {Rating, Stack, Chip} from '@mui/material/';
import StarIcon from '@mui/icons-material/Star';
import { Modal, ButtonToolbar, Button, RadioGroup, Radio, Placeholder,  Form, Input } from 'rsuite';
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

function OwnerDetail() {

    const { ownerId } = useParams();
    const [apiData, setApiData] = useState([]);
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState('true');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
        )
    const navigate = useNavigate();

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
        {/* <div className="container pt-lg-4"> */}
        <Container maxWidth="lg">
            <div className="col-md-12 mx-auto">
                <div className="row mx-auto col-12 px-0">
                    <div className="col-md-4 ps-0">
                        <div className="bg-shadow rounded p-sm-3 p-lg-4 p-md-4 bg-white mt-4">
                            <div className="profile-info-container">
                                <div className="profile-info-title">
                                        <div className="row profile-info-image">
                                            <SizedAvatar size="8" alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </div>
                                    <div className="profile-info-title-detail">
                                        <h5>Ryan Reynolds</h5>
                                        <div className="blue-btn">
                                            <Button onClick={handleOpen} color="blue" appearance="primary">Edit Profile</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-infomation">
                                    <h5>Information</h5>
                                    <div className="profile-infomation-detail">
                                        <div className="profile-warpper">
                                            <p>Email</p>
                                            <p className="info">Test@gmail.com</p>
                                        </div>   
                                        <div className="profile-warpper">
                                            <p>Phone</p>
                                            <p className="info">0629999999</p>
                                        </div>   
                                        <div className="profile-warpper">
                                            <p>Password</p>
                                            <Button color="blue" appearance="ghost">Change Password</Button>
                                        </div>   
                                        <div className="profile-warpper">
                                            <p>Pet Name</p>
                                            <p className="info">Tong</p>
                                        </div>   
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 pe-0">
                        <div className="bg-shadow rounded p-sm-3 p-lg-4 p-md-4 bg-white mt-4">
                            <div className="profile-favorite">
                                <h4>My Favorite Keeper</h4>
                                <div className="profile-favorite-list-all">
                                    <div className="profile-favorite-list">
                                        <div className="profile-favorite-imge">
                                            <img src="/assets/dog.jpg" alt="" />
                                        </div>
                                        <div className="profile-favorite-content">
                                            <div className="favorite-name"><h5>Paws & Claws Veterinary Clinic</h5></div>
                                            <div className="favorite-star">
                                                <Rating className='mb-2' name="half-rating-read" value={4} precision={1} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                                            </div>
                                            <div className="favorite-tags">
                                            <Stack direction="row" spacing={1} className="justify-content-center d-block">
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
                                                                size='small'
                                                            />
                                                    <Chip
                                                                className="keeper-tag"
                                                                label="Cat"
                                                                size='small'
                                                            />
                                                    <Chip
                                                                className="keeper-tag"
                                                                label="Batman"
                                                                size='small'
                                                            />
                                            </Stack>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-favorite-list">
                                        <div className="profile-favorite-imge">
                                            <img src="/assets/dog.jpg" alt="" />
                                        </div>
                                        <div className="profile-favorite-content">
                                            <div className="favorite-name"><h5>Paws & Claws Veterinary Clinic</h5></div>
                                            <div className="favorite-star">
                                                <Rating className='mb-2' name="half-rating-read" value={4} precision={1} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                                            </div>
                                            <div className="favorite-tags">
                                            <Stack direction="row" spacing={1} className="justify-content-center d-block">
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
                                                                size='small'
                                                            />
                                                    <Chip
                                                                className="keeper-tag"
                                                                label="Cat"
                                                                size='small'
                                                            />
                                                    <Chip
                                                                className="keeper-tag"
                                                                label="Batman"
                                                                size='small'
                                                            />
                                            </Stack>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 mx-auto">
                <div className=" mx-auto col-12 px-0">
                    <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                        <h3>Taking care of my pet</h3>
                        <div className="p-4">
                        {/* { Keeper ? <TakeCareDetail/> : <div className='text-center mt-3 fs-4'>DON'T HAVE AT THIS TIME</div>} */}
                        <TakeCareDetail/>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="col-md-11">
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
                    <h3>My Favorite Keeper</h3> */}
                    {/* { Keeper ? <div className="scrollmenu bg-white p-3">
                        <Favorite/>
                    </div> 
                    : 
                    <div className='text-center mt-3 fs-4'>NO FAVORITE PET KEEPER</div>} */}
                    {/* <div className="scrollmenu bg-white p-3">
                        <Favorite/>
                    </div>
                </div>
                <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                    <h3>Taking care of my pet</h3>
                    <div className="p-4"> */}
                    {/* { Keeper ? <TakeCareDetail/> : <div className='text-center mt-3 fs-4'>DON'T HAVE AT THIS TIME</div>} */}
                    {/* <TakeCareDetail/>
                    </div>
                </div>
            </div> */}
        </Container>
        <Modal backdrop={backdrop} keyboard={false} open={open} size="sm" onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <Placeholder.Paragraph /> */}
            <div className="modal-body">
                <div className="mb-3">
                <label htmlFor="firtName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firtName" name="firtName" />
                </div>
                <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                        <PhoneInput
                            inputProps={{
                                required: true,
                                autoFocus: true,
                                className: "form-control py-2"
                            }}
                            masks={{th: '.. ... ....', }}
                            // inputClass={`${errors.phone ? "is-invalid" : ""} py-2`}
                            inputStyle={{ width: "100%"}}
                            specialLabel={""}
                            country={"th"}
                            countryCodeEditable={false}
                            placeholder="Enter phone number"
                        />
                </div>
                <div className="mb-3">
                <label htmlFor="petName" className="form-label">Pet Name</label>
                <input type="text" className="form-control" id="petName" name="petName" />
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
        {/* </div> */}
    </>
  )
}

export default OwnerDetail