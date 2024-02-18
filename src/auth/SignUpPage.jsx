import { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';

const Signup = () => {
    const navigate = useNavigate();
    const roles = ["Owner", "Keeper"]
    const [selectedRole, setSelectedRole] = useState(null)

    const handleRoleSelection = (role) => {
        setSelectedRole(role)
    }

    const handleContinue = () => {
        const roleLowerCase = selectedRole.toLowerCase()
        navigate(`/at3/signup/${roleLowerCase}`, { replace: true })
    }
    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },  }}>
                    {/* <div className="d-flex justify-content-center align-items-center">
                        <img src="/assets/cat.png" alt="" width={50} />
                    </div> */}
                  <h4 className="fw-bold text-center mb-5 mt-3">
                    Select Your Role
                  </h4>
                    <div className="role-list">
                        {roles.map((role, index) => (
                            <div key={index} className={`select-role ${selectedRole === role ? 'active' : ''} col-xl-6 col-md-6 col-6 px-2`} onClick={() => handleRoleSelection(role)}>
                                <div className='card text-center'>
                                    <div className="card-body">
                                        <div>
                                            {role === "Keeper" ? <StoreIcon className="fs-1" /> : <PersonIcon className="fs-1" />}
                                            <h5 className=''>{role}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="button-continue">
                        <div onClick={handleContinue} className="btn btn-primary px-5">Continue</div>
                    </div>
                    {/* <div className="col d-flex justify-content-center font mb-4">
                        <Link
                            className="btn btn-primary"
                            to="/at3/signup/owner"
                        >
                            Owner Sign up
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-center mb-4">
                        <Link
                            className="btn btn-primary"
                            to="/at3/signup/keeper"
                        >
                            Keeper Sign up
                        </Link>
                    </div> */}
                </Paper>
            </Container>
        </>
    );
};

export default Signup;
