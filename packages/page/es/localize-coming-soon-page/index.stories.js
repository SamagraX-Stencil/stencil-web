import { CustomThemeProvider } from '@repo/provider';
import { CssBaseline } from '@mui/material';
import ComingSoonPage from './index';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var meta = {
  title: 'Pages/ComingSoonPage',
  component: ComingSoonPage,
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
        title: 'Coming Soon!',
        description: 'We are going to launch this feature very soon. Stay tuned!',
        backText: 'Back'
      }
    }
  }
};
export default meta;
export var ComingSoon = {};