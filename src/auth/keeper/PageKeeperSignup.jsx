import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

import KeeperSignup from './KeeperSignup';
import KeeperDetail from './UploadImage';
import Map from './Map';
import { Bolt } from '@mui/icons-material';

  
  const steps = ['KeeperSignup', 'Keeper Detail', 'Map'];
  
  function getStepContent(step) {
    switch (step) {
        case 0:
          return <KeeperSignup/>;
        case 1:
          return <KeeperDetail />;
        default:
          return <Map />;
      }
  }

export default function KeeperSignUp() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
  
    return (
      <React.Fragment>
        {/* <CssBaseline /> */}
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <div className="d-flex justify-content-center align-items-center">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main',}}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </div>
            <div className='mx-2'>
              <Typography component="h1" variant="h5" align="left" fontWeight="bold">
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