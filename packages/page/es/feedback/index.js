import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import { useBotAppColorPalates } from '@repo/hooks';
import { useBotConfig } from '@repo/hooks';
import axios from 'axios';
import { useLocalization } from '@repo/hooks';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var FeedbackPage = function FeedbackPage() {
  var _useState = useState(1),
    _useState2 = _slicedToArray(_useState, 2),
    star = _useState2[0],
    setStar = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    review = _useState4[0],
    setReview = _useState4[1];
  var theme = useBotAppColorPalates();
  var config = useBotConfig('component', 'feedbackPage');
  var t = useLocalization();
  console.log('feedback page ', config);
  useEffect(function () {
    axios.get("".concat(process.env.NEXT_PUBLIC_BFF_API_URL, "/feedback/").concat(localStorage.getItem('userID')), {
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
      toast.error('Please provide a rating');
      return;
    }
    if (config !== null && config !== void 0 && config.reviewBox && review === '') {
      toast.error('Please provide a review');
      return;
    }
    axios.post("".concat(process.env.NEXT_PUBLIC_BFF_API_URL, "/feedback/").concat(localStorage.getItem('userID')), {
      rating: star,
      review: review
    }, {
      headers: {
        botId: process.env.NEXT_PUBLIC_BOT_ID || '',
        orgId: process.env.NEXT_PUBLIC_ORG_ID || ''
      }
    }).then(function () {
      toast.success('Feedback submitted successfully');
    }).catch(function (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again later.');
    });
  };
  return /*#__PURE__*/_jsx("div", {
    className: styles.container,
    children: /*#__PURE__*/_jsxs(Box, {
      className: styles.main,
      children: [/*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsx(Typography, {
          sx: {
            fontSize: '5vh',
            fontWeight: 'bold',
            color: theme.primary.main
          },
          children: t('label.feedback')
        })
      }), (config === null || config === void 0 ? void 0 : config.ratingBox) && /*#__PURE__*/_jsxs(Box, {
        className: styles.section,
        children: [/*#__PURE__*/_jsx(Typography, {
          sx: {
            fontWeight: 'bold',
            fontSize: '3vh'
          },
          children: t('message.rating')
        }), /*#__PURE__*/_jsx(Rating, {
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
        }), /*#__PURE__*/_jsx(Typography, {
          sx: {
            textAlign: 'center',
            fontSize: '2vh'
          },
          children: t('message.rating_description')
        }), /*#__PURE__*/_jsx(Button, {
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
      }), (config === null || config === void 0 ? void 0 : config.reviewBox) && /*#__PURE__*/_jsxs(Box, {
        className: styles.section,
        children: [/*#__PURE__*/_jsx(Typography, {
          sx: {
            m: '1rem',
            fontWeight: 'bold',
            fontSize: '3vh'
          },
          children: t('message.review')
        }), /*#__PURE__*/_jsx("textarea", {
          placeholder: t('message.review_description'),
          value: review,
          className: styles.textBlock,
          style: {
            border: "2px solid ".concat(theme.primary.main)
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
export default FeedbackPage;