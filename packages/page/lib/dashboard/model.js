"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _Backdrop = _interopRequireDefault(require("@mui/material/Backdrop"));
var _Modal = _interopRequireDefault(require("@mui/material/Modal"));
var _Fade = _interopRequireDefault(require("@mui/material/Fade"));
var _CheckCircleRounded = _interopRequireDefault(require("@mui/icons-material/CheckCircleRounded"));
var _CloseRounded = _interopRequireDefault(require("@mui/icons-material/CloseRounded"));
var _material = require("@mui/material");
var _cloudCopy = _interopRequireDefault(require("./assets/cloud-copy.png"));
var _hooks = require("@repo/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: '500px',
  backgroundColor: '#fff',
  padding: '20px',
  border: 'none',
  borderRadius: '5px'
};
var WeatherStatus = function WeatherStatus() {
  var _React$useState = React.useState(true),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    open = _React$useState2[0],
    setOpen = _React$useState2[1];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  var handleClose = function handleClose() {
    return setOpen(false);
  };
  var weatherDetails = [{
    id: 1,
    label: 'उन्हें अच्छी तरह हाइड्रेटेड रखने के लिए स्वच्छ पेयजल उपलब्ध कराएं।'
  }, {
    id: 2,
    label: 'तूफ़ान गुज़रने तक उन्हें शांत और सुरक्षित स्थान पर रखें।'
  }];
  var theme = (0, _hooks.useColorPalates)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Modal.default, {
      "aria-labelledby": "transition-modal-title",
      "aria-describedby": "transition-modal-description",
      open: open,
      onClose: handleClose,
      closeAfterTransition: true,
      slots: {
        backdrop: _Backdrop.default
      },
      slotProps: {
        backdrop: {
          timeout: 500
        }
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Fade.default, {
        in: open,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: style,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: 'flex',
              justifyContent: 'space-between'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              style: {
                display: 'inline-block',
                color: '#023035',
                fontWeight: 600,
                fontSize: '20px'
              },
              children: "\u092E\u0902\u0917\u0932\u0935\u093E\u0930 \u0915\u094B \u0906\u0902\u0927\u0940 \u0906\u0928\u0947 \u0915\u0940 \u0905\u0928\u0941\u092E\u093E\u0928"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseRounded.default, {
              onClick: handleClose
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              marginTop: '4px',
              height: '1px',
              borderColor: 'black',
              backgroundColor: '#B4B9C5'
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "text-center p-3",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: _cloudCopy.default.src
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.List, {
              dense: true,
              children: weatherDetails.map(function (item) {
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                  style: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    textAlign: 'start'
                  },
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    style: {
                      marginRight: '8px',
                      color: 'black',
                      fontSize: '16px',
                      fontWeight: 500
                    },
                    children: "".concat(item.id, ".")
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
                    color: "black",
                    style: {
                      wordBreak: 'break-word',
                      fontSize: '16px',
                      fontWeight: 500
                    },
                    children: item.label
                  })]
                });
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
              style: {
                color: theme.primary.dark,
                fontSize: '13px',
                fontWeight: 600
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "rounded-circle ",
                style: {
                  width: '20px',
                  height: '20px',
                  marginRight: '4px'
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CheckCircleRounded.default, {
                  color: "success",
                  style: {
                    fontSize: '14px'
                  }
                })
              }), "\u0935\u0947\u0930\u093F\u095E\u093F\u090F\u0921 \u092C\u092F \u0913\u0921\u093F\u0936\u093E \u0915\u0943\u0937\u093F \u090F\u0935\u0902 \u092A\u094D\u0930\u094C\u0926\u094D\u092F\u094B\u0917\u093F\u0915\u0940 \u0935\u093F\u0936\u094D\u0935\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F"]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              fullWidth: true,
              variant: "contained",
              style: {
                marginTop: '30px',
                backgroundColor: "".concat(theme.primary.dark),
                padding: '8px 0'
              },
              children: "\u091C\u093E\u0928\u093F\u090F \u0907\u0938\u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902"
            })]
          })]
        })
      })
    })
  });
};
var _default = exports.default = WeatherStatus;