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
var _hooks = require("@repo/hooks");
var _molecules = require("@repo/molecules");
var _navigation = require("next/navigation");
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _reactCookie = require("react-cookie");
var _axios = _interopRequireDefault(require("axios"));
var _reactIntl = require("react-intl");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var LocalOtpPage = function LocalOtpPage() {
  var _theme$primary, _theme$primary2, _theme$primary3;
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
  var config = (0, _hooks.useBotConfig)('component', 'otpPage');
  var theme = (0, _hooks.useBotAppColorPalates)();
  var logo = config.logo,
    showLogo = config.showLogo,
    showSplitedView = config.showSplitedView,
    otpLength = config.otpLength,
    resendOtpTimer = config.resendOtpTimer;
  var router = (0, _navigation.useRouter)();
  var searchParams = (0, _navigation.useSearchParams)();
  var mobile = searchParams.get('state');
  var t = (0, _hooks.useLocalization)();
  var _useCookies = (0, _reactCookie.useCookies)(['access_token']),
    _useCookies2 = (0, _slicedToArray2.default)(_useCookies, 3),
    cookies = _useCookies2[0],
    setCookie = _useCookies2[1],
    removeCookie = _useCookies2[2];
  (0, _react.useEffect)(function () {
    if (!mobile || (mobile === null || mobile === void 0 ? void 0 : mobile.length) !== 10) {
      router.push('/login');
    }
  }, [router]);
  var verifyOtp = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(userData) {
      var _response$data, response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios.default.post("".concat(process.env.NEXT_PUBLIC_USER_SERVICE_URL, "/api/login/otp"), userData);
          case 3:
            response = _context.sent;
            console.log({
              response: response
            });
            localStorage.setItem('user', JSON.stringify(response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 || (_response$data = _response$data.result) === null || _response$data === void 0 || (_response$data = _response$data.data) === null || _response$data === void 0 ? void 0 : _response$data.user));
            return _context.abrupt("return", response.data);
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            _reactHotToast.toast.error("".concat(t('message.invalid_otp')));
            console.error(_context.t0);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 9]]);
    }));
    return function verifyOtp(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var resendOtp = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var response;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            try {
              setLoading(true);
              response = _axios.default.get("".concat(process.env.NEXT_PUBLIC_USER_SERVICE_URL, "/api/sendOTP?phone=").concat(mobile));
              console.log(response);
              setLoading(false);
              setCountdown(resendOtpTimer);
              _reactHotToast.toast.success("".concat(t('message.otp_sent_again')));
            } catch (error) {
              setLoading(false);
              console.error('Error resending OTP:', error);
              _reactHotToast.toast.error("".concat(t('error.error.sending_otp')));
            }
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function resendOtp() {
      return _ref2.apply(this, arguments);
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
  var handleLogin = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    if (otp.length === Number(otpLength)) {
      if (navigator.onLine) {
        setLoading(true);
        verifyOtp({
          loginId: mobile,
          password: otp,
          applicationId: process.env.NEXT_PUBLIC_USER_SERVICE_APP_ID
          //@ts-ignore
        }).then(function (res) {
          console.log({
            res: res
          });
          setLoading(false);
          if (res.params.status === 'Success') {
            var expires = new Date();
            expires.setTime(expires.getTime() + res.result.data.user.tokenExpirationInstant * 1000);
            removeCookie('access_token');
            setCookie('access_token', res.result.data.user.token, {
              path: '/',
              expires: expires
            });
            var phoneNumber = mobile;
            // @ts-ignore
            localStorage.setItem('phoneNumber', phoneNumber);
            var decodedToken = (0, _jwtDecode.default)(res.result.data.user.token);
            //@ts-ignore
            localStorage.setItem('userID', decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.sub);
            localStorage.setItem('auth', res.result.data.user.token);
            // @ts-ignore
            // setUserId(analytics, localStorage.getItem("userID"));
            setTimeout(function () {
              router.push('/');
            }, 10);
          } else {
            _reactHotToast.toast.error("".concat(t('message.invalid_otp')));
          }
        });
      } else {
        _reactHotToast.toast.error("".concat(t('label.no_internet')));
      }
    }
  }, [otp.length]);
  (0, _react.useEffect)(function () {
    return setCountdown(resendOtpTimer);
  }, []);
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
        },
        children: showLogo && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.logo,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: logo,
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
            component: "h1",
            variant: "h4",
            fontWeight: 'bold',
            textAlign: "center",
            width: "100%",
            color: (theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main) || 'black',
            dangerouslySetInnerHTML: {
              __html: t('label.subtitle')
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
            variant: "h4",
            textAlign: "center",
            width: "90%",
            color: "#1E232C",
            sx: {
              m: 2
            },
            children: t('message.otp_verification')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactIntl.FormattedMessage, {
            id: "message.otp_message",
            defaultMessage: "We will send you a 4 digit one time password on this mobile number <br><b>{mobile}</b>",
            values: {
              mobile: mobile,
              br: function br(chunks) {
                return /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {});
              },
              b: function b(chunks) {
                return /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
                  children: chunks
                });
              }
            }
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
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_molecules.OTPInput, {
                separator: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {}),
                value: otp,
                onChange: setOtp,
                length: otpLength
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                marginTop: '10px'
              },
              children: countdown > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactIntl.FormattedMessage, {
                  id: "message.wait_minutes",
                  defaultMessage: "Please wait {countdown} seconds before resending OTP",
                  values: {
                    countdown: countdown
                  }
                })
              }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Typography.default, {
                  variant: "body2",
                  align: "center",
                  color: "#838BA1",
                  children: [t('message.didnt_receive'), " \xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                    onClick: resendOtp,
                    style: {
                      color: (theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main) || '#3da156',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    },
                    children: t('message.resend_again')
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
                onClick: function onClick() {
                  return router.push('/login');
                },
                sx: {
                  textTransform: 'none',
                  p: 1,
                  // background: config?.theme.secondaryColor.value,
                  background: '#000',
                  borderRadius: '10px',
                  width: '50%'
                },
                children: t('label.back')
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
                variant: "contained",
                sx: {
                  textTransform: 'none',
                  p: 1,
                  // background: config?.theme.secondaryColor.value,
                  background: theme.primary.main,
                  borderRadius: '10px',
                  width: '50%'
                },
                onClick: handleLogin,
                disabled: loading,
                children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircularProgress.default, {
                  size: 24,
                  color: "inherit"
                }) : "".concat(t('label.submit'))
              })]
            })]
          })]
        })
      })]
    })]
  });
};
var _default = exports.default = LocalOtpPage;