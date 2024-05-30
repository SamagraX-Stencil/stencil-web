import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { useUiConfig, useColorPalates } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var LoginMobileAadharPage = function LoginMobileAadharPage() {
  var _theme$primary, _theme$primary2, _theme$primary3, _theme$primary4, _theme$primary5, _theme$primary6, _theme$primary7;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isAadharClicked = _useState2[0],
    setIsAadharClicked = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    input = _useState4[0],
    setInput = _useState4[1];
  var _useState5 = useState(true),
    _useState6 = _slicedToArray(_useState5, 2),
    valid = _useState6[0],
    setValid = _useState6[1];
  var _useState7 = useState(''),
    _useState8 = _slicedToArray(_useState7, 2),
    errorMessage = _useState8[0],
    setErrorMessage = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    loading = _useState10[0],
    setLoading = _useState10[1];
  var theme = useColorPalates();
  var config = useUiConfig('component', 'loginMobileAadharPage');
  var handleInput = useCallback(function (e) {
    var reg;
    var maxLength;
    var errorMessage = '';
    var inputValue = e.target.value;
    var numericInput = inputValue.replace(/[^0-9]/g, '');

    // Update the input value with the numeric value
    setInput(numericInput);
    if (isAadharClicked) {
      reg = /^\d{0,12}$/; // Allow up to 12 digits for Aadhar
      maxLength = 12;
      errorMessage = 'Please enter a valid Aadhar number';
    } else {
      reg = /^\d{0,10}$/; // Allow up to 10 digits for Phone Number
      maxLength = 10;
      errorMessage = 'Please enter a valid mobile number';
    }
    var isValid = reg.test(numericInput);
    setValid(isValid);
    if (isValid || numericInput === '') {
      setInput(numericInput);
    } else {
      // Truncate input if it exceeds maximum length
      setInput(numericInput.slice(0, maxLength));
    }
    if (numericInput.length > maxLength) {
      // If input length exceeds maximum allowed digits
      setValid(false);
      setInput(numericInput.slice(0, maxLength));
      errorMessage = isAadharClicked ? "Please enter a valid Aadhar number" : "Please enter a valid mobile number";
    }
    setErrorMessage(errorMessage);
  }, [isAadharClicked]);
  var handleAadharClick = useCallback(function () {
    setIsAadharClicked(function (prop) {
      return !prop;
    });
  }, []);
  var handleRegistration = function handleRegistration() {
    // Register User
  };
  var handleLogin = function handleLogin(e) {
    e.preventDefault();
    if (isAadharClicked && input.length === 12 || !isAadharClicked && input.length === 10) {
      setLoading(true);
      setTimeout(function () {
        setLoading(false);
        toast.success("Successfully sent OTP");
      }, 2000);
    } else {
      console.log(input.length);
      toast.error("Please enter a valid input");
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/_jsxs("div", {
      className: styles.main,
      children: [/*#__PURE__*/_jsx("div", {
        className: styles.leftColumn,
        style: {
          background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
        },
        children: /*#__PURE__*/_jsx("div", {
          className: styles.logo,
          children: /*#__PURE__*/_jsx("img", {
            src: config.logo,
            width: 150,
            height: 40,
            alt: ""
          })
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: styles.rightColumn,
        children: [/*#__PURE__*/_jsx("div", {
          className: styles.topSection,
          children: /*#__PURE__*/_jsxs("div", {
            className: styles.register,
            children: [/*#__PURE__*/_jsx(Typography, {
              variant: "body2",
              color: (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
              className: styles.registerText,
              children: "Don\u2019t have an account?"
            }), config.showSignUp && /*#__PURE__*/_jsx(Typography, {
              onClick: handleRegistration,
              variant: "button",
              sx: {
                textTransform: 'none',
                color: (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main,
                fontWeight: 'bold',
                cursor: 'pointer'
              },
              children: "Register Now"
            })]
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: styles.form,
          children: [/*#__PURE__*/_jsx(Typography, {
            component: "h1",
            variant: "h4",
            textAlign: "left",
            width: "90%",
            color: (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main,
            children: config.title
          }), /*#__PURE__*/_jsxs(Box, {
            component: "form",
            onSubmit: handleLogin,
            sx: {
              mt: 1,
              width: '90%'
            },
            children: [/*#__PURE__*/_jsx(TextField, {
              type: "text",
              margin: "normal",
              error: !valid,
              required: true,
              fullWidth: true,
              value: input,
              helperText: !valid ? errorMessage : '',
              onChange: handleInput,
              label: isAadharClicked ? "Enter Aadhar Number" : "Enter Phone Number",
              name: isAadharClicked ? 'aadhar' : 'phone',
              autoComplete: isAadharClicked ? 'aadhar' : 'phone',
              autoFocus: true
            }),
            /*#__PURE__*/
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            _jsx(Button, {
              type: "submit",
              fullWidth: true,
              variant: "contained",
              sx: {
                textTransform: 'none',
                mt: 3,
                mb: 4,
                p: 1,
                background: (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.main,
                borderRadius: '10px'
              },
              onClick: handleLogin,
              disabled: !valid || loading,
              children: loading ? /*#__PURE__*/_jsx(CircularProgress, {
                size: 24,
                color: "inherit"
              }) : 'Login'
            })]
          }), /*#__PURE__*/_jsx(Typography, {
            variant: "caption",
            textAlign: "center",
            width: "90%",
            color: (_theme$primary6 = theme.primary) === null || _theme$primary6 === void 0 ? void 0 : _theme$primary6.main,
            sx: {
              mb: 1
            },
            children: "or Login using"
          }), /*#__PURE__*/_jsx(Typography, {
            onClick: handleAadharClick,
            width: "90%",
            textAlign: "center",
            variant: "button",
            sx: {
              textTransform: 'none',
              textDecoration: 'underline',
              color: (_theme$primary7 = theme.primary) === null || _theme$primary7 === void 0 ? void 0 : _theme$primary7.main,
              fontWeight: 'bold',
              cursor: 'pointer'
            },
            children: !isAadharClicked ? "Aadhar Number" : "Phone Number"
          })]
        })]
      })]
    })]
  });
};
export default LoginMobileAadharPage;