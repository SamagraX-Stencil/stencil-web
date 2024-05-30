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
import { useBotAppColorPalates } from 'stencil-hooks';
import { OTPInput } from 'stencil-molecule';
import { useLocalization } from 'stencil-hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useBotConfig } from 'stencil-hooks';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var LocalOtpPage = function LocalOtpPage() {
  var _theme$primary, _theme$primary2, _theme$primary3;
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
  var config = useBotConfig('component', 'otpPage');
  var theme = useBotAppColorPalates();
  var logo = config.logo,
    showLogo = config.showLogo,
    showSplitedView = config.showSplitedView,
    otpLength = config.otpLength,
    resendOtpTimer = config.resendOtpTimer;
  var router = useRouter();
  var searchParams = useSearchParams();
  var mobile = searchParams.get('state');
  var t = useLocalization();
  var _useCookies = useCookies(['access_token']),
    _useCookies2 = _slicedToArray(_useCookies, 3),
    cookies = _useCookies2[0],
    setCookie = _useCookies2[1],
    removeCookie = _useCookies2[2];
  useEffect(function () {
    if (!mobile || (mobile === null || mobile === void 0 ? void 0 : mobile.length) !== 10) {
      router.push('/login');
    }
  }, [router]);
  var verifyOtp = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(userData) {
      var _response$data, response;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios.post("".concat(process.env.NEXT_PUBLIC_USER_SERVICE_URL, "/api/login/otp"), userData);
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
            toast.error("".concat(t('message.invalid_otp')));
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var response;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            try {
              setLoading(true);
              response = axios.get("".concat(process.env.NEXT_PUBLIC_USER_SERVICE_URL, "/api/sendOTP?phone=").concat(mobile));
              console.log(response);
              setLoading(false);
              setCountdown(resendOtpTimer);
              toast.success("".concat(t('message.otp_sent_again')));
            } catch (error) {
              setLoading(false);
              console.error('Error resending OTP:', error);
              toast.error("".concat(t('error.error.sending_otp')));
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
  var handleLogin = useCallback(function (e) {
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
            var decodedToken = jwt_decode(res.result.data.user.token);
            //@ts-ignore
            localStorage.setItem('userID', decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.sub);
            localStorage.setItem('auth', res.result.data.user.token);
            // @ts-ignore
            // setUserId(analytics, localStorage.getItem("userID"));
            setTimeout(function () {
              router.push('/');
            }, 10);
          } else {
            toast.error("".concat(t('message.invalid_otp')));
          }
        });
      } else {
        toast.error("".concat(t('label.no_internet')));
      }
    }
  }, [otp.length]);
  useEffect(function () {
    return setCountdown(resendOtpTimer);
  }, []);
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
        },
        children: showLogo && /*#__PURE__*/_jsx("div", {
          className: styles.logo,
          children: /*#__PURE__*/_jsx("img", {
            src: logo,
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
            component: "h1",
            variant: "h4",
            fontWeight: 'bold',
            textAlign: "center",
            width: "100%",
            color: (theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main) || 'black',
            dangerouslySetInnerHTML: {
              __html: t('label.subtitle')
            }
          }), /*#__PURE__*/_jsx(Typography, {
            variant: "h4",
            textAlign: "center",
            width: "90%",
            color: "#1E232C",
            sx: {
              m: 2
            },
            children: t('message.otp_verification')
          }), /*#__PURE__*/_jsx(FormattedMessage, {
            id: "message.otp_message",
            defaultMessage: "We will send you a 4 digit one time password on this mobile number <br><b>{mobile}</b>",
            values: {
              mobile: mobile,
              br: function br(chunks) {
                return /*#__PURE__*/_jsx("br", {});
              },
              b: function b(chunks) {
                return /*#__PURE__*/_jsx("b", {
                  children: chunks
                });
              }
            }
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
                length: otpLength
              })
            }), /*#__PURE__*/_jsx("div", {
              style: {
                marginTop: '10px'
              },
              children: countdown > 0 ? /*#__PURE__*/_jsx("span", {
                children: /*#__PURE__*/_jsx(FormattedMessage, {
                  id: "message.wait_minutes",
                  defaultMessage: "Please wait {countdown} seconds before resending OTP",
                  values: {
                    countdown: countdown
                  }
                })
              }) : /*#__PURE__*/_jsx(_Fragment, {
                children: /*#__PURE__*/_jsxs(Typography, {
                  variant: "body2",
                  align: "center",
                  color: "#838BA1",
                  children: [t('message.didnt_receive'), " \xA0", /*#__PURE__*/_jsx("p", {
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
              }), /*#__PURE__*/_jsx(Button, {
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
                children: loading ? /*#__PURE__*/_jsx(CircularProgress, {
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
export default LocalOtpPage;