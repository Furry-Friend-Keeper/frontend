import React from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

function KeeperCategory(props) {
    const { petCategories, selected } = props;
  return (
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
  )
}

export default KeeperCategory