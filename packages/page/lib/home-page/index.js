"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _react = require("react");
var _sendButton = _interopRequireDefault(require("./assets/sendButton.png"));
var _weather_advisory = _interopRequireDefault(require("./assets/weather_advisory.png"));
var _reactHotToast = _interopRequireDefault(require("react-hot-toast"));
var _stencilHooks = require("stencil-hooks");
var _jsxRuntime = require("react/jsx-runtime");
var HomePage = function HomePage() {
  var _theme$primary, _config$btns;
  var config = (0, _stencilHooks.useUiConfig)('component', 'homePage');
  var theme = (0, _stencilHooks.useColorPalates)();
  var inputRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    inputMsg = _useState2[0],
    setInputMsg = _useState2[1];
  var sendMessage = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(msg) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.length === 0)) {
              _context.next = 3;
              break;
            }
            _reactHotToast.default.error('Please enter a message to send');
            return _context.abrupt("return");
          case 3:
            _reactHotToast.default.success('Message sent!');
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _indexModule.default.main,
      style: {
        color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.title,
          children: config === null || config === void 0 ? void 0 : config.title
        }), (config === null || config === void 0 ? void 0 : config.showBtns) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.imgButtons,
          children: config === null || config === void 0 || (_config$btns = config.btns) === null || _config$btns === void 0 ? void 0 : _config$btns.map(function (btn, index) {
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: _indexModule.default.imgBtn,
              onClick: function onClick() {
                return console.log('clicked');
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: (btn === null || btn === void 0 ? void 0 : btn.image) || _weather_advisory.default,
                alt: btn === null || btn === void 0 ? void 0 : btn.title
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: btn === null || btn === void 0 ? void 0 : btn.title
              })]
            }, index);
          })
        }), (config === null || config === void 0 ? void 0 : config.showMic) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _indexModule.default.voiceRecorder
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("form", {
        onSubmit: function onSubmit(event) {
          return event === null || event === void 0 ? void 0 : event.preventDefault();
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "".concat("".concat(_indexModule.default.inputBox, " ").concat(_indexModule.default.inputBoxOpen)),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
            ref: inputRef,
            rows: 1,
            value: inputMsg,
            onChange: handleInputChange,
            placeholder: config === null || config === void 0 ? void 0 : config.placeholder
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            type: "submit",
            className: _indexModule.default.sendButton,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: _sendButton.default,
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
var _default = exports.default = HomePage;