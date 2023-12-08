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

import Information from './Information';
import KeeperDetail from './KeeperDetail';
import Map from './Map';

  
  const steps = ['Information', 'Keeper Detail', 'Map'];
  
  function getStepContent(step) {
    switch (step) {
        case 0:
          return <Information/>;
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
        <Container component="main" maxWidth="mb" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <div className="d-flex justify-content-center align-items-center">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main',}}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </div>
            <Typography component="h1" variant="h5" align="center">
              Sign up
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                All steps completed - you&apos;re finished
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
  
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </React.Fragment>
    );
  }