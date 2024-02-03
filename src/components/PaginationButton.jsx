import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

function PaginationButton() {
  return (
    <div className="d-flex justify-content-end align-items-center h-100 gap-3">
      <Button  className="prev-icon">
        <ArrowBackIosNewIcon fontSize='small' color='inherit' />
      </Button>
      <Button  className="next-icon">
        <ArrowForwardIosIcon  fontSize='small' />
      </Button>
    </div>
  )
}

export default PaginationButton