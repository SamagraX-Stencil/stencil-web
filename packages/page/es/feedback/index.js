import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import styles from './index.module.css';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import { useUiConfig, useColorPalates } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var FeedbackPage = function FeedbackPage() {
  var _theme$primary, _theme$primary2, _theme$primary3, _theme$primary4, _theme$primary5, _theme$primary6, _theme$primary7, _theme$primary8, _theme$primary9;
  var config = useUiConfig('component', 'feedbackPage');
  var _useState = useState(1),
    _useState2 = _slicedToArray(_useState, 2),
    star = _useState2[0],
    setStar = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    review = _useState4[0],
    setReview = _useState4[1];
  var theme = useColorPalates();
  var handleFeedback = function handleFeedback() {
    var rateBox = config.ratingBox;
    var reviewContainer = config.reviewBox;
    var sendReviewSuccess = function sendReviewSuccess() {
      setTimeout(function () {
        toast.success("Review sent successfully");
        setReview('');
      }, 2000);
    };
    var sendReviewError = function sendReviewError() {
      toast.error("Please provide valid review");
    };
    if (rateBox && reviewContainer) {
      star === 0 ? sendReviewError() : sendReviewSuccess();
    } else if (rateBox && !reviewContainer) {
      star === 0 ? sendReviewError() : sendReviewSuccess();
    } else if (!rateBox && reviewContainer) {
      review === '' ? sendReviewError() : sendReviewSuccess();
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: styles.container,
    children: [/*#__PURE__*/_jsx(Typography, {
      sx: {
        fontSize: '5vh',
        fontWeight: 'bold',
        m: 2,
        p: 2,
        display: 'fixed',
        color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
      },
      children: config.Title
    }), /*#__PURE__*/_jsxs(Box, {
      className: styles.main,
      children: [config.ratingBox === true && /*#__PURE__*/_jsxs(Box, {
        className: styles.section,
        children: [/*#__PURE__*/_jsx(Typography, {
          sx: {
            fontWeight: 'bold',
            fontSize: '3vh',
            color: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
          },
          children: config.ratingBoxTitle
        }), /*#__PURE__*/_jsx(Rating, {
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
        }), /*#__PURE__*/_jsx(Typography, {
          sx: {
            textAlign: 'center',
            fontSize: '2vh',
            color: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
          },
          children: config.ratingStarDescription
        }), /*#__PURE__*/_jsx(Button, {
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
      }), config.reviewBox === true && /*#__PURE__*/_jsxs(Box, {
        className: styles.section,
        children: [/*#__PURE__*/_jsx(Typography, {
          sx: {
            m: '1rem',
            fontWeight: 'bold',
            fontSize: '3vh',
            color: theme === null || theme === void 0 || (_theme$primary6 = theme.primary) === null || _theme$primary6 === void 0 ? void 0 : _theme$primary6.main
          },
          children: config.reviewBoxTitle
        }), /*#__PURE__*/_jsx("textarea", {
          placeholder: config.reviewPlaceholder,
          value: review,
          className: styles.textBlock,
          style: {
            border: "2px solid ".concat(theme === null || theme === void 0 || (_theme$primary7 = theme.primary) === null || _theme$primary7 === void 0 ? void 0 : _theme$primary7.light)
          },
          onChange: function onChange(e) {
            setReview(e.target.value);
          }
        }), /*#__PURE__*/_jsx(Button, {
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
export default FeedbackPage;