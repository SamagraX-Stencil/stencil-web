"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var React = _interopRequireWildcard(require("react"));
var _Backdrop = _interopRequireDefault(require("@mui/material/Backdrop"));
var _speaker = _interopRequireDefault(require("./assets/speaker.svg"));
var _Modal = _interopRequireDefault(require("@mui/material/Modal"));
var _Fade = _interopRequireDefault(require("@mui/material/Fade"));
var _CheckCircleRounded = _interopRequireDefault(require("@mui/icons-material/CheckCircleRounded"));
var _CloseRounded = _interopRequireDefault(require("@mui/icons-material/CloseRounded"));
var _material = require("@mui/material");
var _hooks = require("@repo/hooks");
var _facebook = _interopRequireDefault(require("./assets/facebook.png"));
var _whatsapp = _interopRequireDefault(require("./assets/whatsapp.png"));
var _telegram = _interopRequireDefault(require("./assets/telegram.png"));
var _sharingIcon = _interopRequireDefault(require("./assets/sharingIcon.png"));
var _reactHotToast = require("react-hot-toast");
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
var canShare = navigator.share !== undefined;
var shareData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(data) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!canShare) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return navigator.share(data);
        case 3:
          _context.next = 6;
          break;
        case 5:
          _reactHotToast.toast.error('Sharing is not supported in this browser.');
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function shareData(_x) {
    return _ref.apply(this, arguments);
  };
}();
var handleShare = function handleShare() {
  shareData({
    title: 'My App',
    text: 'Check out my awesome PWA!',
    url: 'www.facebook.com'
  });
};
var CropInfoModel = function CropInfoModel(_ref2) {
  var _theme$primary;
  var isOpen = _ref2.isOpen,
    onClose = _ref2.onClose;
  var weatherDetails = [{
    id: 1,
    label: 'आज गेहूं में कीटनाशक डालने का सबसे अच्छा दिन है |'
  }, {
    id: 2,
    label: 'आज कम बारिश है तो गेहूं की सिंचाई मत करो |'
  }];
  var sharingIcon = [{
    id: 1,
    image: _facebook.default
  }, {
    id: 2,
    image: _whatsapp.default
  }, {
    id: 3,
    image: _telegram.default
  }, {
    id: 4,
    image: _sharingIcon.default
  }];
  var synth = React.useRef(null);
  React.useEffect(function () {
    synth.current = window.speechSynthesis;
  }, []);
  var speakText = function speakText(text) {
    if (synth.current && text) {
      var utterance = new SpeechSynthesisUtterance(text);
      synth.current.speak(utterance);
    }
  };
  var theme = (0, _hooks.useColorPalates)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Modal.default, {
      "aria-labelledby": "transition-modal-title",
      "aria-describedby": "transition-modal-description",
      open: isOpen,
      onClose: onClose,
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
        in: isOpen,
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
              children: "\u092B\u093C\u0938\u0932 \u0938\u0932\u093E\u0939 - \u0917\u0947\u0939\u0942\u0901"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseRounded.default, {
              onClick: onClose
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              marginTop: '4px',
              height: '1px',
              borderColor: 'black',
              backgroundColor: '#B4B9C5'
            }
          }), ' ', /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "text-center p-3",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                margin: '16px 0px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'flex-start',
                textAlign: 'start'
              },
              children: weatherDetails.map(function (item, index) {
                return (
                  /*#__PURE__*/
                  // <div key={index}>
                  (0, _jsxRuntime.jsxs)("div", {
                    style: {
                      display: 'flex',
                      alignItems: 'flex-start'
                    },
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                      style: {
                        marginRight: '8px',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: 500
                      },
                      children: "".concat(index, ".")
                    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
                      color: "black",
                      style: {
                        wordBreak: 'break-word',
                        fontSize: '16px',
                        fontWeight: 500
                      },
                      children: item.label
                    })]
                  }, item.id)

                  // </div>
                );
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
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Button, {
              fullWidth: true,
              variant: "outlined",
              style: {
                color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.dark,
                marginTop: '30px',
                height: '60px',
                border: '1px solid var(--Mid-Gray-50, #F6F7F9)',
                background: 'var(--Mid-Gray-100, #EDEDF1)',
                fontSize: '17px',
                fontWeight: 600
              },
              onClick: function onClick() {
                return speakText('आज गेहूं में कीटनाशक डालने का सबसे अच्छा दिन है  आज कम बारिश है तो गेहूं की सिंचाई मत करो|');
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: _speaker.default.src,
                alt: "",
                style: {
                  marginRight: '10px'
                }
              }), "\u0938\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092F\u0939\u093E\u0902 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902"]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              style: {
                margin: '8px 0'
              },
              children: "\u0938\u093E\u0925\u0940 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0938\u093E\u091D\u093E \u0915\u0930\u0947\u0902"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '12px'
              },
              children: sharingIcon.map(function (element) {
                return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                  src: element.image.src,
                  onClick: handleShare,
                  height: "32px",
                  width: "32px"
                }, element.id);
              })
            })]
          })]
        })
      })
    })
  });
};
var _default = exports.default = CropInfoModel;