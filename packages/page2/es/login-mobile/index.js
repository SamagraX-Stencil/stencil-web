import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useState } from 'react';
import farmer from './assets/farmer.jpeg';
import { Box, CircularProgress, TextField, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useUiConfig, useColorPalates } from 'stencil-hooks';
import { LanguagePicker } from 'stencil-molecule';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var LoginMobile = function LoginMobile() {
  var _theme$primary;
  var config = useUiConfig('component', 'loginMobilePage');
  var theme = useColorPalates();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 1),
    loading = _useState2[0];
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
  var handleInput = useCallback(function (e) {
    var reg = /^\d{0,10}$/;
    var maxLength = 10;
    var errorMessage = 'Please enter a valid mobile number';
    var inputValue = e.target.value;
    var numericInput = inputValue.replace(/[^0-9]/g, '');

    // Update the input value with the numeric value
    setInput(numericInput);

    // Allow up to 10 digits for Phone Number

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
    }
    setErrorMessage(errorMessage);
  }, []);
  return /*#__PURE__*/_jsxs("div", {
    style: {
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      color: '#333',
      margin: 'auto',
      backgroundColor: '#fff',
      minHeight: '80vh',
      position: 'relative',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsx("div", {
      style: {
        position: 'absolute',
        top: '10px',
        left: 'calc(100% - 85px - 10px)'
      },
      children: /*#__PURE__*/_jsx(LanguagePicker, {})
    }), /*#__PURE__*/_jsx("div", {
      style: {
        position: 'absolute',
        top: '50%',
        // Adjust this value to move the container up or down
        width: '100%',
        bottom: '0',
        backgroundColor: '#fff',
        borderTopLeftRadius: '30% 5%',
        // Adjust the curvature
        borderTopRightRadius: '30% 5%',
        overflow: 'hidden' // Ensures content aligns with the curved edges
      },
      children: /*#__PURE__*/_jsxs("div", {
        className: "p-4",
        children: [/*#__PURE__*/_jsx("p", {
          style: {
            marginTop: '24px',
            fontSize: '22px',
            fontWeight: 400,
            color: '#51586B'
          },
          children: (config === null || config === void 0 ? void 0 : config.title) || 'कृपया अपना मोबाइल नंबर बताएं'
        }), /*#__PURE__*/_jsxs("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '25vh'
          },
          children: [/*#__PURE__*/_jsx(Box, {
            component: "form",
            sx: {
              mt: 1
            },
            children: /*#__PURE__*/_jsx(TextField, {
              type: "text",
              margin: "normal",
              error: !valid,
              required: true,
              fullWidth: true,
              value: input,
              helperText: !valid ? errorMessage : '',
              onChange: handleInput,
              label: (config === null || config === void 0 ? void 0 : config.placeholder) || 'मोबाइल नंबर',
              name: 'phone',
              autoComplete: 'phone',
              autoFocus: true
            })
          }), /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(Box, {
              sx: {
                mt: 1
              },
              children: /*#__PURE__*/_jsx(Button, {
                type: "submit",
                fullWidth: true,
                variant: "contained",
                endIcon: /*#__PURE__*/_jsx(ArrowForward, {}),
                sx: {
                  textTransform: 'none',
                  mt: 3,
                  mb: 4,
                  p: 1,
                  background: (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.dark,
                  height: '60px',
                  borderRadius: '10px'
                },
                style: {
                  fontSize: '18px',
                  fontWeight: 500
                }
                // onClick={handleLogin}
                ,
                disabled: !valid || loading,
                children: loading ? /*#__PURE__*/_jsx(CircularProgress, {
                  size: 24,
                  color: "inherit"
                }) : /*#__PURE__*/_jsx(_Fragment, {
                  children: (config === null || config === void 0 ? void 0 : config.btnText) || 'ओटीपी भेजा'
                })
              })
            })
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("main", {
      children: /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx("img", {
          src: (config === null || config === void 0 ? void 0 : config.backgroundImage) || farmer,
          alt: "Farmer with vegetables",
          style: {
            maxWidth: '100%',
            height: 'auto'
          }
        })
      })
    })]
  });
};
export default LoginMobile;