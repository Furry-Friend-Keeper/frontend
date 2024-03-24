import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Unauthorized() {
    const { userInfo } = useSelector((state) => state.auth)  
  return (
    <div className="container">
        <div className="text-center mt-5">   
            <h1>401 - Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
              {userInfo.role === "PetKeeper" ?
                <Link className='btn btn-outline-primary mt-4' to={`/at3/keeper-edit/${userInfo?.id}`}><span>BACK TO MY STORE</span></Link>
                :
                <Link className='btn btn-outline-primary mt-4' to={`/at3/owner/${userInfo?.id}`}><span>BACK TO MY PROFILE</span></Link>
              }
        </div>
    </div>
  )
}

export default Unauthorized