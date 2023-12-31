import { useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom'
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import Rating from '@mui/material/Rating';
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import {Search, StyledInputBase,  ClearButton, SearchIconWrapper} from '../components/SearchButton';
import TitlePage from '../components/TitlePage';
import BannerPage from '../components/BannerPage';
import PaginationButton from '../components/PaginationButton';
import PetCategory from '../components/PetCategory';
import axios from 'axios';

function Home() {  

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_KEEPERS_ALL;
        await axios.get(apiUrl).then(response => {
          const data = response.data;
          setApiData(data)
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const [search, setSearch] = useState(apiData)
  const [searchInput, setSearchInput] = useState('')

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  }
  
  const handleClearSearch = () => {
    setSearchInput('');
  }
  const [selected, setSelected] = useState([]);
 
  useEffect(() => {
    let ischecked = []
    const filteredBySearch = apiData.filter((item) =>
      item.name?.toLowerCase().includes(searchInput?.toLowerCase())
    );
  
    const filteredByCategory = filteredBySearch.filter((item) => {
      if (selected.length > 0) {
        if (item.categories !== null) {
          for(const category of item.categories) {
            if (selected.includes(category)){
            ischecked.push(category)
            }
          }
          return item.categories.some((category) => selected.includes(category));
        }
      } else {
          return item
        }
    });
  
    setSearch(filteredByCategory);
    // console.log(filteredByCategory)
  }, [searchInput, selected, apiData]);


  // const handleSearch = (event) => {
  //   event.preventDefault()
  //   const filteredContent = contents.filter((item) =>
  //     item.title.toLowerCase().includes(searchInput.toLowerCase())
  //   );
  //   setSearch(filteredContent);
  // }

  const handleFavorite = (index) => {
    const updateContents = [...apiData]
    updateContents[index].favorite = !updateContents[index].favorite
    setApiData(updateContents);
  } 

  return (
    <>
    {/* title */}
    {/* <TitlePage /> */}
    <BannerPage />
    {/* Content */}
      <div className="container-sm pt-3">
          <div className="col-sm-12 col-md-9 col-lg-9 col-xl-8">
        <div className="row ">
          {/* <form className="px-3 d-flex" role="search" onSubmit={handleSearch}> */}
            <div className="search col-sm-12 col-md-6 col-lg-6 mt-3">
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
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 my-auto mt-3">
                  <PetCategory selected={selected} setSelected={setSelected} />
            
            </div>
            {/* <button className="btn fw-semibold btn-primary" type="reset">Reset</button> */}
          {/* </form> */}
        </div>
        {/* <PaginationButton handleNextSlide={handleNextSlide} handlePrevSlide={handlePrevSlide} validateNextSlide={validateNextSlide} validatePrevSlide={validatePrevSlide} /> */}

        </div>
        <div className="container p-2 mb-5 mt-3">
          {search.length > 0 && 
          <div className="keeper-list row">
              {/* <Slider ref={slider} className="slider" {...slider_main}> */}
                {search.map((item, index) => {
                  return (
                  <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-3 my-2 px-2 ">
                    <div className="keeper card bg-shadow text-center border-0">
                      {item.img ? <img src={import.meta.env.VITE_KEEPER_IMAGE + item.id + "/" + item.img} alt={item.title} /> : <ImageNotSupportedIcon className="notImage" />}
                      <div className="card-body border-top border-2 ">
                        <div className="d-flex justify-content-center">
                          <h5><Link to={`/at3/keepers/${item.id}`} className="text-black" >{item.name}</Link></h5>
                          <div className="ms-2">
                            <span className="favorite" onClick={() => handleFavorite(index)} >
                              { item.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                            </span>
                          </div>
                        </div>
                        {/* <span>distance: {item.distance} </span> */}
                        <div>
                          <Rating name="half-rating-read" defaultValue={item.reviewStars} precision={0.1} readOnly />
                        <Stack direction="row" spacing={1} className="justify-content-center">
                                {item.categories &&
                                    item.categories.map(
                                        (category, index) => (
                                            <Chip
                                                key={index}
                                                label={category}
                                                size='small'
                                            />
                                        )
                                    )}
                            </Stack>
                        </div>
                      </div>
                    </div>
                  </div>
              )})}
              {/* </Slider>} */}
          </div>}
          {search.length === 0 && 
          <div className="no-results alert alert-info mt-3" role="alert">
            No results found.
          </div>}
        </div>
      </div>
    </>
  )
}

export default Home
