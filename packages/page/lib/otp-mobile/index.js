"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _ArrowForward = _interopRequireDefault(require("@mui/icons-material/ArrowForward"));
var _material = require("@mui/material");
var _iconsMaterial = require("@mui/icons-material");
var _hooks = require("@repo/hooks");
var _molecules = require("@repo/molecules");
var _jsxRuntime = require("react/jsx-runtime");
/* eslint-disable @typescript-eslint/no-explicit-any */

var OtpMobile = function OtpMobile() {
  var _theme$primary;
  var theme = (0, _hooks.useColorPalates)();
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    otp = _useState2[0],
    setOtp = _useState2[1];
  var config = (0, _hooks.useUiConfig)('component', 'otpMobilePage');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Container, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-flex",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
        "aria-label": "fingerprint",
        style: {
          borderRadius: '12px',
          background: '',
          border: '1px solid #E8ECF4'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ArrowBackIosNewRounded, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "text-center w-100",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            lineHeight: '40px',
            fontWeight: 600,
            fontSize: '24px',
            color: (config === null || config === void 0 ? void 0 : config.topTextColor) || theme.primary.dark
          },
          children: config === null || config === void 0 ? void 0 : config.topText
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "text-center mt-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '65vh'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            color: '#51586B',
            fontSize: '24px',
            marginTop: '20%',
            fontWeight: 400
          },
          children: config === null || config === void 0 ? void 0 : config.centerText
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
          className: "text-center",
          sx: {
            mt: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_molecules.OTPInput, {
            separator: (config === null || config === void 0 ? void 0 : config.otpSeparator) || /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                width: '10px'
              }
            }),
            value: otp,
            onChange: setOtp,
            length: (config === null || config === void 0 ? void 0 : config.otpLength) || 4
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
            sx: {
              mt: 1
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              type: "submit",
              fullWidth: true,
              variant: "contained",
              endIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowForward.default, {}),
              sx: {
                textTransform: 'none',
                mt: 3,
                mb: 4,
                p: 1,
                borderRadius: '10px',
                background: (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.dark,
                height: '60px'
              },
              children: config === null || config === void 0 ? void 0 : config.btnText
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "mt-2 d-flex justify-content-center",
              children: [config === null || config === void 0 ? void 0 : config.helpingText1, " \xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Link, {
                component: "button",
                variant: "body2",
                onClick: function onClick() {},
                children: config === null || config === void 0 ? void 0 : config.helpingText2
              })]
            })]
          })
        })]
      })
    })]
  });
};
var _default = exports.default = OtpMobile;