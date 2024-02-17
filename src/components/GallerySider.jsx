import React from 'react'
import Slider from "react-slick";
import { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";

function GallerySider(props) {
    const { galleryData, id } = props
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);


    const slider_main = {
        asNavFor: slider2,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        nextArrow: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
            >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
        ),
        prevArrow: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
            >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
        ),
        afterChange: function (slick, nextSlide) {
            if (nextSlide === 0) {
                $(".slick-next").addClass("disabled");
            } else {
                $(".slick-next").removeClass("disabled");
            }
            if (nextSlide === slick.slideCount - 1) {
                $(".slick-prev").addClass("disabled");
            } else {
                $(".slick-prev").removeClass("disabled");
            }
        },
    };

    const slider_nav = {
        asNavFor: slider1,
        focusOnSelect: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        swipeToSlide: false,
        arrows: false,
        infinite: false,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
        ],
    };

  return (
    <>
    <div className="container pt-lg-4">
        <div className="carousel col-md-11">
            <div className="slider-for">
                {galleryData.length > 0 && 
                <Slider
                    className="slider"
                    ref={(slider) => setSlider1(slider)}
                    {...slider_main}
                >
                    {galleryData.map((gallery, index) => (
                        <img key={index} src={import.meta.env.VITE_KEEPER_IMAGE + id + "/gallery/" + gallery}/>
                    ))}
                </Slider>}
            </div>
            <div className="slider-nav">
                {galleryData.length > 0 && 
                <Slider
                    className="slider"
                    ref={(slider) => setSlider2(slider)}
                    {...slider_nav}
                >
                    {galleryData.map((gallery, index) => (
                        <img key={index} src={import.meta.env.VITE_KEEPER_IMAGE + id + "/gallery/" + gallery} />
                    ))}
                </Slider>}
            </div>
        </div>
    </div>
    </>
  )
}

export default GallerySider