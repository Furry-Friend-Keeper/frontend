import React from 'react'
import { Link } from 'react-router-dom'
function BannerPage() {
  return (
    <div className="container banner">
    <div className="page-banner">
      <div className="keeper-title">
        <div className="col-md-6 col-sm-12 keeper-text mx-3">
            <div className="image-banner">
                <img src="/assets/banner.png" alt="" />
            </div>
            <div className="title">
                <h1>FFK</h1>
                <h3>Furry Friend Keeper</h3>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ducimus, tempora maiores dolorum cumque officiis beatae doloremque, accusamus nemo similique qui optio! A, maxime natus veniam beatae sunt adipisci quod?</div>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BannerPage