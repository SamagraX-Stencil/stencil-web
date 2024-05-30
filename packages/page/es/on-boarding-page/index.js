import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState } from 'react';
import OnBoarding from '../on-boarding';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material';
import Welcome from '../welcome-page';
import UserTypeSelector from '../user-type-selector';
import LoginMobile from '../login-mobile';
import OptionSelector from '../option-selector';
import OtpMobile from '../otp-mobile';
import Dashboard from '../dashboard';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var OnBoardingPage = function OnBoardingPage() {
  var theme = useTheme();
  var _useState = useState(-1),
    _useState2 = _slicedToArray(_useState, 2),
    activeStep = _useState2[0],
    setActiveStep = _useState2[1];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var _useState3 = useState(5),
    _useState4 = _slicedToArray(_useState3, 1),
    steps = _useState4[0];
  var handleNext = function handleNext() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep + 1;
    });
  };
  var handleBack = function handleBack() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep - 1;
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      children: [/*#__PURE__*/_jsxs(Button, {
        size: "small",
        onClick: handleBack,
        disabled: activeStep === -1,
        children: [theme.direction === 'rtl' ? /*#__PURE__*/_jsx(KeyboardArrowRight, {}) : /*#__PURE__*/_jsx(KeyboardArrowLeft, {}), "Back"]
      }), /*#__PURE__*/_jsxs(Button, {
        size: "small",
        onClick: handleNext,
        disabled: activeStep === steps - 1,
        children: ["Next", theme.direction === 'rtl' ? /*#__PURE__*/_jsx(KeyboardArrowLeft, {}) : /*#__PURE__*/_jsx(KeyboardArrowRight, {})]
      })]
    }), activeStep === -1 ? /*#__PURE__*/_jsx(Welcome, {}) : /*#__PURE__*/_jsxs(OnBoarding, {
      containerStyle: {
        width: '100%'
      },
      variant: "dots",
      activeStep: activeStep,
      steps: steps,
      children: [activeStep === 0 && /*#__PURE__*/_jsx(UserTypeSelector, {}), activeStep === 1 && /*#__PURE__*/_jsx(LoginMobile, {}), activeStep === 2 && /*#__PURE__*/_jsx(OtpMobile, {}), activeStep === 3 && /*#__PURE__*/_jsx(OptionSelector, {}), activeStep === 4 && /*#__PURE__*/_jsx(Dashboard, {})]
    })]
  });
};
export default OnBoardingPage;