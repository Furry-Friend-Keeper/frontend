import { useState, useRef, useEffect } from 'react';
import BannerPage from '../components/HomePage/BannerPage';
import KeeperCategory from '../components/HomePage/KeeperCategory';
import KeeperContents from '../components/HomePage/KeeperContents';
import axios from 'axios';
import { Input, InputGroup, Dropdown } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import CloseIcon from '@rsuite/icons/Close';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import { Container } from "@mui/material";

function Home() {  

  const [apiData, setApiData] = useState([]);
  const [ratingScore, setRatingScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selected, setSelected] = useState([]);
  const [sortAscending, setSortAscending] = useState("");
  const [sortTitles, setSortTitles] = useState("Rating")

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


  const handleSearchInput = (value) => {
    setSearchInput(value);
  }
  
  const handleClearSearch = () => {
    setSearchInput('');
  }

  useEffect(() => {
    const filter = apiData.filter((item) => 
    item.reviewStars >= ratingScore && selected.every((filter) =>  item.categories.includes(filter))
    );

    // console.log(filter)
    setSearch(filter)
    if (filter.length > 0) {
      setLoading(true);
    }
  },[selected, apiData, ratingScore])

  const handleCategory = (category) => {
    setSelected((prevSelected) => {
      if(prevSelected.includes(category)){
        return prevSelected.filter((cate) => cate !== category)
      } else {
        return [...prevSelected, category]
      }
    })

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


const SortReviewStar = (isSort) => {
  setSortAscending(isSort)
  setSortTitles(isSort === "Des" ? "High to Low" : "Low to High")
  const sortStar = [...search].sort((a, b) => isSort==="Des" ? b.reviewStars - a.reviewStars : a.reviewStars - b.reviewStars)
  setSearch(sortStar);
}

const selectRatingRange = (range) => {
  setRatingScore(range)
  const ratingRange = apiData.filter((val) => val.reviewStars >= range && selected.every((filter) =>  val.categories.includes(filter)))
  setSearch(ratingRange)
  setSortTitles("Rating")
  setSortAscending("")
}

const resetFilter = () => {
  setSortAscending("")
  setSortTitles("Rating")
  setRatingScore(0)
  setSelected([])
}

  return (
    <>
    {/* title */}
    <BannerPage />
    {/* Content */}
    <Container maxWidth="lg" className='my-5'>
      {/* <div className="container-sm pt-3"> */}
        {/* <div className="container p-2 mb-5 mt-3"> */}
          <div className="keeper-panel">
            {/* KeeperCategory */}
              <KeeperCategory 
                selected={selected} 
                handleCategory={handleCategory} 
                selectRatingRange={selectRatingRange} 
                ratingScore={ratingScore} 
                resetFilter={resetFilter} 
              />
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
        {/* </div> */}
      {/* </div> */}
    </Container>

    </>
  )
}

export default Home
