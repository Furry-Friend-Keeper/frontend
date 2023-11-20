import Navbar from './layouts/Navbar.jsx';

function KeeperDetail() {


  return (
    <>
        <Navbar />
        <div className="container">
              <div className="wrapper">
                <div className="cover">
                  <img src="../public/assets/background.jpg" alt="background" />
                </div>
                <div className="profile-img">
                  <img src="../public/assets/dog.jpg" className="logo" />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col keeperpic">
                      <img src="../public/assets/dog.jpg" className="pic" />
                    </div>
                    <div className="col keeperpic">
                      <img src="../public/assets/dog.jpg" className="pic" />
                    </div>
                    <div className="col keeperpic">
                      <img src="../public/assets/dog.jpg" className="pic" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 keepercontact">
                  contact
                </div>
                <div className="row">
                  <div className="col-sm-8 keeperdetail fixed">
                    Detail
                  </div>
                  <div className="col-sm-4 keepermap">
                    map
                  </div>
                </div>
                {/* <div className="row justify-content-between">
                  <div className="col-sm-8 keeperreview">
                    dsds
                  </div>
                  <div className="col-sm-4 keeperrating">
                    <p>คะแนนความน่ารักของ Keeper</p>
                    <i className="bi bi-star-fill"></i>
                  </div>
                </div> */}
              </div>
            </div>
    </>
  )
}

export default KeeperDetail