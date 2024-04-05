import type { Meta, StoryObj } from "@storybook/react";

import LoginMobileAadharPage from "./index";
import CustomThemeProvider from "../theme-provider";
import { CssBaseline } from "@mui/material";

const meta = {
  title: "Pages/Login",
  component: LoginMobileAadharPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <CustomThemeProvider>
        <CssBaseline />
        <Story />
      </CustomThemeProvider>
    ),
  ],
  args: {
    config: {
      component: {
        title: "Login",
        positiveFeedbackText: "Like",
        negativeFeedbackText: "Dislike",
      },
      theme: {
        primaryColor: {
          value: "#FFFFFF",
        },
        secondaryColor: {
          value: "#FFFFFF",
        },
      },
    },
  },
} satisfies Meta<typeof LoginMobileAadharPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {};
