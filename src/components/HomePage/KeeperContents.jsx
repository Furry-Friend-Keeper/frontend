import React, { useState, useEffect, useMemo } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {Rating, Stack, Chip} from '@mui/material/';
import StarIcon from '@mui/icons-material/Star';
import { Pagination, Rate } from 'rsuite';
import Skeleton from '@mui/material/Skeleton';
import L from 'leaflet';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';

function KeeperContents(props) {
    const { search, distanceLookup } = props;
    // const [distanceAll, setDistanceAll] = useState([])
    const currentLocation = useSelector((state) => state?.location?.currentLocation);
    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState(parseInt(import.meta.env.VITE_LIMIT_PAGINATION));
    const [filteredData, setFilteredData] = useState([]);

    const limitOptions = [5, 10, 20];
    const size = 'md';
    const maxButtons= 5;
    const total = search.length;
    const layout = ['limit','-', 'pager', 'skip'];

        // Simulate fetching or filtering data based on the search
        // useEffect(() => {
        //     // In a real application, you would fetch/filter data from a server
        //     const startIndex = (activePage - 1) * limit;
        //     const endIndex = startIndex + limit;
        //     const paginatedData = search.slice(startIndex, endIndex);
        //     setFilteredData(paginatedData);
        // }, [activePage, limit, search]);

        // useEffect(() => {
        //     let isMounted = true; // For avoiding state update on unmounted component
        
        //     // async function fetchCurrentLocation() {
        //     //     if (!('geolocation' in navigator)) return null;
        
        //     //     return new Promise((resolve, reject) => {
        //     //         navigator.geolocation.getCurrentPosition(
        //     //             position => {
        //     //                 const location = L.latLng(
        //     //                     position.coords.latitude.toFixed(3),
        //     //                     position.coords.longitude.toFixed(3)
        //     //                 );
        //     //                 resolve(location);
        //     //             },
        //     //             error => {
        //     //                 console.error('Error getting current location:', error);
        //     //                 reject(error);
        //     //             }
        //     //         );
        //     //     });
        //     // }
        
        //     async function calculateDistance(start, end) {
        //         const cacheKey = `${start.lat.toFixed(4)},${start.lng.toFixed(4)}-${end.lat},${end.lng}`;
        //         const cachedDistance = sessionStorage.getItem(cacheKey);
        //         if (cachedDistance) return parseFloat(cachedDistance);
        
        //         const apiUrl = `http://router.project-osrm.org/route/v1/driving/${start.lng.toFixed(4)},${start.lat.toFixed(4)};${end.lng},${end.lat}?overview=false`;
        //         try {
        //             const response = await axios.get(apiUrl);
        //             const distance = response.data.routes[0].distance;
        //             sessionStorage.setItem(cacheKey, distance);
        //             return distance;
        //         } catch (error) {
        //             console.error('Error fetching data from OSRM:', error);
        //             throw error;
        //         }
        //     }
        
        //     async function updateSearchWithDistances() {
        //         // const currentLocation = await fetchCurrentLocation();
        //         if (!currentLocation) return;
        
        //         let batchDistances = [];
        //         for (const data of search) {
        //             if (data.map && data.map.length > 0) {
        //                 const [lat, lng] = data.map[0].split(',').map(Number);
        //                 const latlng = L.latLng(lat, lng);
        //                 const current = L.latLng(currentLocation.latitude, currentLocation.longitude);
        //                 try {
        //                     const distance = await calculateDistance(latlng, current);
        //                     const distanceKm = (distance / 1000).toFixed(2);
        //                     batchDistances.push({ id: data.id, distance: distanceKm });
        
        //                     if (batchDistances.length % 3 === 0) {
        //                         if (isMounted) {
        //                             setDistanceAll(prevDistances => [...prevDistances, ...batchDistances]);
        //                         }
        //                         // batchDistances = []; // Reset after updating
        //                     }
        //                 } catch (error) {
        //                     console.error('Error calculating distance for:', data, error);
        //                 }
        //             }
        //         }
        
        //         // For any remaining distances not yet pushed
        //         if (batchDistances.length > 0 && isMounted) {
        //             setDistanceAll(prevDistances => [...prevDistances, ...batchDistances]);
        //         }
        //     }
        
        //     updateSearchWithDistances();
        
        //     return () => {
        //         isMounted = false;
        //     };
        // }, [search]);
        
        //     // Pre-process distance data for quick lookup
        // const distanceLookup = useMemo(() => {
        //     return distanceAll.reduce((acc, distance) => {
        //         acc[distance.id] = distance.distance;
        //         return acc;
        //     }, {});
        // }, [distanceAll]);

        // Calculate the current page's items
        const paginatedItems = useMemo(() => {
            const startIndex = (activePage - 1) * limit;
            const endIndex = startIndex + limit;
            return search.slice(startIndex, endIndex);
        }, [activePage, limit, search]);

        const handlePageChange = (page) => {
            setActivePage(page);
        };
    
        const handleLimitChange = (newLimit) => {
            setLimit(newLimit);
            setActivePage(1); // Reset to first page when limit changes
        };

        // const [sortOrder, setSortOrder] = useState('asc'); // or 'desc' for descending

        // const sortedDistances = useMemo(() => {
        //     const sorted = [...distanceAll]; // Make a copy to avoid mutating the original state
        //     sorted.sort((a, b) => {
        //         const distanceA = parseFloat(a.distance);
        //         const distanceB = parseFloat(b.distance);

        //         return sortOrder === 'asc' ? distanceA - distanceB : distanceB - distanceA;
        //     });
        //     return sorted;
        // }, [distanceAll, sortOrder]);

  return (
    <>
        {paginatedItems.map((item, index) => {
             const distance = distanceLookup[item.id]
            return ( 
            <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-4 my-2 px-2 ">
                <div className="keeper card bg-shadow text-center border-0 movedown-transition">
                {item.img ? <Link to={`/at3/keepers/${item.id}`}><img src={import.meta.env.VITE_KEEPER_IMAGE + item.id + "/" + item.img} alt={item.title} /></Link> 
                : <Link to={`/at3/keepers/${item.id}`}><ImageNotSupportedIcon className="notImage" /></Link>}
                <div className="card-body keeper-radius keeeper-container">
                    <div className='keeeper-warpper'>
                    <div className='border-2 border-bottom-0 mb-2 '>
                        {distance ? 
                        <div className='distance-keeper d-flex justify-content-between align-items-center mb-2'>
                            <div className='d-flex align-items-end'>
                                <PlaceOutlinedIcon />
                                <p className='mt-0 fs-6'>{distance} Km.</p>
                            </div>
                            <div>
                                <FavoriteBorderIcon />
                            </div>
                        </div>
                            : 
                            <Skeleton className='mx-auto mt-2' width={100} />
                        }
                    </div>
                        <div className="d-flex justify-content-center mb-2">
                            <h5><Link to={`/at3/keepers/${item.id}`} className="text-black" >{item.name}</Link></h5>
                        </div>
                        <div>
                        <Rate className='mb-2' value={item.reviewStars} size="xs" color="yellow" readOnly />
                        {/* <Rating className='mb-2' name="half-rating-read" value={item.reviewStars} precision={1} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /> */}
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

                    </div>
                    {/* <div className='border-2 border-top mt-2'>
                        {distance ? 
                        <div className='d-flex justify-content-between align-items-center mt-2'>
                            <div className='distance-keeper d-flex'>
                                <PlaceIcon color='error' />
                                <p className='mt-0'><b>{distance} Km.</b></p>
                            </div>
                            <div>
                                <FavoriteBorderIcon />
                            </div>
                        </div>
                            : 
                            <Skeleton className='mx-auto mt-2' width={100} />
                        }
                    </div> */}
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