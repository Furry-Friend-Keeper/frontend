import Footer from '../layouts/Footer.jsx';
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { GoogleMap, LoadScript, StandaloneSearchBox, MarkerF } from '@react-google-maps/api';
import Rating from '@mui/material/Rating';
import $ from 'jquery'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';


function KeeperDetail() {

  const [apiData, setApiData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_KEEPERS_ID + id;
        await axios.get(apiUrl).then(response => {
          const data = response.data;
          setApiData(data)
          console.log(data);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const { id } = useParams();

  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const slider = useRef(null);

  const API_KEY = "AIzaSyD9JUPIBgFol7hDEGVGS6ASoubOOcGGtME";
  const [ libraries ] = useState(['places']);
  const slider_main = {
    asNavFor : slider2,
    slidesToShow : 1,
    slidesToScroll : 1,
    arrows : true,
    infinite : false,
    nextArrow : <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>,
    prevArrow : <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>,
    afterChange : function (slick, nextSlide) {
    
      if(nextSlide === 0) {
          $('.slick-next').addClass('disabled');
      }
      else {
          $('.slick-next').removeClass('disabled');
      }
      if(nextSlide === slick.slideCount - 1) {
          $('.slick-prev').addClass('disabled');
      }
      else {
          $('.slick-prev').removeClass('disabled');
      } 
    }
  }

  const slider_nav = {
    asNavFor : slider1,
    focusOnSelect : true,
    slidesToShow : 5,
    centerMode : true,
    swipeToSlide : false,
    arrows : false,
    infinite : false,
    // vertical : true,
    // verticalSwiping : true,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow : 3,
          vertical : false,
          verticalSwiping : false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow : 3,
          vertical : false,
          verticalSwiping : false,
        }
      },
    ]
  }
  


  return (
    <>
        <div className="container pt-lg-4">
          <div className="carousel col-md-11">
            <div className="slider-for">
              <Slider className="slider"
                ref={(slider) => setSlider1(slider)}
                {...slider_main}
                >
                  <img src="/assets/cover.jpeg" alt="" />
                  <img src="/assets/cover.jpeg" alt="" />
                  <img src="/assets/cat.jpg" alt="" />
                  <img src="/assets/cover.jpeg" alt="" />
                  <img src="/assets/cover.jpeg" alt="" />
              </Slider>
            </div>
            <div className="slider-nav">
              <Slider   
                className="slider"
                ref={(slider) => setSlider2(slider)}
                {...slider_nav}
                >
                  <img src="/assets/cover.jpeg" alt="" />
                  <img src="/assets/cover.jpeg" alt="" />
                  <img src="/assets/cat.jpg" alt="" />
                  <img src="/assets/cover.jpeg" alt="" />
                  <img src="/assets/cover.jpeg" alt="" />
              </Slider>
            </div>
          </div>
        </div>
        <div className="container pb-lg-5">
          <div className="row mx-auto col-11">
            <div className="col-lg-8">
              <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
              
                <div className="title d-flex justify-content-between align-items-center">
                
                  <h2 className="mb-lg-4 mt-lg-3">{apiData.name}</h2>
                  <span className="fs-3"><i className="bi bi-star"></i></span>
                  
                </div>
                <div className="des">
                  <h4>Description</h4>
                  <p>{apiData.detail}</p>
                </div>
              </div>
              <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                <div className="title">
                  <h2>Contact</h2>
                </div>
                <div className="table">
                  <table className="w-100">
                      <tr>
                        <td>Name</td>
                        <td className="text-end">{apiData.contact}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td className="text-end">{apiData.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td className="text-end">{apiData.phone}</td>
                      </tr>

                    </table>
                </div>
              </div>
            </div>
            <div className="col-lg col-12">
                <div className="bg-shadow mt-4">
                  <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
                  <GoogleMap
                    // onLoad={onLoad}
                    center={{ lat: -33.8688, lng: 151.2195 }}
                    zoom={13}
                    mapContainerStyle={{ width: '100%', height: '200px' }}
                  ></GoogleMap>
                  </LoadScript>
                  <div className="keeper-address p-md-2 bg-white">
                    <div className="table">
                      <table className="w-100">
                        <tr>
                          <td>Address 1</td>
                          <td className="text-end">{apiData?.address?.address}</td>
                        </tr>
                        <tr>
                          <td>District</td>
                          <td className="text-end">{apiData?.address?.district}</td>
                        </tr>
                        <tr>
                          <td>Province</td>
                          <td className="text-end">{apiData?.address?.province}</td>
                        </tr>
                        <tr>
                          <td>PostalCode</td>
                          <td className="text-end">{apiData?.address?.postalCode}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="bg-shadow p-2 p-sm-3 p-md-3 bg-white mt-4">
                  <div className="title">
                    <h4>Reviews</h4>
                  </div>
                  <div className="des">
                    <div className="rating">
                      <span className="fs-3 rating-score me-2">{apiData.reviewStars}</span>
                      <Rating name="half-rating-read" value={apiData.reviewStars || 0} precision={0.5} readOnly/>
                      {/* <span className="">10 review</span> */}
                    </div>
                    <div className="review-des mt-3">
                      <textarea className="form-control"  cols="30" rows="5" placeholder="Message to reviews"></textarea>
                    </div>
                    <div className="review-btn mt-3">
                      <button className="btn btn-success w-100">Save</button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default KeeperDetail