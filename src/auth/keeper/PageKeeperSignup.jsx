import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeeperSignup from './KeeperSignup';

export default function KeeperSignUp() {

    return (
      <React.Fragment>
        {/* <CssBaseline /> */}
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            {/* <div className="d-flex justify-content-center align-items-center">
              <img src="/assets/cat.png" alt="" width={50} />
            </div> */}
            <div className='mx-2'>
              <Typography component="h1" variant="h5" mt={3} align="left" fontWeight="bold">
                Pet Keeper Sign Up Form
              </Typography>
              <p>Please provide all required information to register your account with us</p>
            </div>
            <br />
            <React.Fragment>
              <KeeperSignup />
            </React.Fragment>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }