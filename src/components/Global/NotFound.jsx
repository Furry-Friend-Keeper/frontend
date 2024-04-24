import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from 'rsuite';
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';

function NotFound() {
  return (
    <div className="container">
      <div className="error-page">
        <div className="item">
          <img src={`${import.meta.env.VITE_PROJECT_URL}404.svg`} alt="" />
          <div className="text">
            <h1 className="error-page-code">404</h1>
            <p className="error-page-title">Oops… You just found an error page</p>
            <p className="error-page-subtitle text-muted ">
              We are sorry but the page you are looking for was not found
            </p>
            <div className='blue-btn'>
              <IconButton icon={<ArrowLeftLine />} appearance="primary" href="/at3/">
                Take me home
              </IconButton>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default NotFound