import Navbar from "../layouts/Navbar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

const Signup = () => {
    return (
        <>
            <Navbar />
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
                        <a
                            className="btn fw-semibold btn-primary"
                            href="/signup/owner"
                        >
                            Owner Sign up
                        </a>
                    </div>
                    <div className="col d-flex justify-content-center mb-4">
                        <a
                            className="btn fw-semibold btn-primary"
                            href="/signup/keeper"
                        >
                            Keeper Sign up
                        </a>
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default Signup;
