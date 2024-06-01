import { useUiConfig, useColorPalates } from '@repo/hooks';
import styles from './index.module.css';

// import Image from 'next/image';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var LaunchPage = function LaunchPage() {
  var _theme$primary;
  var config = useUiConfig('component', 'launchPage');
  var theme = useColorPalates();
  return /*#__PURE__*/_jsxs("div", {
    className: "".concat(styles.container),
    style: {
      background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main
    },
    children: [/*#__PURE__*/_jsx("img", {
      className: styles.loginImage,
      src: config === null || config === void 0 ? void 0 : config.logo,
      alt: "KrushakOdisha",
      width: 220,
      height: 233
    }), /*#__PURE__*/_jsx("span", {
      children: config === null || config === void 0 ? void 0 : config.label
    })]
  });
};
export default LaunchPage;