import React, { useState, useEffect } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Rating, Stack, Chip  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Button, ButtonGroup } from 'rsuite';
import axios from 'axios';
import { Rate } from "rsuite";

function KeeperCategory(props) {
    const { selected, handleCategory, selectRatingRange, ratingScore, resetFilter } = props;
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

  return (
    <div className="filter-panel">
        <div className="pet-category">
          <h3 className='pb-4 '>Categories</h3>
          {/* <h3 className='mb-4'>Filter by</h3> */}
        <div className="pet-category-list">
          {/* <h4>Category</h4> */}
          <div className="category-list">
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
        <div className="pet-rating">
          <h3 className='py-4'>Points</h3>
          {/* <h3 className='mb-4'>Filter by</h3> */}
          <div className="rating-range">
            <div className={`d-flex mb-2 pointer ${ratingScore === 5 ? 'rating-active' : ""}`} onClick={() => selectRatingRange(5)}>
              <Rate defaultValue={5} size="sm" color="yellow" readOnly/>
              {/* <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={5} size='medium' readOnly /> */}
            </div>
            <div className={`d-flex mb-2 pointer ${ratingScore === 4 ? 'rating-active' : ""}`} onClick={() => selectRatingRange(4)}>
              <Rate defaultValue={4} size="sm" color="yellow" readOnly/>
              {/* <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={4} size='medium' readOnly />  */}
              <span className='my-auto ms-2'>more</span>
            </div>
            <div className={`d-flex mb-2 pointer ${ratingScore === 3 ? 'rating-active' : ""}`} onClick={() => selectRatingRange(3)}>
              <Rate defaultValue={3} size="sm" color="yellow" readOnly/>
              {/* <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={3} size='medium' readOnly />  */}
              <span className='my-auto ms-2'>more</span>
            </div>
            <div className={`d-flex mb-2 pointer ${ratingScore === 2 ? 'rating-active' : ""}`} onClick={() => selectRatingRange(2)}>
              <Rate defaultValue={2} size="sm" color="yellow" readOnly/>
              {/* <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={2} size='medium' readOnly />  */}
              <span className='my-auto ms-2'>more</span>
            </div>
            <div className={`d-flex mb-2 pointer ${ratingScore === 1 ? 'rating-active' : ""}`} onClick={() => selectRatingRange(1)}>
              <Rate defaultValue={1} size="sm" color="yellow" readOnly/>
              {/* <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={1} size='medium' readOnly />  */}
              <span className='my-auto ms-2'>more</span>
            </div>
          </div>
        </div>
        <div className='blue-btn mt-4'>
              <Button appearance="primary" className='w-100 fs-6' onClick={resetFilter} >Reset Filter</Button>
        </div>
    </div>
  )
}

export default KeeperCategory