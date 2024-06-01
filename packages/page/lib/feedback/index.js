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
var _hooks = require("@repo/hooks");
var _axios = _interopRequireDefault(require("axios"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var FeedbackPage = function FeedbackPage() {
  var _useState = (0, _react.useState)(1),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    star = _useState2[0],
    setStar = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    review = _useState4[0],
    setReview = _useState4[1];
  var theme = (0, _hooks.useBotAppColorPalates)();
  var config = (0, _hooks.useBotConfig)('component', 'feedbackPage');
  var t = (0, _hooks.useLocalization)();
  console.log('feedback page ', config);
  (0, _react.useEffect)(function () {
    _axios.default.get("".concat(process.env.NEXT_PUBLIC_BFF_API_URL, "/feedback/").concat(localStorage.getItem('userID')), {
      headers: {
        botId: process.env.NEXT_PUBLIC_BOT_ID || '',
        orgId: process.env.NEXT_PUBLIC_ORG_ID || ''
      }
    }).then(function (res) {
      var _res$data, _res$data2;
      setStar(res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.rating);
      setReview(res === null || res === void 0 || (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.review);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);
  var handleFeedback = function handleFeedback() {
    if (!config) return;
    if (config !== null && config !== void 0 && config.ratingBox && star === 0) {
      _reactHotToast.toast.error('Please provide a rating');
      return;
    }
    if (config !== null && config !== void 0 && config.reviewBox && review === '') {
      _reactHotToast.toast.error('Please provide a review');
      return;
    }
    _axios.default.post("".concat(process.env.NEXT_PUBLIC_BFF_API_URL, "/feedback/").concat(localStorage.getItem('userID')), {
      rating: star,
      review: review
    }, {
      headers: {
        botId: process.env.NEXT_PUBLIC_BOT_ID || '',
        orgId: process.env.NEXT_PUBLIC_ORG_ID || ''
      }
    }).then(function () {
      _reactHotToast.toast.success('Feedback submitted successfully');
    }).catch(function (error) {
      console.error('Error submitting feedback:', error);
      _reactHotToast.toast.error('Failed to submit feedback. Please try again later.');
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _indexModule.default.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
      className: _indexModule.default.main,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          sx: {
            fontSize: '5vh',
            fontWeight: 'bold',
            color: theme.primary.main
          },
          children: t('label.feedback')
        })
      }), (config === null || config === void 0 ? void 0 : config.ratingBox) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        className: _indexModule.default.section,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          sx: {
            fontWeight: 'bold',
            fontSize: '3vh'
          },
          children: t('message.rating')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rating.default, {
          "data-testid": "ratingComponent",
          name: "simple-controlled",
          value: star,
          max: (config === null || config === void 0 ? void 0 : config.ratingMaxStars) || 5,
          onChange: function onChange(event, newValue) {
            setStar(newValue || 1);
          },
          defaultValue: 1,
          sx: {
            fontSize: '6vh'
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          sx: {
            textAlign: 'center',
            fontSize: '2vh'
          },
          children: t('message.rating_description')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          id: "ratingBtn",
          variant: "contained",
          "data-testid": "ratingBtn",
          sx: {
            mt: 2,
            backgroundColor: "".concat(theme.primary.main),
            fontWeight: 'bold',
            borderRadius: '10rem',
            fontSize: '1.5vh',
            p: 1.5,
            '&:hover': {
              backgroundColor: "".concat(theme.primary.dark)
            }
          },
          onClick: handleFeedback,
          children: t('label.submit_review')
        })]
      }), (config === null || config === void 0 ? void 0 : config.reviewBox) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        className: _indexModule.default.section,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
          sx: {
            m: '1rem',
            fontWeight: 'bold',
            fontSize: '3vh'
          },
          children: t('message.review')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
          placeholder: t('message.review_description'),
          value: review,
          className: _indexModule.default.textBlock,
          style: {
            border: "2px solid ".concat(theme.primary.main)
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
            backgroundColor: "".concat(theme.primary.main),
            fontWeight: 'bold',
            borderRadius: '10rem',
            fontSize: '1.5vh',
            p: 1.5,
            '&:hover': {
              backgroundColor: "".concat(theme.primary.dark)
            }
          },
          onClick: handleFeedback,
          children: t('label.submit_review')
        })]
      })]
    })
  });
};
var _default = exports.default = FeedbackPage;