import { useState, useRef, useEffect } from 'react';
import BannerPage from '../components/BannerPage';
import KeeperCategory from '../components/KeeperCategory';
import KeeperContents from '../components/KeeperContents';
import axios from 'axios';
import { Input, InputGroup, Dropdown } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import CloseIcon from '@rsuite/icons/Close';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

function Home() {  

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    fetchData();
  }, []);

  const [search, setSearch] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const handleSearchInput = (value) => {
    setSearchInput(value);
  }
  
  const handleClearSearch = () => {
    setSearchInput('');
  }
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const filter = apiData.filter((item) => {
      if (selected.length > 0) {
        if (item.categories !== null) return item.categories.some((category) => selected.includes(category));
      } else return true;
      
    });
    setSearch(filter)
    if (filter.length > 0) {
      setLoading(true);
    }
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

  const handleSearch = (event) => {
    if(event.key === "Enter") {      
      // event.preventDefault()
      // const filteredContent = contents.filter((item) =>
      //   item.title.toLowerCase().includes(searchInput.toLowerCase())
      // );
      // setSearch(filteredContent);
      const filteredBySearch = apiData.filter((item) =>
      item.name?.toLowerCase().includes(searchInput?.toLowerCase())
    );
  
    const filteredByCategory = filteredBySearch.filter((item) => {
      if (selected.length > 0) {
        if (item.categories !== null) {
          return item.categories.some((category) => selected.includes(category));
        }
      } else {
          return item
        }
    });
    setSearch(filteredByCategory);
    }
  }

  // const handleFavorite = (index) => {
  //   const updateContents = [...apiData]
  //   updateContents[index].favorite = !updateContents[index].favorite
  //   setApiData(updateContents);
  // } 


  const [petCategories, setPetCategories] = useState([]);

  useEffect(() => {
    PetKeeperCategories()
},[])

const PetKeeperCategories = async() => {
    await axios.get(import.meta.env.VITE_KEEPER_CATEGORIES).then((res)=> {
        const response = res.data;
        setPetCategories(response)
    }).catch((err) => {
        console.log(err)
    })
}

const [sortAscending, setSortAscending] = useState("");
const [sortTitles, setSortTitles] = useState("Sort:Rating")
const SortReviewStar = (isSort) => {
  setSortAscending(isSort)
  setSortTitles(isSort === "Des" ? "High to Low" : "Low to High")
  const sortStar = [...search].sort((a, b) => isSort==="Des" ? b.reviewStars - a.reviewStars : a.reviewStars - b.reviewStars)
  setSearch(sortStar);
}

const selectRatingRange = (range) => {
  const ratingRange = apiData.filter((val) => val.reviewStars >= range)
  setSearch(ratingRange)
  setSortTitles("Sort:Rating")
  setSortAscending("")
}

  return (
    <>
    {/* title */}
    <BannerPage />
    {/* Content */}
      <div className="container-sm pt-3">
          <div className="col-sm-12 col-md-9 col-lg-9 col-xl-8">
        </div>
        <div className="container p-2 mb-5 mt-3">
          <div className="keeper-panel">
            {/* KeeperCategory */}
              <KeeperCategory petCategories={petCategories} selected={selected} handleCategory={handleCategory} selectRatingRange={selectRatingRange} />
            <div className="keeper-list">
              <div className="d-flex justify-content-between mb-3">
                <div className="keeper-list-filter d-flex">
                  <InputGroup inside className='search-keeper'>
                      <InputGroup.Button>
                        <SearchIcon />
                      </InputGroup.Button>
                      <Input
                        placeholder='Search by name'
                        value={searchInput}
                        onChange={handleSearchInput}
                        onKeyUp={handleSearch}
                      />
                      {searchInput &&<InputGroup.Button>
                        <CloseIcon onClick={handleClearSearch} />
                      </InputGroup.Button>}
                    </InputGroup>
                    <div className="sort-list">
                      <Dropdown title={sortTitles} activeKey={sortAscending}>
                        <Dropdown.Item onClick={() => SortReviewStar("Des")} eventKey="Des">High to Low</Dropdown.Item>
                        <Dropdown.Item onClick={() => SortReviewStar("Asc")} eventKey="Asc">Low to High</Dropdown.Item>
                      </Dropdown>
                    </div>
                </div>
                {/* <div className='keeper-list-pagination'>
                  page
                </div> */}
              </div>
              <div className='row'>

                {!loading ?
                <div className='grid-autofill'>
                  {Array.from(new Array(6)).map((item, index) => (
                    <Box key={index}> {/* Add a unique key prop here */}
                      <Skeleton variant="rectangular" width={250} height={150} />
                      <Box sx={{ pt: 0.5 }}>
                        <Skeleton width={250} />
                        <Skeleton width={250} />
                      </Box>
                    </Box>
                  ))}
                </div>
                : loading && search.length > 0 ? <KeeperContents search={search} /> : <div className='text-center fw-bold mt-5 fs-4'>NO PET KEEPER FOUND</div>}
                {/* <KeeperContents search={search} /> */}
              </div>
                {/* <PaginationButton /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
