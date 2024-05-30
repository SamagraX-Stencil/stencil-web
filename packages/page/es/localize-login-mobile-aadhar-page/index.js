import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { useBotAppColorPalates } from 'stencil-hooks';
import { useLocalization } from 'stencil-hooks';
import { useRouter } from 'next/navigation';
import { useBotConfig } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var LocalLoginMobileAadharPage = function LocalLoginMobileAadharPage() {
  var _theme$primary, _theme$primary2, _theme$primary3, _theme$primary4;
  var config = useBotConfig('component', 'loginMobileAadharPage');
  var loginWithAadhaar = config.loginWithAadhaar,
    showSignUp = config.showSignUp,
    showAlternateSignIn = config.showAlternateSignIn,
    logo = config.logo,
    showLogo = config.showLogo,
    showSplitedView = config.showSplitedView;
  var t = useLocalization();
  var router = useRouter();
  var _useState = useState(loginWithAadhaar),
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
  var theme = useBotAppColorPalates();
  var handleInput = useCallback(function (e) {
    var reg;
    var errorMessage = '';
    var inputValue = e.target.value;
    var numericInput = inputValue.replace(/[^0-9]/g, '');
    if (isAadharClicked) {
      reg = /^\d{12}$/; // Allow up to 12 digits for Aadhar
      errorMessage = 'Please enter a valid Aadhar number';
    } else {
      reg = /^\d{10}$/; // Allow any number of digits for Phone Number
      errorMessage = 'Please enter a valid mobile number';
    }
    var isValid = reg.test(numericInput);
    setValid(isValid);
    setInput(numericInput); // Update input directly

    if (!isValid) {
      setErrorMessage(errorMessage);
    }
  }, [isAadharClicked]);
  var handleAadharClick = useCallback(function () {
    setIsAadharClicked(function (prop) {
      return !prop;
    });
  }, []);
  var handleRegistration = function handleRegistration() {
    // Register User
  };
  var handleLogin = useCallback(function (e) {
    e.preventDefault();
    if (isAadharClicked && input.length === 12 || !isAadharClicked && input.length === 10) {
      console.log('hello');
      setLoading(true);
      if (navigator.onLine) {
        fetch("".concat(process.env.NEXT_PUBLIC_USER_SERVICE_URL, "/api/sendOTP?phone=").concat(input), {
          method: 'GET'
        }).then(function (response) {
          setLoading(false);
          if (response.status === 200) {
            // localStorage.setItem('phoneNumber',input)
            var url = "/otp?state=".concat(input);
            router.push(url);

            // router.push({ pathname: '/otp', query: { state: input } })
          } else {
            setLoading(false);
            toast.error("".concat(t('message.otp_not_sent')));
          }
        }).catch(function (err) {
          setLoading(false);
          toast.error(err.message);
        });
      } else {
        toast.error("".concat(t('label.no_internet')));
      }
    }
  }, [isAadharClicked, input]);
  console.log('debug login:', {
    config: config
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/_jsxs("div", {
      className: styles.main,
      children: [showSplitedView && /*#__PURE__*/_jsx("div", {
        className: styles.leftColumn,
        style: {
          background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
        }
      }), /*#__PURE__*/_jsxs("div", {
        className: styles.rightColumn,
        children: [showSignUp && /*#__PURE__*/_jsx("div", {
          className: styles.topSection,
          children: /*#__PURE__*/_jsxs("div", {
            className: styles.register,
            children: [/*#__PURE__*/_jsx(Typography, {
              variant: "body2",
              color: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
              className: styles.registerText,
              children: t('message.not_register_yet')
            }), /*#__PURE__*/_jsx(Typography, {
              onClick: handleRegistration,
              variant: "button",
              sx: {
                textTransform: 'none',
                color: theme.primary.main,
                fontWeight: 'bold',
                cursor: 'pointer'
              },
              children: t('message.register_at_krushak')
            })]
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: styles.form,
          children: [/*#__PURE__*/_jsx(Typography, {
            component: "h1",
            variant: "h4",
            fontWeight: 'bold',
            textAlign: "center",
            width: "100%",
            color: (theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main) || 'black',
            dangerouslySetInnerHTML: {
              __html: t('label.subtitle')
            }
          }), showLogo && logo && /*#__PURE__*/_jsx("img", {
            src: config === null || config === void 0 ? void 0 : config.logo,
            alt: "loginPageImg",
            height: config.logoheight || '280px',
            width: config.logowidth || '280px'
          }), /*#__PURE__*/_jsxs(Box, {
            component: "form",
            onSubmit: handleLogin,
            sx: {
              mt: 1,
              width: '100%'
            },
            children: [/*#__PURE__*/_jsx(TextField, {
              margin: "normal",
              error: !valid,
              required: true,
              fullWidth: true,
              value: input,
              helperText: !valid ? errorMessage : '',
              onChange: handleInput,
              label: isAadharClicked ? "Enter Aadhar Number" : t('message.enter_mobile'),
              name: isAadharClicked ? 'aadhar' : 'phone',
              autoComplete: isAadharClicked ? 'aadhar' : 'phone',
              autoFocus: true
            }),
            /*#__PURE__*/
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            _jsx(Button, {
              fullWidth: true,
              variant: "contained",
              sx: {
                textTransform: 'none',
                mt: 3,
                mb: 4,
                p: 1,
                background: (theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main) || 'black',
                borderRadius: '10px'
              },
              onClick: handleLogin,
              disabled: !valid || loading,
              children: loading ? /*#__PURE__*/_jsx(CircularProgress, {
                size: 24,
                color: "inherit"
              }) : "".concat(t('label.continue'))
            })]
          }), showAlternateSignIn && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(Typography, {
              variant: "caption",
              textAlign: "center",
              width: "90%",
              color: theme.primary.main,
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
                color: theme.primary.light,
                fontWeight: 'bold',
                cursor: 'pointer'
              },
              children: !isAadharClicked ? "Aadhar Number" : t('message.enter_mobile')
            })]
          })]
        })]
      })]
    })]
  });
};
export default LocalLoginMobileAadharPage;