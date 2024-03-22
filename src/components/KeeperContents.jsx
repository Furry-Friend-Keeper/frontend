import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {Rating, Stack, Chip} from '@mui/material/';
import StarIcon from '@mui/icons-material/Star';
import { Pagination, Toggle, SelectPicker, TagPicker, InputNumber } from 'rsuite';
import { Rate } from "rsuite";

function KeeperContents(props) {
    const { search } = props;

    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState(import.meta.env.VITE_LIMIT_PAGINATION);
    const [filteredData, setFilteredData] = useState([]);

    const limitOptions = [5, 10, 20];
    const size = 'md';
    const maxButtons= 5;
    const total = search.length;
    const layout = ['limit','-', 'pager', 'skip'];

        // Simulate fetching or filtering data based on the search
        useEffect(() => {
            // In a real application, you would fetch/filter data from a server
            const startIndex = (activePage - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedData = search.slice(startIndex, endIndex);
            setFilteredData(paginatedData);
        }, [activePage, limit, search]);

        useEffect(() => {

            // for(let data of search) {
            //     console.log(data)
            // }

            // if ('geolocation' in navigator) {
            //     navigator.geolocation.getCurrentPosition(
            //       (position) => {
            //         const { latitude, longitude } = position.coords;
            //         const currentLocation = L.latLng(latitude, longitude);
            //         console.log(currentLocation) 
            //       },
            //       (error) => {
            //         console.error('Error getting current location:', error.message);
            //       }
            //     );
            //   }
            
            // const instance = L.Routing.control({
            //     waypoints: [
            //       latlng,
            //       currentLocation
            //     ], 
            //   })
  
            //   instance.on('routesfound', function(e) {
            //     const routes = e.routes;
            //     const summary = routes[0].summary;
            //     // Get total distance of the route in meters
            //     const distance = summary.totalDistance;
            
            //     // Optionally, convert the distance to kilometers and log it
            //     const distanceInKm = (distance / 1000).toFixed(2);
            //     console.log(`Distance: ${distance} meters (${distanceInKm} km)`);
            // });
  
        },[search])
    
        const handlePageChange = (page) => {
            setActivePage(page);
        };
    
        const handleLimitChange = (newLimit) => {
            setLimit(newLimit);
            setActivePage(1); // Reset to first page when limit changes
        };

  return (
    <>
        {filteredData.map((item, index) => {
            return ( 
            <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-4 my-2 px-2 ">
                <div className="keeper card bg-shadow text-center border-0">
                {item.img ? <Link to={`/at3/keepers/${item.id}`}><img src={import.meta.env.VITE_KEEPER_IMAGE + item.id + "/" + item.img} alt={item.title} /></Link> 
                : <Link to={`/at3/keepers/${item.id}`}><ImageNotSupportedIcon className="notImage" /></Link>}
                <div className="card-body keeper-radius">
                    <div className="d-flex justify-content-center mb-2">
                        <h5><Link to={`/at3/keepers/${item.id}`} className="text-black" >{item.name}</Link></h5>
                    </div>
                    <div>
                    <Rate className='mb-2' value={item.reviewStars} allowHalf size="sm" color="yellow" readOnly/>
                    {/* <Rating className='mb-2' name="half-rating-read" value={item.reviewStars} precision={1} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /> */}
                    <Stack direction="row" spacing={1} className="justify-content-center d-block">
                            {item.categories && 
                                item.categories.map(
                                    (category, index) => 
                                    (
                                        <Chip
                                            className="keeper-tag"
                                            key={index}
                                            label={category}
                                            size='small'
                                        />
                                    )
                                )
                                }
                        </Stack>
                    </div>
                </div>
                </div>
            </div>
        )})}
        <div className='w-100 mt-4'>
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                layout={layout}
                size={size}
                total={total}
                limit={limit}
                limitOptions={limitOptions}
                maxButtons={maxButtons}
                activePage={activePage}
                onChangePage={handlePageChange}
                onChangeLimit={handleLimitChange}
            />
        </div>
    </>
  )
}

export default KeeperContents