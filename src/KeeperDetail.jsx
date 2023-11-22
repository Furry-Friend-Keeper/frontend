import Navbar from './layouts/Navbar.jsx';
import { useState } from "react";
import Slider from "react-slick";


function KeeperDetail() {

  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const slider_main = {
    asNavFor : slider2,
    slidesToShow : 1,
    slidesToScroll : 1,
    arrows : true,
    nextArrow : <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>,
    prevArrow : <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
  }

  const slider_nav = {
    asNavFor : slider1,
    focusOnSelect : true,
    slidesToShow : 5,
    centerMode : true,
    swipeToSlide : false,
    arrows : false,
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
        <Navbar />
        <div className="container">
          <div className="carousel col-md-12">
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
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="keeper-detail p-5">
                <div className="title d-flex justify-content-between align-items-center">
                  <h2 className="mb-lg-4 mt-lg-3">Dog Hub Frienly Pet</h2>
                  <span className="fs-3"><i className="bi bi-star"></i></span>
                </div>
                <div className="des">
                  <h4>Description</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque cumque eligendi beatae optio ex quod assumenda minus ab perspiciatis, sit, doloribus tenetur, repellendus tempora soluta. Officiis soluta unde similique esse?</p>
                </div>
              </div>
            </div>
            <div className="col-lg col-12">
              <div className="p-5">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default KeeperDetail