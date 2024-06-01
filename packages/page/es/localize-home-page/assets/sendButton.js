import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { jsx as _jsx } from "react/jsx-runtime";
var SendButton = function SendButton(props) {
  return /*#__PURE__*/_jsx("div", {
    style: {
      background: props === null || props === void 0 ? void 0 : props.color,
      borderRadius: '50%',
      height: props === null || props === void 0 ? void 0 : props.height,
      width: props === null || props === void 0 ? void 0 : props.width,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    children: /*#__PURE__*/_jsx(SendIcon, {
      sx: {
        color: 'white'
      }
    })
  });
};
export default SendButton;