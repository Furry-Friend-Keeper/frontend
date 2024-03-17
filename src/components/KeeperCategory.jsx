import React from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup, Rating, Stack, Chip  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function KeeperCategory(props) {
    const { petCategories, selected, handleCategory, selectRatingRange } = props;
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
            <div className='d-flex mb-2 pointer' onClick={() => selectRatingRange(5)}>
              <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={5} size='medium' readOnly />
            </div>
            <div className='d-flex mb-2 pointer' onClick={() => selectRatingRange(4)}>
              <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={4} size='medium' readOnly /> 
              <span className='my-auto ms-2'>more</span>
            </div>
            <div className='d-flex mb-2 pointer' onClick={() => selectRatingRange(3)}>
              <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={3} size='medium' readOnly /> 
              <span className='my-auto ms-2'>more</span>
            </div>
            <div className='d-flex mb-2 pointer' onClick={() => selectRatingRange(2)}>
              <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={2} size='medium' readOnly /> 
              <span className='my-auto ms-2'>more</span>
            </div>
            <div className='d-flex mb-2 pointer' onClick={() => selectRatingRange(1)}>
              <Rating emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} defaultValue={1} size='medium' readOnly /> 
              <span className='my-auto ms-2'>more</span>
            </div>
          </div>
        </div>

    </div>
  )
}

export default KeeperCategory