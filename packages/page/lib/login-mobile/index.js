"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _farmer = _interopRequireDefault(require("./assets/farmer.jpeg"));
var _material = require("@mui/material");
var _hooks = require("@repo/hooks");
var _molecules = require("@repo/molecules");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var LoginMobile = function LoginMobile() {
  var _theme$primary;
  var config = (0, _hooks.useUiConfig)('component', 'loginMobilePage');
  var theme = (0, _hooks.useColorPalates)();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 1),
    loading = _useState2[0];
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
  var handleInput = (0, _react.useCallback)(function (e) {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      color: '#333',
      margin: 'auto',
      backgroundColor: '#fff',
      minHeight: '80vh',
      position: 'relative',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        position: 'absolute',
        top: '4px',
        right: '8px'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_molecules.LanguagePicker, {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
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
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "p-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            marginTop: '24px',
            fontSize: '24px',
            fontWeight: '400',
            color: '#51586B'
          },
          children: config === null || config === void 0 ? void 0 : config.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '25vh'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
            component: "form",
            sx: {
              mt: 1
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
              type: "text",
              margin: "normal",
              error: !valid,
              required: true,
              fullWidth: true,
              value: input,
              helperText: !valid ? errorMessage : '',
              onChange: handleInput,
              label: config === null || config === void 0 ? void 0 : config.placeholder,
              name: 'phone',
              autoComplete: 'phone',
              autoFocus: true
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
              sx: {
                mt: 1
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
                type: "submit",
                fullWidth: true,
                variant: "contained",
                sx: {
                  textTransform: 'none',
                  mt: 3,
                  mb: 4,
                  p: 1,
                  background: (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
                  borderRadius: '10px'
                }
                // onClick={handleLogin}
                ,
                disabled: !valid || loading,
                children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CircularProgress, {
                  size: 24,
                  color: "inherit"
                }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
                  children: config === null || config === void 0 ? void 0 : config.btnText
                })
              })
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("main", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: (config === null || config === void 0 ? void 0 : config.backgroundImage) || _farmer.default.src,
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
var _default = exports.default = LoginMobile;