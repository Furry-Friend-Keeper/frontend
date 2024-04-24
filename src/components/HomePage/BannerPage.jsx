import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

function BannerPage() {
    const customWidth = import.meta.env.VITE_CUSTOM_WIDTH
    return (
        // <Container maxWidth={customWidth} className="banner">
        <div className="container-fluid banner g-0">
            <div className="page-banner">
                <div className="keeper-title">
                    <h1 className="banner-content">Furry Friend Keeper</h1>
                    <div className="col-md-6 col-sm-12 keeper-text mx-3">
                        {/* <div className="image-banner">
                  <img src="https://i.imgur.com/OT4Bijh.jpg" alt="" />
              </div> */}
                        {/* <div className="title">
                  <h1>FFK</h1>
                  <h3>Furry Friend Keeper</h3>
                  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ducimus, tempora maiores dolorum cumque officiis beatae doloremque, accusamus nemo similique qui optio! A, maxime natus veniam beatae sunt adipisci quod?</div>
              </div> */}
                    </div>
                </div>
            </div>
        </div>
        // </Container>
    );
}

export default BannerPage;
