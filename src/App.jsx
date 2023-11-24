import Navbar from './layouts/Navbar.jsx';
import { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function App() {
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

  const handleSearch = (event) => {
    event.preventDefault()
    const filteredContent = contents.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearch(filteredContent);
  }

  useEffect(() => {
    const filteredContent = contents.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearch(filteredContent);
  }
  ,[searchInput, contents])

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
  

  return (
    <>
    {/* Navbar */}
    <Navbar />
    {/* title */}
    {/* <div className="container-fluid g-0">
      <div className="pages-main bg-white">
        <div className="image-wrapper">
          <img src="/assets/cover.jpeg" alt="Pet Cover" width="100%" height="auto" />  
        </div>
        <div className="keeper-title">
          <div className="col-md-6 col-sm-12 keeper-text">
            <h3>Furry Friend Keeper</h3>
            <h3>เว็ปไซต์สำหรับรับ-ฝากดูแลสัตว์เลี้ยง</h3>
            <p>ในปัจจุบันมีผู้คนนิยมเลี้ยงสัตว์เลี้ยงมากขึ้น ไม่ว่าจะเป็น หมา แมว หนู ไปจนถึง สัตว ์Exotic (สัตว์แปลก) ต่างๆกันมากขึ้น ซึ่งคนที่มีสัตว์เลี้ยงก็ไม่สามารถดูแลได้ตลอดเวลา 
              จึงต้องการคนที่คอยดูแลสัตว์เลี้ยงของพวกเขาในระหว่างที่พวกเขาไม่สามารถดูแลเองได้ ซึ่ง Furry Friend Keeper จะเป็น Web Application ที่เปิดโอกาสให้เจ้าของสัตว์ 
              เลี้ยงเข้ามาค้นหาผู้ที่สามารถดูแลสัตว์เลี้ยงของพวกเขา</p>
              <div>
                <a href="/login" className="btn btn-outline-danger me-2">เริ่มต้นใช้งาน</a>
                <a href="/signup" className="btn btn-outline-warning">สมัครใช้งาน</a>
              </div> 
          </div>
        </div>
      </div>
    </div> */}
    {/* Content */}
      <div className="container pt-3">
        <div className="row">
        <div className="col-sm-9 col-md-6 col-lg-4 col-xl-3">
          {/* <form className="px-3 d-flex" role="search" onSubmit={handleSearch}> */}
          <div>

          <TextField className="px-3 w-100 search-keeper" id="outlined-search" type="search" label="Search"  value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
          sx={{ width: 600 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}  />
          </div>
            {/* <button className="btn fw-semibold btn-primary" type="reset">Reset</button> */}
          {/* </form> */}
        </div>
        <div className="col-sm-3 col-md-6 col-lg-8 col-xl-9">
          <div className="d-flex justify-content-end align-items-center h-100 px-3 gap-3">
            <Button  onClick={handlePrevSlide} disabled={currentSlide === 0} className="prev-icon">
              <ArrowBackIosNewIcon fontSize='small' color='inherit' />
            </Button>
            <Button onClick={handleNextSlide} disabled={currentSlide === search.length - slider_main.slidesToShow} className="next-icon">
              <ArrowForwardIosIcon  fontSize='small' />
            </Button>
           
          </div>
        </div>

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
                      <span>distance: {item.distance} | rating: {item.rating}</span>
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

export default App
