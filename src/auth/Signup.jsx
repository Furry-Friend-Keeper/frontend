import Navbar from "../layouts/Navbar";

const Signup = () => {
    return (
        <>
            <Navbar />
            <div className="container pt-3">
                <div className="row pt-3">
                    <div className="col d-flex justify-content-center font">
                        <a
                            className="btn fw-semibold btn-primary"
                            href="/signup/owner"
                        >
                            Owner Sign up
                        </a>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <a
                            className="btn fw-semibold btn-primary"
                            href="/signup/keeper"
                        >
                            Keeper Sign up
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
