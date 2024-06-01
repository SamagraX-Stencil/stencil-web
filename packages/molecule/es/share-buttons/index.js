import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
// @ts-ignore
import React, { useMemo, useState } from 'react';
import { FileDownloadOutlined, Share } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { CircularProgress, Divider } from '@mui/material';
import { useColorPalates } from '@repo/hooks';
import { useUiConfig } from '@repo/hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var ShareButtons = function ShareButtons() {
  var _theme$primary2, _theme$primary4, _theme$primary5, _theme$primary6;
  var config = useUiConfig('component', 'shareButton');
  var theme = useColorPalates();

  // @ts-ignore
  var secondaryColor = useMemo(function () {
    var _theme$primary;
    return theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.light;
  }, [theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.light]);
  var primaryColor = useMemo(function () {
    var _theme$primary3;
    return theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main;
  }, [theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main]);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    shareLoader = _useState2[0],
    setShareLoader = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    downloadLoader = _useState4[0],
    setDownloadLoader = _useState4[1];

  // @ts-ignore
  var downloadChat = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(type) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(type) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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
                  toast.success('Downloading...');
                }, 2000);
              } else if (type === 'share') {
                setShareLoader(false);
                setTimeout(function () {
                  toast.success('Share successful');
                }, 2000);
              } else {
                toast.error("Your system doesn't support sharing this file.");
                setDownloadLoader(false);
                setShareLoader(false);
              }
            } catch (error) {
              setDownloadLoader(false);
              setShareLoader(false);
              toast.error('Error while performing');
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
  return /*#__PURE__*/_jsx(_Fragment, {
    children: ((config === null || config === void 0 ? void 0 : config.allowDownloadChat) || (config === null || config === void 0 ? void 0 : config.allowShareChat)) && /*#__PURE__*/_jsxs("div", {
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
      children: [(config === null || config === void 0 ? void 0 : config.allowShareChat) && /*#__PURE__*/_jsxs("div", {
        onClick: function onClick() {
          return downloadShareHandler('share');
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer'
        },
        children: [shareLoader ? /*#__PURE__*/_jsx("div", {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '24px',
            height: '24px'
          },
          children: /*#__PURE__*/_jsx(CircularProgress, {
            size: "20px"
          })
        }) : /*#__PURE__*/_jsx("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          },
          children: /*#__PURE__*/_jsx(Share, {
            sx: {
              color: primaryColor
            }
          })
        }), /*#__PURE__*/_jsx("p", {
          style: {
            fontSize: '10px',
            margin: 0,
            color: theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.dark,
            fontFamily: 'Mulish-bold'
          },
          children: "Share"
        })]
      }), (config === null || config === void 0 ? void 0 : config.allowDownloadChat) && (config === null || config === void 0 ? void 0 : config.allowShareChat) && /*#__PURE__*/_jsx(Divider, {}), (config === null || config === void 0 ? void 0 : config.allowDownloadChat) && /*#__PURE__*/_jsxs("div", {
        onClick: function onClick() {
          return downloadShareHandler('download');
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer'
        },
        children: [downloadLoader ? /*#__PURE__*/_jsx("div", {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '24px',
            height: '24px'
          },
          children: /*#__PURE__*/_jsx(CircularProgress, {
            size: "20px"
          })
        }) : /*#__PURE__*/_jsx("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          },
          children: /*#__PURE__*/_jsx(FileDownloadOutlined, {
            sx: {
              color: primaryColor
            }
          })
        }), /*#__PURE__*/_jsx("p", {
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
export default ShareButtons;