import { Backdrop, Stack } from '@mui/material';
import styles from './index.module.css';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var FullPageLoader = function FullPageLoader(_ref) {
  var loading = _ref.loading,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '#25b09b' : _ref$color,
    _ref$background = _ref.background,
    background = _ref$background === void 0 ? 'rgba(0, 0, 0, 0.5)' : _ref$background,
    label = _ref.label;
  return /*#__PURE__*/_jsx(Backdrop, {
    sx: {
      color: '#fff',
      zIndex: 99999,
      background: background
    },
    open: loading,
    children: /*#__PURE__*/_jsxs(Stack, {
      gap: 2,
      alignItems: "center",
      children: [/*#__PURE__*/_jsx("div", {
        id: "loader",
        className: "".concat(styles.loader),
        style: {
          color: color
        }
      }), label && /*#__PURE__*/_jsx("span", {
        style: {
          marginTop: '20px',
          fontSize: '20px',
          fontWeight: 'bold'
        },
        children: label
      })]
    })
  });
};