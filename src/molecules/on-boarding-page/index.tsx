import  { useState } from 'react'
import OnBoarding from '../on-boarding'
import LoginPage from '../login-mobile-aadhar-page/index';
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from '@mui/material';
import OtpPage from '../otp-page';
import FeedbackPage from '../feedback';
const OnBoardingPage = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [steps,setSteps]=useState(3);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
  return (
    <div>
        <div style={{display:'flex' ,justifyContent:'space-between'}}>
        <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === steps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
        </div>
        <OnBoarding containerStyle={{ width: '100%' }} variant="dots" activeStep={activeStep} steps={steps}>
          {activeStep===0 && <LoginPage />}
          {activeStep===1 && <OtpPage />}
          {activeStep===2 && <FeedbackPage />}
        </OnBoarding>
    </div>
  )
}

export default OnBoardingPage