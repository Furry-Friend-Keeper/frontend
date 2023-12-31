import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-light">
    <div className="container py-4">
        <div className="row text-center">
            <div className="col-lg-6">
                <h5>Furry Friend Keeper</h5>
                <p>Website for animal lover</p>
            </div>
            <div className="col-lg-6">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    {/* <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li> */}
                </ul>
            </div>
        </div>
    </div>
    <div className="text-center p-3">
        &copy; 2023 Furry Friend Keeper
    </div>
</footer>
  )
}

export default Footer