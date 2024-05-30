import LoginMobileAadharPage from './index';
import { CustomThemeProvider } from 'stencil-provider';
import { CssBaseline } from '@mui/material';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var meta = {
  title: 'Pages/Login',
  component: LoginMobileAadharPage,
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
        title: 'Login',
        positiveFeedbackText: 'Like',
        negativeFeedbackText: 'Dislike'
      },
      theme: {
        primaryColor: {
          value: '#FFFFFF'
        },
        secondaryColor: {
          value: '#FFFFFF'
        }
      }
    }
  }
};
export default meta;
export var Login = {};