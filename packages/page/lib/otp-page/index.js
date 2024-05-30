"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));
var _reactHotToast = require("react-hot-toast");
var _stencilMolecule = require("stencil-molecule");
var _stencilHooks = require("stencil-hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var OtpPage = function OtpPage() {
  var _theme$primary;
  var config = (0, _stencilHooks.useUiConfig)('component', 'otpPage');
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    otp = _useState2[0],
    setOtp = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    countdown = _useState6[0],
    setCountdown = _useState6[1];
  var theme = (0, _stencilHooks.useColorPalates)();
  var phNo = 9999999999; // update number here
  var handleLogin = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    if (otp.length === config.otpLength) {
      setLoading(true);
      setTimeout(function () {
        setLoading(false);
        _reactHotToast.toast.success("Successfully logged in");
      }, 2000);
    } else {
      _reactHotToast.toast.error("Please enter correct OTP");
    }
  }, [otp.length]);
  var resendOtp = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            try {
              setLoading(true);
              // Add api to resend otp here
              setLoading(false);
              setCountdown(config.resendOtpTimer);
              _reactHotToast.toast.success('Otp Sent Again');
            } catch (error) {
              setLoading(false);
              _reactHotToast.toast.error('Error Sending OTP');
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
  (0, _react.useEffect)(function () {
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
  (0, _react.useEffect)(function () {
    return setCountdown(config.resendOtpTimer);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _indexModule.default.main,
      children: [config.showSplitedView && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _indexModule.default.leftColumn,
        style: {
          background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
        },
        children: config.showLogo && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.logo,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: config.logo,
            width: 150,
            height: 40,
            alt: ""
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _indexModule.default.rightColumn,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _indexModule.default.form,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
            variant: "h4",
            textAlign: "center",
            width: "90%",
            color: "#1E232C",
            sx: {
              m: 2
            },
            children: config.title
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
            variant: "body2",
            textAlign: "left",
            width: "90%",
            color: "#838BA1",
            children: "Enter the verification code we just sent on your mobile number"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Typography.default, {
            fontWeight: "bold",
            textAlign: "center",
            children: ["+91-", phNo]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
            component: "form",
            onSubmit: handleLogin,
            sx: {
              mt: 1,
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
              sx: {
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilMolecule.OTPInput, {
                separator: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {}),
                value: otp,
                onChange: setOtp,
                length: config.otpLength
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                marginTop: '10px'
              },
              children: countdown > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Typography.default, {
                children: ["Please wait ", countdown, " seconds before resending OTP"]
              }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Typography.default, {
                  variant: "body2",
                  align: "center",
                  color: "#838BA1",
                  children: ["Didn't receive the OTP? \xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
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
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                marginTop: '10px',
                marginBottom: '10px',
                display: 'flex',
                gap: '10px',
                width: '100%'
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
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
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
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
                children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircularProgress.default, {
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
var _default = exports.default = OtpPage;