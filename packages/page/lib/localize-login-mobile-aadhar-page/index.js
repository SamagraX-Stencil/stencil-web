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
var _navigation = require("next/navigation");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var LocalLoginMobileAadharPage = function LocalLoginMobileAadharPage() {
  var _theme$primary, _theme$primary2, _theme$primary3, _theme$primary4;
  var config = (0, _stencilHooks.useBotConfig)('component', 'loginMobileAadharPage');
  var loginWithAadhaar = config.loginWithAadhaar,
    showSignUp = config.showSignUp,
    showAlternateSignIn = config.showAlternateSignIn,
    logo = config.logo,
    showLogo = config.showLogo,
    showSplitedView = config.showSplitedView;
  var t = (0, _stencilHooks.useLocalization)();
  var router = (0, _navigation.useRouter)();
  var _useState = (0, _react.useState)(loginWithAadhaar),
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
  var theme = (0, _stencilHooks.useBotAppColorPalates)();
  var handleInput = (0, _react.useCallback)(function (e) {
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
  var handleAadharClick = (0, _react.useCallback)(function () {
    setIsAadharClicked(function (prop) {
      return !prop;
    });
  }, []);
  var handleRegistration = function handleRegistration() {
    // Register User
  };
  var handleLogin = (0, _react.useCallback)(function (e) {
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
            _reactHotToast.toast.error("".concat(t('message.otp_not_sent')));
          }
        }).catch(function (err) {
          setLoading(false);
          _reactHotToast.toast.error(err.message);
        });
      } else {
        _reactHotToast.toast.error("".concat(t('label.no_internet')));
      }
    }
  }, [isAadharClicked, input]);
  console.log('debug login:', {
    config: config
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _indexModule.default.main,
      children: [showSplitedView && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _indexModule.default.leftColumn,
        style: {
          background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _indexModule.default.rightColumn,
        children: [showSignUp && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.topSection,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _indexModule.default.register,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
              variant: "body2",
              color: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
              className: _indexModule.default.registerText,
              children: t('message.not_register_yet')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
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
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _indexModule.default.form,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
            component: "h1",
            variant: "h4",
            fontWeight: 'bold',
            textAlign: "center",
            width: "100%",
            color: (theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main) || 'black',
            dangerouslySetInnerHTML: {
              __html: t('label.subtitle')
            }
          }), showLogo && logo && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: config === null || config === void 0 ? void 0 : config.logo,
            alt: "loginPageImg",
            height: config.logoheight || '280px',
            width: config.logowidth || '280px'
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
            component: "form",
            onSubmit: handleLogin,
            sx: {
              mt: 1,
              width: '100%'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TextField.default, {
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
            (0, _jsxRuntime.jsx)(_Button.default, {
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
              children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircularProgress.default, {
                size: 24,
                color: "inherit"
              }) : "".concat(t('label.continue'))
            })]
          }), showAlternateSignIn && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
              variant: "caption",
              textAlign: "center",
              width: "90%",
              color: theme.primary.main,
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
var _default = exports.default = LocalLoginMobileAadharPage;