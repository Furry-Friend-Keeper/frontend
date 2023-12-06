import { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import Rating from '@mui/material/Rating';

import {Search, StyledInputBase,  ClearButton, SearchIconWrapper} from './components/SearchButton';
import TitlePage from './components/TitlePage';
import PaginationButton from './components/PaginationButton';

function Home() {
  const [contents, setContents] = useState([
    {
      id : 1,
      image : "/assets/cat.jpg",
      title : "Item 1",
      distance : "2 km",
      rating : "4.5",
      favorite : false,
    },
    {
      id : 2,
      image : "/assets/cover.jpeg",
      title : "Item 2",
      distance : "1.5 km",
      rating : "4.2",
      favorite : false
    },
    {
      id : 3,
      image : "/assets/cat.jpg",
      title : "Item 3",
      distance : "3 km",
      rating : "4.8",
      favorite : false
    },
    {
      id : 4,
      image : "/assets/dogs.jpg",
      title : "Item 4",
      distance : "0.5 km",
      rating : "3.9",
      favorite : false
    },
    {
      id : 5,
      image : "/assets/cat.jpg",
      title : "Item 5",
      distance : "2.8 km",
      rating : "4.6",
      favorite : false
    }

  ])

  const slider_main = {
    slidesToShow : 4,
    slidesToScroll : 1,
    infinite: false,
    arrows : false,
    draggable : false,
    afterChange: (current) => {
      setCurrentSlide(current);
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow : 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow : 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow : 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow : 1,
        }
      },
    ]
  }

  const slider = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [search, setSearch] = useState(contents)
  const [searchInput, setSearchInput] = useState('')

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  }
  
  const handleClearSearch = () => {
    setSearchInput('');
  }

  useEffect(() => {
    const filteredContent = contents.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearch(filteredContent);
  }
  ,[searchInput, contents])

  // const handleSearch = (event) => {
  //   event.preventDefault()
  //   const filteredContent = contents.filter((item) =>
  //     item.title.toLowerCase().includes(searchInput.toLowerCase())
  //   );
  //   setSearch(filteredContent);
  // }

  const handleFavorite = (index) => {
    const updateContents = [...contents]
    updateContents[index].favorite = !updateContents[index].favorite
    setContents(updateContents);
  } 

  const handlePrevSlide = () => {
    if (slider.current) {
      slider.current.slickPrev();
    }
  };

  const handleNextSlide = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const validatePrevSlide = () => {
    return currentSlide === 0
  }
  const validateNextSlide = () => {
    return currentSlide === search.length - slider_main.slidesToShow
  }
  
  return (
    <>

    {/* title */}
    <TitlePage />
    {/* Content */}
      <div className="container pt-3">
        <div className="row">
          <div className="col-sm-9 col-md-6 col-lg-4 col-xl-3">
          {/* <form className="px-3 d-flex" role="search" onSubmit={handleSearch}> */}
            <div className="search">

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchInput}
                  onChange={handleSearchInput}
                />
                {searchInput && (
                    <ClearButton onClick={handleClearSearch}>
                      <ClearIcon />
                    </ClearButton>
                  )}
              </Search>
            </div>
            {/* <button className="btn fw-semibold btn-primary" type="reset">Reset</button> */}
          {/* </form> */}
        </div>
        <PaginationButton handleNextSlide={handleNextSlide} handlePrevSlide={handlePrevSlide} validateNextSlide={validateNextSlide} validatePrevSlide={validatePrevSlide} />

        </div>
        <div className="container p-2">
          <div className="keeper-list row">
            {search.length > 0 && <Slider ref={slider} className="slider" {...slider_main}>
              {search.map((item, index) => (
                <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-3 my-2 d-flex justify-content-center align-items-stretch px-2">
                  <div className="keeper card bg-shadow text-center border-0">
                    <img src={item.image} alt={item.title} />
                    <div className="card-body ">
                      <div className="d-flex justify-content-center">
                        <h5><a href="/keepers">{item.title}</a></h5>
                        <div className="ms-2">
                          <span className="favorite" onClick={() => handleFavorite(index)} >
                            { item.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                          </span>
                        </div>
                      </div>
                      <span>distance: {item.distance} </span>
                      <div>
                        <Rating name="half-rating-read" defaultValue={item.rating} precision={0.1} readOnly />
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </Slider>}
            {search.length === 0 && 
            <div className="no-results alert alert-info mt-3" role="alert">
              No results found.
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
