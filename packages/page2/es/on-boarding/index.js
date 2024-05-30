import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React from 'react';
import { MobileStepper } from '@mui/material';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var OnBoarding = function OnBoarding(_ref) {
  var _ref$containerStyle = _ref.containerStyle,
    containerStyle = _ref$containerStyle === void 0 ? {} : _ref$containerStyle,
    children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'dots' : _ref$variant,
    _ref$activeStep = _ref.activeStep,
    activeStep = _ref$activeStep === void 0 ? 0 : _ref$activeStep,
    _ref$steps = _ref.steps,
    steps = _ref$steps === void 0 ? 3 : _ref$steps;
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("div", {
      style: _objectSpread({
        height: '80vh',
        maxHeight: '80vh',
        overflowY: 'scroll'
      }, containerStyle),
      children: children
    }), /*#__PURE__*/_jsx(MobileStepper, {
      variant: variant,
      steps: steps,
      position: "static",
      activeStep: activeStep,
      sx: {
        flexGrow: 1
      },
      nextButton: /*#__PURE__*/_jsx("div", {
        style: {
          width: '10px'
        }
      }),
      backButton: /*#__PURE__*/_jsx("div", {
        style: {
          width: '10px'
        }
      })
    })]
  });
};
export default OnBoarding;