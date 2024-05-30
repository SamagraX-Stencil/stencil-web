"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));
var _reactHotToast = require("react-hot-toast");
var _stencilHooks = require("stencil-hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var LoginMobileAadharPage = function LoginMobileAadharPage() {
  var _theme$primary, _theme$primary2, _theme$primary3, _theme$primary4, _theme$primary5, _theme$primary6, _theme$primary7;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isAadharClicked = _useState2[0],
    setIsAadharClicked = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    input = _useState4[0],
    setInput = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    valid = _useState6[0],
    setValid = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    errorMessage = _useState8[0],
    setErrorMessage = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    loading = _useState10[0],
    setLoading = _useState10[1];
  var theme = (0, _stencilHooks.useColorPalates)();
  var config = (0, _stencilHooks.useUiConfig)('component', 'loginMobileAadharPage');
  var handleInput = (0, _react.useCallback)(function (e) {
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
  var handleAadharClick = (0, _react.useCallback)(function () {
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
        _reactHotToast.toast.success("Successfully sent OTP");
      }, 2000);
    } else {
      console.log(input.length);
      _reactHotToast.toast.error("Please enter a valid input");
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _indexModule.default.main,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _indexModule.default.leftColumn,
        style: {
          background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.logo,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: config.logo,
            width: 150,
            height: 40,
            alt: ""
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _indexModule.default.rightColumn,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.topSection,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _indexModule.default.register,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
              variant: "body2",
              color: (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
              className: _indexModule.default.registerText,
              children: "Don\u2019t have an account?"
            }), config.showSignUp && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
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
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _indexModule.default.form,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
            component: "h1",
            variant: "h4",
            textAlign: "left",
            width: "90%",
            color: (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main,
            children: config.title
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
            component: "form",
            onSubmit: handleLogin,
            sx: {
              mt: 1,
              width: '90%'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TextField.default, {
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
            (0, _jsxRuntime.jsx)(_Button.default, {
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
              children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircularProgress.default, {
                size: 24,
                color: "inherit"
              }) : 'Login'
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
            variant: "caption",
            textAlign: "center",
            width: "90%",
            color: (_theme$primary6 = theme.primary) === null || _theme$primary6 === void 0 ? void 0 : _theme$primary6.main,
            sx: {
              mb: 1
            },
            children: "or Login using"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
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
var _default = exports.default = LoginMobileAadharPage;