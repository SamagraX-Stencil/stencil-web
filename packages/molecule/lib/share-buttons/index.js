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
var _iconsMaterial = require("@mui/icons-material");
var _reactHotToast = require("react-hot-toast");
var _material = require("@mui/material");
var _hooks = require("@repo/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-ignore

var ShareButtons = function ShareButtons() {
  var _theme$primary2, _theme$primary4, _theme$primary5, _theme$primary6;
  var config = (0, _hooks.useUiConfig)('component', 'shareButton');
  var theme = (0, _hooks.useColorPalates)();

  // @ts-ignore
  var secondaryColor = (0, _react.useMemo)(function () {
    var _theme$primary;
    return theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.light;
  }, [theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.light]);
  var primaryColor = (0, _react.useMemo)(function () {
    var _theme$primary3;
    return theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main;
  }, [theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main]);
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    shareLoader = _useState2[0],
    setShareLoader = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    downloadLoader = _useState4[0],
    setDownloadLoader = _useState4[1];

  // @ts-ignore
  var downloadChat = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(type) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function downloadChat(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var downloadShareHandler = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(type) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            try {
              if (type === 'download') {
                setDownloadLoader(true);
              } else {
                setShareLoader(true);
              }
              if (type === 'download') {
                setDownloadLoader(false);
                setTimeout(function () {
                  _reactHotToast.toast.success('Downloading...');
                }, 2000);
              } else if (type === 'share') {
                setShareLoader(false);
                setTimeout(function () {
                  _reactHotToast.toast.success('Share successful');
                }, 2000);
              } else {
                _reactHotToast.toast.error("Your system doesn't support sharing this file.");
                setDownloadLoader(false);
                setShareLoader(false);
              }
            } catch (error) {
              setDownloadLoader(false);
              setShareLoader(false);
              _reactHotToast.toast.error('Error while performing');
            }
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function downloadShareHandler(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: ((config === null || config === void 0 ? void 0 : config.allowDownloadChat) || (config === null || config === void 0 ? void 0 : config.allowShareChat)) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        // position: 'absolute',
        position: 'relative',
        // just to show them on website, ideally should keep absolute to stick them to right side
        right: 0,
        top: '40%',
        background: 'white',
        padding: '5px',
        borderRadius: '5px 0 0 5px',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
      },
      children: [(config === null || config === void 0 ? void 0 : config.allowShareChat) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        onClick: function onClick() {
          return downloadShareHandler('share');
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer'
        },
        children: [shareLoader ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '24px',
            height: '24px'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CircularProgress, {
            size: "20px"
          })
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Share, {
            sx: {
              color: primaryColor
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            fontSize: '10px',
            margin: 0,
            color: theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.dark,
            fontFamily: 'Mulish-bold'
          },
          children: "Share"
        })]
      }), (config === null || config === void 0 ? void 0 : config.allowDownloadChat) && (config === null || config === void 0 ? void 0 : config.allowShareChat) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Divider, {}), (config === null || config === void 0 ? void 0 : config.allowDownloadChat) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        onClick: function onClick() {
          return downloadShareHandler('download');
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer'
        },
        children: [downloadLoader ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '24px',
            height: '24px'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CircularProgress, {
            size: "20px"
          })
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.FileDownloadOutlined, {
            sx: {
              color: primaryColor
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            fontSize: '10px',
            margin: 0,
            color: theme === null || theme === void 0 || (_theme$primary6 = theme.primary) === null || _theme$primary6 === void 0 ? void 0 : _theme$primary6.dark,
            fontFamily: 'Mulish-bold'
          },
          children: "Download"
        })]
      })]
    })
  });
};
var _default = exports.default = ShareButtons;