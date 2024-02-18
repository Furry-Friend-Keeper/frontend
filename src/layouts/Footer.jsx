import React from 'react'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import PetsIcon from '@mui/icons-material/Pets';

function Footer() {
  return (
    <footer className="footer-container mt-5">
    <div className="container py-4">
        <div className="row ">
            <div className="col-lg-5 col-md-4 text-center">
            <h5 className="footer-header mb-4">PRODUCT NAME</h5>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img src="/assets/cat.png" alt="" width={75} />
            </div>
                <h6 className="footer-header">Furry Friend Keeper</h6>
                <p>Website for animal lover</p>
            </div>
            <div className="col-lg-3 col-md-4">
                <h5 className="footer-header mb-4">ANIMALS</h5>
                <ul className='list-unstyled'>
                    <li><PetsIcon />Dog</li>
                    <li><PetsIcon />Cat</li>
                    <li><PetsIcon />Humster</li>
                    <li><PetsIcon />Hedgehog</li>
                    <li><PetsIcon />rabbit</li>
                </ul>
            </div>
            <div className="col-lg-4 col-md-4">
                <h5 className="footer-header mb-4">CONTACT</h5>
                <ul className="list-unstyled">
                    <li>
                        <FmdGoodIcon/> 
                        <span>King Mongkut’s University of Technology Thonburi (KMUTT)</span>
                    </li>
                    <li><PhoneIcon />+66 99999 9999</li>
                    <li><MailIcon />contact@mail.com</li>
                    {/* <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li> */}
                    {/* <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li> */}
                </ul>
            </div>
        </div>
    </div>
    <div className="footer-warpper text-center p-3">
        &copy; 2023 Furry Friend Keeper
    </div>
</footer>
  )
}

export default Footer