import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import speaker from './assets/speaker.svg';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, Typography } from '@mui/material';
import { useColorPalates } from 'stencil-hooks';
import facebookIcon from './assets/facebook.png';
import whatsappIcon from './assets/whatsapp.png';
import telegramIcon from './assets/telegram.png';
import socialSharingIcon from './assets/sharingIcon.png';
import { toast } from 'react-hot-toast';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(data) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
          toast.error('Sharing is not supported in this browser.');
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
    image: facebookIcon
  }, {
    id: 2,
    image: whatsappIcon
  }, {
    id: 3,
    image: telegramIcon
  }, {
    id: 4,
    image: socialSharingIcon
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
  var theme = useColorPalates();
  return /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(Modal, {
      "aria-labelledby": "transition-modal-title",
      "aria-describedby": "transition-modal-description",
      open: isOpen,
      onClose: onClose,
      closeAfterTransition: true,
      slots: {
        backdrop: Backdrop
      },
      slotProps: {
        backdrop: {
          timeout: 500
        }
      },
      children: /*#__PURE__*/_jsx(Fade, {
        in: isOpen,
        children: /*#__PURE__*/_jsxs("div", {
          style: style,
          children: [/*#__PURE__*/_jsxs("div", {
            style: {
              display: 'flex',
              justifyContent: 'space-between'
            },
            children: [/*#__PURE__*/_jsx("p", {
              style: {
                display: 'inline-block',
                color: '#023035',
                fontWeight: 600,
                fontSize: '20px'
              },
              children: "\u092B\u093C\u0938\u0932 \u0938\u0932\u093E\u0939 - \u0917\u0947\u0939\u0942\u0901"
            }), /*#__PURE__*/_jsx(CloseRoundedIcon, {
              onClick: onClose
            })]
          }), /*#__PURE__*/_jsx("div", {
            style: {
              marginTop: '4px',
              height: '1px',
              borderColor: 'black',
              backgroundColor: '#B4B9C5'
            }
          }), ' ', /*#__PURE__*/_jsxs("div", {
            className: "text-center p-3",
            children: [/*#__PURE__*/_jsx("div", {
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
                  _jsxs("div", {
                    style: {
                      display: 'flex',
                      alignItems: 'flex-start'
                    },
                    children: [/*#__PURE__*/_jsx("span", {
                      style: {
                        marginRight: '8px',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: 500
                      },
                      children: "".concat(index, ".")
                    }), /*#__PURE__*/_jsx(Typography, {
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
            }), /*#__PURE__*/_jsxs("p", {
              style: {
                color: theme.primary.dark,
                fontSize: '13px',
                fontWeight: 600
              },
              children: [/*#__PURE__*/_jsx("span", {
                className: "rounded-circle ",
                style: {
                  width: '20px',
                  height: '20px',
                  marginRight: '4px'
                },
                children: /*#__PURE__*/_jsx(CheckCircleRoundedIcon, {
                  color: "success",
                  style: {
                    fontSize: '14px'
                  }
                })
              }), "\u0935\u0947\u0930\u093F\u095E\u093F\u090F\u0921 \u092C\u092F \u0913\u0921\u093F\u0936\u093E \u0915\u0943\u0937\u093F \u090F\u0935\u0902 \u092A\u094D\u0930\u094C\u0926\u094D\u092F\u094B\u0917\u093F\u0915\u0940 \u0935\u093F\u0936\u094D\u0935\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F"]
            }), /*#__PURE__*/_jsxs(Button, {
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
              children: [/*#__PURE__*/_jsx("img", {
                src: speaker,
                alt: "",
                style: {
                  marginRight: '10px'
                }
              }), "\u0938\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092F\u0939\u093E\u0902 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902"]
            }), /*#__PURE__*/_jsx("p", {
              style: {
                margin: '8px 0'
              },
              children: "\u0938\u093E\u0925\u0940 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0938\u093E\u091D\u093E \u0915\u0930\u0947\u0902"
            }), /*#__PURE__*/_jsx("div", {
              style: {
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '12px'
              },
              children: sharingIcon.map(function (element) {
                return /*#__PURE__*/_jsx("img", {
                  src: element.image,
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
export default CropInfoModel;