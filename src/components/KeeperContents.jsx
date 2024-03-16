import React from 'react'
import {Link} from 'react-router-dom'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {Rating, Stack, Chip} from '@mui/material/';

function KeeperContents(props) {
    const { search, petCategories } = props;

    const namesArray = petCategories.map(item => item.name) || [];

    // const displayTags = (item) => {
    //     if(namesArray.every((arr) => item.categories.includes(arr))){
    //           return ( 
    //           <Chip
    //             label="All"
    //             size='small'
    //              />)
    //     }else {
    //         // console.log(it)
    //         return item.categories.map((category, index) => (
    //         <Chip
    //             key={index}
    //             label={category}
    //             size='small'
    //         />
    //         ))
    //     }
    // }
  return (
    <>
        {search.map((item, index) => {
            return ( 
            <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-4 my-2 px-2 ">
                <div className="keeper card bg-shadow text-center border-0">
                {item.img ? <Link to={`/at3/keepers/${item.id}`}><img src={import.meta.env.VITE_KEEPER_IMAGE + item.id + "/" + item.img} alt={item.title} /></Link> 
                : <Link to={`/at3/keepers/${item.id}`}><ImageNotSupportedIcon className="notImage" /></Link>}
                <div className="card-body keeper-radius">
                    <div className="d-flex justify-content-center">
                    <h5><Link to={`/at3/keepers/${item.id}`} className="text-black" >{item.name}</Link></h5>
                    </div>
                    <div>
                    <Rating name="half-rating-read" value={item.reviewStars} precision={1} readOnly />
                    <Stack direction="row" spacing={1} className="justify-content-center d-block">
                            {item.categories && 
                            // displayTags(item)
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
    </>
  )
}

export default KeeperContents