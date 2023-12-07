import { useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom'
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import Rating from '@mui/material/Rating';

import {Search, StyledInputBase,  ClearButton, SearchIconWrapper} from '../components/SearchButton';
import TitlePage from '../components/TitlePage';
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
 
    useEffect(() => {
      const filteredApiData = apiData.filter((item) =>{
        return item.name?.toLowerCase().includes(searchInput?.toLowerCase())
      });
      setSearch(filteredApiData);
    },[searchInput, apiData])

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
    {/* <div>
      {apiData && (
        <ul>
          {apiData.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>  */}
    {/* title */}
    <TitlePage />
    {/* Content */}
      <div className="container-sm pt-3">
          <div className="col-sm-12 col-md-9 col-lg-9 col-xl-8">
        <div className="row">
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
                  <PetCategory />
            
            </div>
            {/* <button className="btn fw-semibold btn-primary" type="reset">Reset</button> */}
          {/* </form> */}
        </div>
        {/* <PaginationButton handleNextSlide={handleNextSlide} handlePrevSlide={handlePrevSlide} validateNextSlide={validateNextSlide} validatePrevSlide={validatePrevSlide} /> */}

        </div>
        <div className="container p-2 mb-5">
          {search.length > 0 && 
          <div className="keeper-list row">
              {/* <Slider ref={slider} className="slider" {...slider_main}> */}
                {search.map((item, index) => {
                  return (
                  <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-3 my-2 px-2 ">
                    <div className="keeper card bg-shadow text-center border-0">
                      <img src={item.image} alt={item.title} />
                      <div className="card-body ">
                        <div className="d-flex justify-content-center">
                          <h5><Link to={`/keepers/${item.petkeeperId}`} className="text-black" >{item.name}</Link></h5>
                          <div className="ms-2">
                            <span className="favorite" onClick={() => handleFavorite(index)} >
                              { item.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                            </span>
                          </div>
                        </div>
                        <span>distance: {item.distance} </span>
                        <div>
                          <Rating name="half-rating-read" defaultValue={item.reviewStars} precision={0.1} readOnly />
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
