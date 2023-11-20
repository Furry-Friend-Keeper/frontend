import Navbar from './layouts/Navbar.jsx';
import { useState } from 'react';
function App() {
  const [contents, setContents] = useState([
    {
      id : 1,
      image : "/assets/cat.jpg",
      title : "Item 1",
      distance : "2 km",
      rating : "4.5",
      favorite : false,
    },
    {
      id : 2,
      image : "/assets/dog.jpg",
      title : "Item 2",
      distance : "1.5 km",
      rating : "4.2",
      favorite : false
    },
    {
      id : 3,
      image : "/assets/cat.jpg",
      title : "Item 3",
      distance : "3 km",
      rating : "4.8",
      favorite : false
    },
    {
      id : 4,
      image : "/assets/dogs.jpg",
      title : "Item 4",
      distance : "0.5 km",
      rating : "3.9",
      favorite : false
    },
    {
      id : 5,
      image : "/assets/cat.jpg",
      title : "Item 5",
      distance : "2.8 km",
      rating : "4.6",
      favorite : false
    }

  ])

  const [search, setSearch] = useState(contents)
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    const filteredContent = contents.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearch(filteredContent);
  }

  const handleFavorite = (index) => {
    const updateContents = [...contents]
    updateContents[index].favorite = !updateContents[index].favorite
    setContents(updateContents);
  } 
  

  return (
    <>
    {/* Navbar */}
    <Navbar />
    {/* title */}
    {/* <div className="container-fluid g-0">
      <div className="pages-main bg-white">
        <div className="image-wrapper">
          <img src="/assets/cover.jpeg" alt="Pet Cover" width="100%" height="auto" />  
        </div>
        <div className="keeper-title">
          <div className="col-md-6 col-sm-12 keeper-text">
            <h3>Furry Friend Keeper</h3>
            <h3>เว็ปไซต์สำหรับรับ-ฝากดูแลสัตว์เลี้ยง</h3>
            <p>ในปัจจุบันมีผู้คนนิยมเลี้ยงสัตว์เลี้ยงมากขึ้น ไม่ว่าจะเป็น หมา แมว หนู ไปจนถึง สัตว ์Exotic (สัตว์แปลก) ต่างๆกันมากขึ้น ซึ่งคนที่มีสัตว์เลี้ยงก็ไม่สามารถดูแลได้ตลอดเวลา 
              จึงต้องการคนที่คอยดูแลสัตว์เลี้ยงของพวกเขาในระหว่างที่พวกเขาไม่สามารถดูแลเองได้ ซึ่ง Furry Friend Keeper จะเป็น Web Application ที่เปิดโอกาสให้เจ้าของสัตว์ 
              เลี้ยงเข้ามาค้นหาผู้ที่สามารถดูแลสัตว์เลี้ยงของพวกเขา</p>
              <div>
                <a href="/login" className="btn btn-outline-danger me-2">เริ่มต้นใช้งาน</a>
                <a href="/signup" className="btn btn-outline-warning">สมัครใช้งาน</a>
              </div> 
          </div>
        </div>
      </div>
    </div> */}
    {/* Content */}
      <div className="container">
        <div className="col-sm-9 col-md-6 col-lg-4 col-xl-3">
        <form className="p-2 d-flex" role="search" onSubmit={handleSearch}>
          <input className="form-control me-2" type="search" placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} aria-label="Search"  />
          <button className="btn fw-semibold btn-primary" type="submit">Search</button>
        </form>
        </div>
        <div className="container p-2">
          <div className="row">
            {search.map((item, index) => (
              <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch my-2 justify-content-center">
                <div className="keeper card shadow-lg text-center border-0">
                  <img src={item.image} alt={item.title} />
                  <div className="card-body ">
                    <div className="d-flex justify-content-center">
                      <h5><a href="/keepers">{item.title}</a></h5>
                      <div className="ms-2">
                        <span className="favorite" onClick={() => handleFavorite(index)} >
                          { item.favorite ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
                        </span>
                      </div>
                    </div>
                    <span>distance: {item.distance} | rating: {item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
            {search.length === 0 && <div>Not Found</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
