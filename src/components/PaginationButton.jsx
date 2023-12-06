import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

function PaginationButton({ handlePrevSlide, handleNextSlide, validatePrevSlide, validateNextSlide }) {
  return (
    <div className="col-sm-3 col-md-6 col-lg-8 col-xl-9">
    <div className="d-flex justify-content-end align-items-center h-100 px-3 gap-3">
      <Button  onClick={handlePrevSlide} disabled={validatePrevSlide()} className="prev-icon">
        <ArrowBackIosNewIcon fontSize='small' color='inherit' />
      </Button>
      <Button onClick={handleNextSlide} disabled={validateNextSlide()} className="next-icon">
        <ArrowForwardIosIcon  fontSize='small' />
      </Button>
    </div>
  </div>
  )
}

export default PaginationButton