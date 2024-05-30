import React, { useCallback } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CallRoundedIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import { useBotAppColorPalates } from 'stencil-hooks';
// import { useFlags } from 'flagsmith/react'
import ComingSoonPage from '../coming-soon-page';
import { useLocalization } from 'stencil-hooks';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var LocalFAQPage = function LocalFAQPage() {
  var _flags$show_faq_page, _theme$primary, _flags$show_pdf_butto, _theme$primary2, _theme$primary3, _flags$show_dialer, _theme$primary4, _theme$primary5;
  var t = useLocalization();
  var theme = useBotAppColorPalates();
  // const flags = useFlags([
  //   'show_faq_page',
  //   'show_dialer',
  //   'dialer_number',
  //   'show_pdf_buttons',
  //   'manual_pdf_link',
  // ])
  var flags = {
    show_faq_page: {
      enabled: true
    },
    // or false
    show_dialer: {
      enabled: true
    },
    // or false
    dialer_number: {
      value: '+1234567890'
    },
    // Replace with actual number
    show_pdf_buttons: {
      enabled: true
    },
    // or false
    manual_pdf_link: {
      value: 'https://example.com/path-to-manual.pdf'
    } // Replace with actual link
  };
  var downloadPDFHandler = useCallback(function () {
    var _flags;
    var link = flags === null || flags === void 0 || (_flags = flags["manual_pdf_link"]) === null || _flags === void 0 ? void 0 : _flags.value;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // window.open(link);

    fetch(proxyUrl + link, {
      method: 'GET',
      headers: {}
    }).then(function (response) {
      return response.blob();
    }).then(function (blob) {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = link;
      a.download = "User_Manual_For_VAWs.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }).catch(function (error) {
      console.error(error);
    });
  }, [flags]);
  var handleContactClick = useCallback(function () {
    var phoneNumber = "tel:".concat(flags.dialer_number.value);
    window.location.href = phoneNumber;
  }, [flags]);
  if (!(flags !== null && flags !== void 0 && (_flags$show_faq_page = flags.show_faq_page) !== null && _flags$show_faq_page !== void 0 && _flags$show_faq_page.enabled)) {
    return /*#__PURE__*/_jsx(ComingSoonPage, {});
  } else return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }), /*#__PURE__*/_jsxs(Box, {
      className: styles.main,
      children: [/*#__PURE__*/_jsx(Box, {
        m: 3,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "h4",
          sx: {
            fontWeight: '600',
            color: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
          },
          children: t('label.faqs')
        })
      }), /*#__PURE__*/_jsxs(Box, {
        children: [(flags === null || flags === void 0 || (_flags$show_pdf_butto = flags.show_pdf_buttons) === null || _flags$show_pdf_butto === void 0 ? void 0 : _flags$show_pdf_butto.enabled) && /*#__PURE__*/_jsx(Box, {
          className: styles.manualButtons,
          m: 3,
          children: /*#__PURE__*/_jsx(Button, {
            onClick: downloadPDFHandler,
            variant: "contained",
            sx: {
              textTransform: 'none',
              backgroundColor: theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main,
              '&:hover': {
                backgroundColor: theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
              }
            },
            children: t('label.manual')
          })
        }), (flags === null || flags === void 0 || (_flags$show_dialer = flags.show_dialer) === null || _flags$show_dialer === void 0 ? void 0 : _flags$show_dialer.enabled) && /*#__PURE__*/_jsxs(Box, {
          className: styles.dialerBox,
          m: 3,
          children: [/*#__PURE__*/_jsx(Box, {
            p: 1.5,
            children: /*#__PURE__*/_jsx(Typography, {
              variant: "body1",
              sx: {
                fontWeight: 'bold'
              },
              children: t('message.dial_description')
            })
          }), /*#__PURE__*/_jsxs(Box, {
            px: 2,
            display: 'flex',
            alignItems: 'center',
            children: [/*#__PURE__*/_jsx(Box, {
              children: /*#__PURE__*/_jsx(Avatar, {
                sx: {
                  bgcolor: theme.primary.main,
                  width: '5vh',
                  height: '5vh'
                },
                alt: "Call Icon",
                children: /*#__PURE__*/_jsx(CallRoundedIcon, {
                  fontSize: "medium"
                })
              })
            }), /*#__PURE__*/_jsx(Button, {
              variant: "text",
              size: "large",
              onClick: handleContactClick,
              sx: {
                textTransform: 'none',
                color: theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main,
                '&:hover': {
                  color: theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.main
                }
              },
              children: /*#__PURE__*/_jsx(Typography, {
                variant: "h5",
                fontWeight: 600,
                children: "".concat(t('label.dial'), " ").concat(flags.dialer_number.value)
              })
            })]
          })]
        })]
      })]
    })]
  });
};
export default LocalFAQPage;