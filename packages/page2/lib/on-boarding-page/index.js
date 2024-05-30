"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _onBoarding = _interopRequireDefault(require("../on-boarding"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _KeyboardArrowLeft = _interopRequireDefault(require("@mui/icons-material/KeyboardArrowLeft"));
var _KeyboardArrowRight = _interopRequireDefault(require("@mui/icons-material/KeyboardArrowRight"));
var _material = require("@mui/material");
var _welcomePage = _interopRequireDefault(require("../welcome-page"));
var _userTypeSelector = _interopRequireDefault(require("../user-type-selector"));
var _loginMobile = _interopRequireDefault(require("../login-mobile"));
var _optionSelector = _interopRequireDefault(require("../option-selector"));
var _otpMobile = _interopRequireDefault(require("../otp-mobile"));
var _dashboard = _interopRequireDefault(require("../dashboard"));
var _jsxRuntime = require("react/jsx-runtime");
var OnBoardingPage = function OnBoardingPage() {
  var theme = (0, _material.useTheme)();
  var _useState = (0, _react.useState)(-1),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    activeStep = _useState2[0],
    setActiveStep = _useState2[1];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var _useState3 = (0, _react.useState)(5),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 1),
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Button.default, {
        size: "small",
        onClick: handleBack,
        disabled: activeStep === -1,
        children: [theme.direction === 'rtl' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowRight.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowLeft.default, {}), "Back"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Button.default, {
        size: "small",
        onClick: handleNext,
        disabled: activeStep === steps - 1,
        children: ["Next", theme.direction === 'rtl' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowLeft.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowRight.default, {})]
      })]
    }), activeStep === -1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_welcomePage.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_onBoarding.default, {
      containerStyle: {
        width: '100%'
      },
      variant: "dots",
      activeStep: activeStep,
      steps: steps,
      children: [activeStep === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_userTypeSelector.default, {}), activeStep === 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_loginMobile.default, {}), activeStep === 2 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_otpMobile.default, {}), activeStep === 3 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_optionSelector.default, {}), activeStep === 4 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_dashboard.default, {})]
    })]
  });
};
var _default = exports.default = OnBoardingPage;