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
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

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
 
  // useEffect(() => {
  //   const filteredBySearch = apiData.filter((item) =>
  //     item.name?.toLowerCase().includes(searchInput?.toLowerCase())
  //   );
  
  //   const filteredByCategory = filteredBySearch.filter((item) => {
  //     if (selected.length > 0) {
  //       if (item.categories !== null) {
  //         return item.categories.some((category) => selected.includes(category));
  //       }
  //     } else {
  //         return item
  //       }
  //   });
  //   console.log(search)
  //   setSearch(filteredByCategory);
  // }, [searchInput, selected, apiData]);

  useEffect(() => {
    const filter = apiData.filter((item) => {
      if (selected.length > 0) {
        if (item.categories !== null) return item.categories.some((category) => selected.includes(category));
      } else return true;

    });
    setSearch(filter)
  },[selected, apiData])

  const handleCategory = (category) => {
    setSelected((prevSelected) => {
      if(prevSelected.includes(category)){
        return prevSelected.filter((cate) => cate !== category)
      } else {
        return [...prevSelected, category]
      }
    })
    // const category = apiData.filter((item) => {
    //   if (selected.length > 0) {
    //     if (item.categories !== null) {
    //       return item.categories.some((category) => selected.includes(category));
    //     }
    //   } else {
    //       return item
    //     }
    // });

  }

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


  const [petCategories, setPetCategories] = useState([]);

  useEffect(() => {
    PetKeeperCategories()
},[])

const PetKeeperCategories = async() => {
    await axios.get(import.meta.env.VITE_KEEPER_CATEGORIES).then((res)=> {
        const response = res.data;
        console.log(response)
        setPetCategories(response)
    }).catch((err) => {
        console.log(err)
    })
}

const [sortAscending, setSortAscending] = useState(true);
const SortReviewStar = () => {
  setSortAscending((prevSortAscending) => !prevSortAscending);
  const sortStar = [...search].sort((a, b) => sortAscending ? a.reviewStars - b.reviewStars : b.reviewStars - a.reviewStars)
  setSearch(sortStar);
}

  return (
    <>
    {/* title */}
    {/* <TitlePage /> */}
    <BannerPage />
    {/* Content */}
      <div className="container-sm pt-3">
          <div className="col-sm-12 col-md-9 col-lg-9 col-xl-8">
        {/* <div className="row ">
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
        </div> */}
        {/* <PaginationButton handleNextSlide={handleNextSlide} handlePrevSlide={handlePrevSlide} validateNextSlide={validateNextSlide} validatePrevSlide={validatePrevSlide} /> */}

        </div>
        <div className="container p-2 mb-5 mt-3">
          <div className="keeper-panel">
            <div className="filter-panel">
              <div className="pet-category">
                <h3>Category</h3>
                <div className="pet-category-list">
                    {petCategories.map((category) => (
                      <FormGroup key={category.id}>
                        <FormControlLabel control={<Checkbox 
                        checked={selected.includes(category.name)}
                        onChange={() => handleCategory(category.name)} />} label={category.name} />
                      </FormGroup>
                    ))}
                </div>
              </div>
            </div>
            <div className="keeper-list row">
              <div className="d-flex justify-content-between mb-3">
                  <div className="sort-list">
                      <h4>Sort</h4>
                      <button onClick={() => SortReviewStar()} className={`btn bg-white  mx-3 ${sortAscending ? "" : "sort-active"}`} type='button'>Rating</button>
                  </div>
                {/* <PaginationButton /> */}
              </div>
            {search.map((item, index) => {
              console.log(item)
                    return ( 
                    <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-4 my-2 px-2 ">
                      <div className="keeper card bg-shadow text-center border-0">
                        {item.img ? <img src={import.meta.env.VITE_KEEPER_IMAGE + item.id + "/" + item.img} alt={item.title} /> : <ImageNotSupportedIcon className="notImage" />}
                        <div className="card-body keeper-radius">
                          <div className="d-flex justify-content-center">
                            <h5><Link to={`/at3/keepers/${item.id}`} className="text-black" >{item.name}</Link></h5>
                          </div>
                          <div>
                            <Rating name="half-rating-read" value={item.reviewStars} precision={1} readOnly />
                          <Stack direction="row" spacing={1} className="justify-content-center keeper-tag">
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
            </div>
          </div>
          {/* {search.length > 0 && 
          <div className="keeper-list row">
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
          </div>}
          {search.length === 0 && 
          <div className="no-results alert alert-info mt-3" role="alert">
            No results found.
          </div>} */}
        </div>
      </div>
    </>
  )
}

export default Home
