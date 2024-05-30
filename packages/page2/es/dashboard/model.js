import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, List, Typography } from '@mui/material';
import cloud from './assets/cloud-copy.png';
import { useColorPalates } from 'stencil-hooks';
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
var WeatherStatus = function WeatherStatus() {
  var _React$useState = React.useState(true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
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
  var theme = useColorPalates();
  return /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(Modal, {
      "aria-labelledby": "transition-modal-title",
      "aria-describedby": "transition-modal-description",
      open: open,
      onClose: handleClose,
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
        in: open,
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
              children: "\u092E\u0902\u0917\u0932\u0935\u093E\u0930 \u0915\u094B \u0906\u0902\u0927\u0940 \u0906\u0928\u0947 \u0915\u0940 \u0905\u0928\u0941\u092E\u093E\u0928"
            }), /*#__PURE__*/_jsx(CloseRoundedIcon, {
              onClick: handleClose
            })]
          }), /*#__PURE__*/_jsx("div", {
            style: {
              marginTop: '4px',
              height: '1px',
              borderColor: 'black',
              backgroundColor: '#B4B9C5'
            }
          }), /*#__PURE__*/_jsxs("div", {
            className: "text-center p-3",
            children: [/*#__PURE__*/_jsx("img", {
              src: cloud
            }), /*#__PURE__*/_jsx(List, {
              dense: true,
              children: weatherDetails.map(function (item) {
                return /*#__PURE__*/_jsxs("div", {
                  style: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    textAlign: 'start'
                  },
                  children: [/*#__PURE__*/_jsx("span", {
                    style: {
                      marginRight: '8px',
                      color: 'black',
                      fontSize: '16px',
                      fontWeight: 500
                    },
                    children: "".concat(item.id, ".")
                  }), /*#__PURE__*/_jsx(Typography, {
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
            }), /*#__PURE__*/_jsx(Button, {
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
export default WeatherStatus;