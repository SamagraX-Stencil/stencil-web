import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Container, IconButton, Link } from '@mui/material';
import { ArrowBackIosNewRounded } from '@mui/icons-material';
import { useUiConfig, useColorPalates } from '@repo/hooks';
import { OTPInput } from '@repo/molecules';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var OtpMobile = function OtpMobile() {
  var _theme$primary;
  var theme = useColorPalates();
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    otp = _useState2[0],
    setOtp = _useState2[1];
  var config = useUiConfig('component', 'otpMobilePage');
  return /*#__PURE__*/_jsxs(Container, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "d-flex",
      children: [/*#__PURE__*/_jsx(IconButton, {
        "aria-label": "fingerprint",
        style: {
          borderRadius: '12px',
          background: '',
          border: '1px solid #E8ECF4'
        },
        children: /*#__PURE__*/_jsx(ArrowBackIosNewRounded, {})
      }), /*#__PURE__*/_jsx("div", {
        className: "text-center w-100",
        children: /*#__PURE__*/_jsx("p", {
          style: {
            lineHeight: '40px',
            fontWeight: 600,
            fontSize: '24px',
            color: (config === null || config === void 0 ? void 0 : config.topTextColor) || theme.primary.dark
          },
          children: config === null || config === void 0 ? void 0 : config.topText
        })
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "text-center mt-3",
      children: /*#__PURE__*/_jsxs("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '65vh'
        },
        children: [/*#__PURE__*/_jsx("p", {
          style: {
            color: '#51586B',
            fontSize: '24px',
            marginTop: '20%',
            fontWeight: 400
          },
          children: config === null || config === void 0 ? void 0 : config.centerText
        }), /*#__PURE__*/_jsx(Box, {
          className: "text-center",
          sx: {
            mt: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          },
          children: /*#__PURE__*/_jsx(OTPInput, {
            separator: (config === null || config === void 0 ? void 0 : config.otpSeparator) || /*#__PURE__*/_jsx("span", {
              style: {
                width: '10px'
              }
            }),
            value: otp,
            onChange: setOtp,
            length: (config === null || config === void 0 ? void 0 : config.otpLength) || 4
          })
        }), /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsxs(Box, {
            sx: {
              mt: 1
            },
            children: [/*#__PURE__*/_jsx(Button, {
              type: "submit",
              fullWidth: true,
              variant: "contained",
              endIcon: /*#__PURE__*/_jsx(ArrowForwardIcon, {}),
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
            }), /*#__PURE__*/_jsxs("div", {
              className: "mt-2 d-flex justify-content-center",
              children: [config === null || config === void 0 ? void 0 : config.helpingText1, " \xA0", /*#__PURE__*/_jsx(Link, {
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
export default OtpMobile;