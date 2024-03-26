import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {Rating, Stack, Chip} from '@mui/material/';
import StarIcon from '@mui/icons-material/Star';
import { Pagination } from 'rsuite';
import Skeleton from '@mui/material/Skeleton';
import L from 'leaflet';

function KeeperContents(props) {
    const { search } = props;
    const [distanceAll, setDistanceAll] = useState([])

    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState(parseInt(import.meta.env.VITE_LIMIT_PAGINATION));
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
            let abortController = new AbortController();
            let arrayDistance = []
        
            async function fetchCurrentLocation() {
                if ('geolocation' in navigator) {
                    return new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            position => resolve(L.latLng((position.coords.latitude).toFixed(4), (position.coords.longitude).toFixed(4))),
                            error => {
                                console.error('Error getting current location:', error.message);
                                reject(error);
                            },
                            { signal: abortController.signal }
                        );
                    });
                }
                return null;
            }

            async function calculateDistance(start, end) {
                const cacheKey = `${start.lat},${start.lng}-${end.lat},${end.lng}`;
                const cachedDistance = sessionStorage.getItem(cacheKey);
                if (cachedDistance) {
                    return parseFloat(cachedDistance);
                }
        
                const apiUrl = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`;
                try {
                    const response = await axios.get(apiUrl);
                    const distance = response.data.routes[0].distance;
                    sessionStorage.setItem(cacheKey, distance);
                    return distance;
                } catch (error) {
                    console.error('Error fetching data from OSRM:', error);
                    throw error;
                }
            }
        
            async function updateSearchWithDistances() {
                try {
                    const currentLocation = await fetchCurrentLocation();
                    if (currentLocation) {
                        const distancePromises = search.map(async (data) => {
                            if (data.map && data.map.length > 0) {
                                const [lat, lng] = data.map[0].split(',').map(Number);
                                const latlng = L.latLng(lat, lng);
                                try {
                                    const distance = await calculateDistance(latlng, currentLocation);
                                    const distanceKm = (distance / 1000).toFixed(2);
                                    // data.distance = (distance / 1000).toFixed(2);
                                    arrayDistance.push(distanceKm)
                                    if(arrayDistance.length % 3 === 0 ) {
                                        setDistanceAll([...arrayDistance])
                                        console.log(arrayDistance)
                                    }
                                    
                                } catch (error) {
                                    console.error('Error calculating distance for:', data, error);
                                    // data.distance = 'Error';
                                }
                            }
                        });
                        
                        await Promise.all(distancePromises)
                        .then(() => setDistanceAll(arrayDistance))
                        // console.log(arrayDistance)
                        // setFilteredData(search);
                    }
                } catch (error) {
                    console.error('Error in updating search with distances:', error);
                }
            }
        
            updateSearchWithDistances();
        
            return () => {
                abortController.abort();
            };
        }, []);
        
    
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
                <div className="keeper card bg-shadow text-center border-0 movedown-transition">
                {item.img ? <Link to={`/at3/keepers/${item.id}`}><img src={import.meta.env.VITE_KEEPER_IMAGE + item.id + "/" + item.img} alt={item.title} /></Link> 
                : <Link to={`/at3/keepers/${item.id}`}><ImageNotSupportedIcon className="notImage" /></Link>}
                <div className="card-body keeper-radius">
                    <div className="d-flex justify-content-center mb-2">
                        <h5><Link to={`/at3/keepers/${item.id}`} className="text-black" >{item.name}</Link></h5>
                    </div>
                    <div>
                    <Rating className='mb-2' name="half-rating-read" value={item.reviewStars} precision={1} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                    <Stack direction="row" spacing={1} className="justify-content-center d-block">
                            {item.categories && 
                                item.categories.map(
                                    (category, i) => 
                                    (
                                        <Chip
                                            className="keeper-tag"
                                            key={i}
                                            label={category}
                                            size='small'
                                        />
                                    )
                                )
                                }
                        </Stack>
                    </div>
                    <div className='d-flex'>
                        <span>Distance :</span>
                            {distanceAll[index] ? 
                        <span>
                            {distanceAll[index]}
                        </span>
                            :
                        <span>
                            <Skeleton width={50} />
                        </span>
                        }
                        {/* {distanceAll.length > 0 &&
                         distanceAll.map((distance, i) => (
                            <p key={i}>{distance}</p>
                        ))} */}
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