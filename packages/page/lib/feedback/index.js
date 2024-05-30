"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _material = require("@mui/material");
var _Rating = _interopRequireDefault(require("@mui/material/Rating"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _reactHotToast = require("react-hot-toast");
var _stencilHooks = require("stencil-hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var FeedbackPage = function FeedbackPage() {
  var _theme$primary, _theme$primary2, _theme$primary3, _theme$primary4, _theme$primary5, _theme$primary6, _theme$primary7, _theme$primary8, _theme$primary9;
  var config = (0, _stencilHooks.useUiConfig)('component', 'feedbackPage');
  var _useState = (0, _react.useState)(1),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    star = _useState2[0],
    setStar = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    review = _useState4[0],
    setReview = _useState4[1];
  var theme = (0, _stencilHooks.useColorPalates)();
  var handleFeedback = function handleFeedback() {
    var rateBox = config.ratingBox;
    var reviewContainer = config.reviewBox;
    var sendReviewSuccess = function sendReviewSuccess() {
      setTimeout(function () {
        _reactHotToast.toast.success("Review sent successfully");
        setReview('');
      }, 2000);
    };
    var sendReviewError = function sendReviewError() {
      _reactHotToast.toast.error("Please provide valid review");
    };
    if (rateBox && reviewContainer) {
      star === 0 ? sendReviewError() : sendReviewSuccess();
    } else if (rateBox && !reviewContainer) {
      star === 0 ? sendReviewError() : sendReviewSuccess();
    } else if (!rateBox && reviewContainer) {
      review === '' ? sendReviewError() : sendReviewSuccess();
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _indexModule.default.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
      sx: {
        fontSize: '5vh',
        fontWeight: 'bold',
        m: 2,
        p: 2,
        display: 'fixed',
        color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
      },
      children: config.Title
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
      className: _indexModule.default.main,
      children: [config.ratingBox === true && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        className: _indexModule.default.section,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          sx: {
            fontWeight: 'bold',
            fontSize: '3vh',
            color: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
          },
          children: config.ratingBoxTitle
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rating.default, {
          "data-testid": "ratingComponent",
          name: "simple-controlled",
          value: star,
          max: config.ratingMaxStars,
          onChange: function onChange(event, newValue) {
            console.log(event);
            setStar(function () {
              return newValue === null ? 1 : newValue;
            });
          },
          defaultValue: 1,
          sx: {
            fontSize: '6vh'
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          sx: {
            textAlign: 'center',
            fontSize: '2vh',
            color: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
          },
          children: config.ratingStarDescription
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          id: "ratingBtn",
          variant: "contained",
          "data-testid": "ratingBtn",
          sx: {
            mt: 2,
            backgroundColor: "".concat((_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.dark),
            fontWeight: 'bold',
            borderRadius: '10rem',
            fontSize: '10px',
            p: 1.5,
            '&:hover': {
              backgroundColor: "".concat((_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.main)
            }
          },
          onClick: handleFeedback,
          children: config.ratingButtonText
        })]
      }), config.reviewBox === true && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        className: _indexModule.default.section,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          sx: {
            m: '1rem',
            fontWeight: 'bold',
            fontSize: '3vh',
            color: theme === null || theme === void 0 || (_theme$primary6 = theme.primary) === null || _theme$primary6 === void 0 ? void 0 : _theme$primary6.main
          },
          children: config.reviewBoxTitle
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
          placeholder: config.reviewPlaceholder,
          value: review,
          className: _indexModule.default.textBlock,
          style: {
            border: "2px solid ".concat(theme === null || theme === void 0 || (_theme$primary7 = theme.primary) === null || _theme$primary7 === void 0 ? void 0 : _theme$primary7.light)
          },
          onChange: function onChange(e) {
            setReview(e.target.value);
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          id: "reviewBtn",
          variant: "contained",
          "data-testid": "reviewBtn",
          sx: {
            mt: 2,
            backgroundColor: "".concat((_theme$primary8 = theme.primary) === null || _theme$primary8 === void 0 ? void 0 : _theme$primary8.dark),
            fontWeight: 'bold',
            borderRadius: '10rem',
            fontSize: '10px',
            p: 1.5,
            '&:hover': {
              backgroundColor: "".concat((_theme$primary9 = theme.primary) === null || _theme$primary9 === void 0 ? void 0 : _theme$primary9.main)
            }
          },
          onClick: handleFeedback,
          children: config.reviewButtonText
        })]
      })]
    })]
  });
};
var _default = exports.default = FeedbackPage;