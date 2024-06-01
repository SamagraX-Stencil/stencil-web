import { CustomThemeProvider } from '@repo/provider';
import { CssBaseline } from '@mui/material';
import FAQPage from './index';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var meta = {
  title: 'Pages/FAQPage',
  component: FAQPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (Story) {
    return /*#__PURE__*/_jsxs(CustomThemeProvider, {
      children: [/*#__PURE__*/_jsx(CssBaseline, {}), /*#__PURE__*/_jsx(Story, {})]
    });
  }],
  args: {
    config: {
      component: {
        title: 'FAQs',
        userManualText: 'User Manual - For VAWs',
        contactDescriptionText: 'To connect with call centre',
        contactText: 'Dial 155333'
      }
    }
  }
};
export default meta;
export var Faq = {};