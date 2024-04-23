import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from 'rsuite';
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';
import { useSelector } from 'react-redux'

function Unauthorized() {
    const { userInfo } = useSelector((state) => state.auth)  
  return (
    <div className="container">
      <div className="error-page">
        <div className="item">
          <img src="./assets/403.svg" alt="" />
          <div className="text">
            <h1 className="error-page-code">403</h1>
            <p className="error-page-title">Oops… You just found an error page</p>
            <p className="error-page-subtitle text-muted ">
              The current page is unavailable or you do not have permission to access.
            </p>
            <div className='blue-btn'>
              {userInfo.role === "PetKeeper" ?
                <IconButton icon={<ArrowLeftLine />} appearance="primary" href={`/at3/keeper-edit/${userInfo?.id}`}><span>Back to my store</span></IconButton>
                :
                <IconButton icon={<ArrowLeftLine />} appearance="primary" href={`/at3/owner/${userInfo?.id}`}><span>Back to my profile</span></IconButton>
              }
            </div>
          </div>
        </div>
      </div>
      
        {/* <div className="text-center mt-5">   
            <h1>401 - Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
              {userInfo.role === "PetKeeper" ?
                <Link className='btn btn-outline-primary mt-4' to={`/at3/keeper-edit/${userInfo?.id}`}><span>BACK TO MY STORE</span></Link>
                :
                <Link className='btn btn-outline-primary mt-4' to={`/at3/owner/${userInfo?.id}`}><span>BACK TO MY PROFILE</span></Link>
              }
        </div> */}
    </div>
  )
}

export default Unauthorized