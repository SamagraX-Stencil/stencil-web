import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { OTPInput } from '@repo/molecules';
import { useColorPalates, useUiConfig } from '@repo/hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var OtpPage = function OtpPage() {
  var _theme$primary;
  var config = useUiConfig('component', 'otpPage');
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    otp = _useState2[0],
    setOtp = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    countdown = _useState6[0],
    setCountdown = _useState6[1];
  var theme = useColorPalates();
  var phNo = 9999999999; // update number here
  var handleLogin = useCallback(function (e) {
    e.preventDefault();
    if (otp.length === config.otpLength) {
      setLoading(true);
      setTimeout(function () {
        setLoading(false);
        toast.success("Successfully logged in");
      }, 2000);
    } else {
      toast.error("Please enter correct OTP");
    }
  }, [otp.length]);
  var resendOtp = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            try {
              setLoading(true);
              // Add api to resend otp here
              setLoading(false);
              setCountdown(config.resendOtpTimer);
              toast.success('Otp Sent Again');
            } catch (error) {
              setLoading(false);
              toast.error('Error Sending OTP');
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function resendOtp() {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function () {
    if (countdown > 0) {
      var timer = setTimeout(function () {
        return setCountdown(function (prevCountdown) {
          return prevCountdown - 1;
        });
      }, 1000);
      return function () {
        return clearTimeout(timer);
      };
    }
  }, [countdown]);
  useEffect(function () {
    return setCountdown(config.resendOtpTimer);
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/_jsxs("div", {
      className: styles.main,
      children: [config.showSplitedView && /*#__PURE__*/_jsx("div", {
        className: styles.leftColumn,
        style: {
          background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
        },
        children: config.showLogo && /*#__PURE__*/_jsx("div", {
          className: styles.logo,
          children: /*#__PURE__*/_jsx("img", {
            src: config.logo,
            width: 150,
            height: 40,
            alt: ""
          })
        })
      }), /*#__PURE__*/_jsx("div", {
        className: styles.rightColumn,
        children: /*#__PURE__*/_jsxs("div", {
          className: styles.form,
          children: [/*#__PURE__*/_jsx(Typography, {
            variant: "h4",
            textAlign: "center",
            width: "90%",
            color: "#1E232C",
            sx: {
              m: 2
            },
            children: config.title
          }), /*#__PURE__*/_jsx(Typography, {
            variant: "body2",
            textAlign: "left",
            width: "90%",
            color: "#838BA1",
            children: "Enter the verification code we just sent on your mobile number"
          }), /*#__PURE__*/_jsxs(Typography, {
            fontWeight: "bold",
            textAlign: "center",
            children: ["+91-", phNo]
          }), /*#__PURE__*/_jsxs(Box, {
            component: "form",
            onSubmit: handleLogin,
            sx: {
              mt: 1,
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            },
            children: [/*#__PURE__*/_jsx(Box, {
              sx: {
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              },
              children: /*#__PURE__*/_jsx(OTPInput, {
                separator: /*#__PURE__*/_jsx(_Fragment, {}),
                value: otp,
                onChange: setOtp,
                length: config.otpLength
              })
            }), /*#__PURE__*/_jsx("div", {
              style: {
                marginTop: '10px'
              },
              children: countdown > 0 ? /*#__PURE__*/_jsxs(Typography, {
                children: ["Please wait ", countdown, " seconds before resending OTP"]
              }) : /*#__PURE__*/_jsx(_Fragment, {
                children: /*#__PURE__*/_jsxs(Typography, {
                  variant: "body2",
                  align: "center",
                  color: "#838BA1",
                  children: ["Didn't receive the OTP? \xA0", /*#__PURE__*/_jsx("p", {
                    onClick: resendOtp,
                    style: {
                      color: theme.primary.main,
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    },
                    children: "Resend again"
                  })]
                })
              })
            }), /*#__PURE__*/_jsxs("div", {
              style: {
                marginTop: '10px',
                marginBottom: '10px',
                display: 'flex',
                gap: '10px',
                width: '100%'
              },
              children: [/*#__PURE__*/_jsx(Button, {
                variant: "contained",
                type: "button",
                sx: {
                  textTransform: 'none',
                  p: 1,
                  mt: 5,
                  mb: 4,
                  // background: config?.theme.secondaryColor.value,
                  background: '#000',
                  borderRadius: '10px',
                  width: '50%'
                },
                children: "Back"
              }), /*#__PURE__*/_jsx(Button, {
                type: "submit",
                variant: "contained",
                sx: {
                  textTransform: 'none',
                  mt: 5,
                  mb: 4,
                  p: 1,
                  background: theme.primary.main,
                  borderRadius: '10px',
                  width: '50%'
                },
                onClick: handleLogin,
                disabled: loading,
                children: loading ? /*#__PURE__*/_jsx(CircularProgress, {
                  size: 24,
                  color: "inherit"
                }) : 'Login'
              })]
            })]
          })]
        })
      })]
    })]
  });
};
export default OtpPage;