"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _material = require("@mui/material");
var _stencilHooks = require("stencil-hooks");
var _comingSoonPage = _interopRequireDefault(require("../coming-soon-page"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { useFlags } from 'flagsmith/react'

var LocalFAQPage = function LocalFAQPage() {
  var _flags$show_faq_page, _theme$primary, _flags$show_pdf_butto, _theme$primary2, _theme$primary3, _flags$show_dialer, _theme$primary4, _theme$primary5;
  var t = (0, _stencilHooks.useLocalization)();
  var theme = (0, _stencilHooks.useBotAppColorPalates)();
  // const flags = useFlags([
  //   'show_faq_page',
  //   'show_dialer',
  //   'dialer_number',
  //   'show_pdf_buttons',
  //   'manual_pdf_link',
  // ])
  var flags = {
    show_faq_page: {
      enabled: true
    },
    // or false
    show_dialer: {
      enabled: true
    },
    // or false
    dialer_number: {
      value: '+1234567890'
    },
    // Replace with actual number
    show_pdf_buttons: {
      enabled: true
    },
    // or false
    manual_pdf_link: {
      value: 'https://example.com/path-to-manual.pdf'
    } // Replace with actual link
  };
  var downloadPDFHandler = (0, _react.useCallback)(function () {
    var _flags;
    var link = flags === null || flags === void 0 || (_flags = flags["manual_pdf_link"]) === null || _flags === void 0 ? void 0 : _flags.value;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // window.open(link);

    fetch(proxyUrl + link, {
      method: 'GET',
      headers: {}
    }).then(function (response) {
      return response.blob();
    }).then(function (blob) {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = link;
      a.download = "User_Manual_For_VAWs.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }).catch(function (error) {
      console.error(error);
    });
  }, [flags]);
  var handleContactClick = (0, _react.useCallback)(function () {
    var phoneNumber = "tel:".concat(flags.dialer_number.value);
    window.location.href = phoneNumber;
  }, [flags]);
  if (!(flags !== null && flags !== void 0 && (_flags$show_faq_page = flags.show_faq_page) !== null && _flags$show_faq_page !== void 0 && _flags$show_faq_page.enabled)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_comingSoonPage.default, {});
  } else return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
      className: _indexModule.default.main,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        m: 3,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          variant: "h4",
          sx: {
            fontWeight: '600',
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
          },
          children: t('label.faqs')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
        children: [(flags === null || flags === void 0 || (_flags$show_pdf_butto = flags.show_pdf_buttons) === null || _flags$show_pdf_butto === void 0 ? void 0 : _flags$show_pdf_butto.enabled) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
          className: _indexModule.default.manualButtons,
          m: 3,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
            onClick: downloadPDFHandler,
            variant: "contained",
            sx: {
              textTransform: 'none',
              backgroundColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
              '&:hover': {
                backgroundColor: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
              }
            },
            children: t('label.manual')
          })
        }), (flags === null || flags === void 0 || (_flags$show_dialer = flags.show_dialer) === null || _flags$show_dialer === void 0 ? void 0 : _flags$show_dialer.enabled) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
          className: _indexModule.default.dialerBox,
          m: 3,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
            p: 1.5,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
              variant: "body1",
              sx: {
                fontWeight: 'bold'
              },
              children: t('message.dial_description')
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
            px: 2,
            display: 'flex',
            alignItems: 'center',
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
                sx: {
                  bgcolor: theme.primary.main,
                  width: '5vh',
                  height: '5vh'
                },
                alt: "Call Icon",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Call.default, {
                  fontSize: "medium"
                })
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
              variant: "text",
              size: "large",
              onClick: handleContactClick,
              sx: {
                textTransform: 'none',
                color: theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main,
                '&:hover': {
                  color: theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.main
                }
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
                variant: "h5",
                fontWeight: 600,
                children: "".concat(t('label.dial'), " ").concat(flags.dialer_number.value)
              })
            })]
          })]
        })]
      })]
    })]
  });
};
var _default = exports.default = LocalFAQPage;