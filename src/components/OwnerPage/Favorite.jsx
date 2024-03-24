import { useState, useEffect } from "react";
import axios from "axios";
import { Rating, Stack, Chip } from "@mui/material/";
import { Link } from "react-router-dom";

const Favorite = () => {
    return (
        <>
            <div className="my-2 px-2 ">
                <div className="keeper card bg-shadow text-center border-0 favorite-keeper">
                    <div className="card-body keeper-radius">
                        <div className="d-flex justify-content-center">
                            <h5>
                                <Link
                                    to={`/at3/keepers/`}
                                    className="text-black"
                                >
                                    srs
                                </Link>
                            </h5>
                        </div>
                        <div>
                            <Rating
                                name="half-rating-read"
                                precision={1}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-2 px-2 ">
                <div className="keeper card bg-shadow text-center border-0 favorite-keeper">
                    <div className="card-body keeper-radius">
                        <div className="d-flex justify-content-center">
                            <h5>
                                <Link
                                    to={`/at3/keepers/`}
                                    className="text-black"
                                >
                                    srs
                                </Link>
                            </h5>
                        </div>
                        <div>
                            <Rating
                                name="half-rating-read"
                                precision={1}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-2 px-2 ">
                <div className="keeper card bg-shadow text-center border-0 favorite-keeper">
                    <div className="card-body keeper-radius">
                        <div className="d-flex justify-content-center">
                            <h5>
                                <Link
                                    to={`/at3/keepers/`}
                                    className="text-black"
                                >
                                    srs
                                </Link>
                            </h5>
                        </div>
                        <div>
                            <Rating
                                name="half-rating-read"
                                precision={1}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-2 px-2 ">
                <div className="keeper card bg-shadow text-center border-0 favorite-keeper">
                    <div className="card-body keeper-radius">
                        <div className="d-flex justify-content-center">
                            <h5>
                                <Link
                                    to={`/at3/keepers/`}
                                    className="text-black"
                                >
                                    srs
                                </Link>
                            </h5>
                        </div>
                        <div>
                            <Rating
                                name="half-rating-read"
                                precision={1}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Favorite;
