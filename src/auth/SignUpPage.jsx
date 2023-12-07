import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },  }}>
                    <div className="d-flex justify-content-center align-items-center">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main',}}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </div>
                    <Typography component="h1" variant="h5" align="center" mb={3}>
                    Sign up
                    </Typography>
                    <div className="col d-flex justify-content-center font mb-4">
                        <Link
                            className="btn fw-semibold btn-primary"
                            to="/at3/signup/owner"
                        >
                            Owner Sign up
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-center mb-4">
                        <Link
                            className="btn fw-semibold btn-primary"
                            to="/at3/signup/keeper"
                        >
                            Keeper Sign up
                        </Link>
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default Signup;
