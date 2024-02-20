import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container">
    <div className="text-center mt-5">   
        <h1>404 - Not Found</h1>
            <Link className='btn btn-outline-primary' to="/at3/"><span>BACK TO HOME PAGE</span></Link>
    </div>
</div>
  )
}

export default NotFound