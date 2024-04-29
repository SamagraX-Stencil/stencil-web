import { useState } from "react";
import OnBoarding from "../on-boarding";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material";
import AkaiLaunch from "../akai-launch-page";
import UserTypeSelector from "../user-type-selector";
import LoginMobile from "../login-mobile";
import OptionSelector from "../option-selector";
import WeatherStatus from "../weather-status";
import OtpMobile from "../otp-mobile";
import AkaiDashboard from "../akai-home";
const OnBoardingPage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(-1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [steps, setSteps] = useState(5);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      {activeStep=== steps - 1 &&  <WeatherStatus />}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={handleBack} disabled={activeStep === -1}>
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
    
      {activeStep === -1 ? (
        <AkaiLaunch />
      ) : (
        <OnBoarding
          containerStyle={{ width: "100%" }}
          variant="dots"
          activeStep={activeStep}
          steps={steps}
        >
          
          {activeStep === 0 && <UserTypeSelector />}
          {activeStep === 1 && <LoginMobile />}
          {activeStep === 2 && <OtpMobile />}
          {activeStep === 3 && <OptionSelector />}
          {activeStep === 4 && <AkaiDashboard />}
        </OnBoarding>
      )}
    </div>
  );
};

export default OnBoardingPage;
