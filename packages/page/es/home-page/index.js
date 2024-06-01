import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import styles from './index.module.css';
import { useCallback, useRef, useState } from 'react';
import SendIcon from './assets/sendButton.png';
import WeatherIcon from './assets/weather_advisory.png';
import toast from 'react-hot-toast';
import { useUiConfig, useColorPalates } from '@repo/hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var HomePage = function HomePage() {
  var _theme$primary, _config$btns;
  var config = useUiConfig('component', 'homePage');
  var theme = useColorPalates();
  var inputRef = useRef(null);
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    inputMsg = _useState2[0],
    setInputMsg = _useState2[1];
  var sendMessage = useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(msg) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.length === 0)) {
              _context.next = 3;
              break;
            }
            toast.error('Please enter a message to send');
            return _context.abrupt("return");
          case 3:
            toast.success('Message sent!');
            setInputMsg('');
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), []);
  var handleInputChange = function handleInputChange(e) {
    var inputValue = e.target.value;
    setInputMsg(inputValue);

    // Adjust textarea height dynamically based on content
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.style.height = 'auto';
      //@ts-ignore
      inputRef.current.style.height = "".concat(inputRef.current.scrollHeight, "px");
    }
  };
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: styles.main,
      style: {
        color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
      },
      children: [/*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          className: styles.title,
          children: config === null || config === void 0 ? void 0 : config.title
        }), (config === null || config === void 0 ? void 0 : config.showBtns) && /*#__PURE__*/_jsx("div", {
          className: styles.imgButtons,
          children: config === null || config === void 0 || (_config$btns = config.btns) === null || _config$btns === void 0 ? void 0 : _config$btns.map(function (btn, index) {
            return /*#__PURE__*/_jsxs("div", {
              className: styles.imgBtn,
              onClick: function onClick() {
                return console.log('clicked');
              },
              children: [/*#__PURE__*/_jsx("img", {
                src: (btn === null || btn === void 0 ? void 0 : btn.image) || WeatherIcon.src,
                alt: btn === null || btn === void 0 ? void 0 : btn.title
              }), /*#__PURE__*/_jsx("p", {
                children: btn === null || btn === void 0 ? void 0 : btn.title
              })]
            }, index);
          })
        }), (config === null || config === void 0 ? void 0 : config.showMic) && /*#__PURE__*/_jsx("div", {
          className: styles.voiceRecorder
        })]
      }), /*#__PURE__*/_jsx("form", {
        onSubmit: function onSubmit(event) {
          return event === null || event === void 0 ? void 0 : event.preventDefault();
        },
        children: /*#__PURE__*/_jsxs("div", {
          className: "".concat("".concat(styles.inputBox, " ").concat(styles.inputBoxOpen)),
          children: [/*#__PURE__*/_jsx("textarea", {
            ref: inputRef,
            rows: 1,
            value: inputMsg,
            onChange: handleInputChange,
            placeholder: config === null || config === void 0 ? void 0 : config.placeholder
          }), /*#__PURE__*/_jsx("button", {
            type: "submit",
            className: styles.sendButton,
            children: /*#__PURE__*/_jsx("img", {
              src: SendIcon,
              width: 50,
              height: 50,
              alt: "sendIcon",
              onClick: function onClick() {
                return sendMessage(inputMsg);
              }
            })
          })]
        })
      })]
    })
  });
};
export default HomePage;