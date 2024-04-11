import type { Meta, StoryObj } from "@storybook/react";

import CustomThemeProvider from "../theme-provider";
import { CssBaseline } from "@mui/material";
import ComingSoonPage from "./index";

const meta = {
  title: "Pages/ComingSoonPage",
  component: ComingSoonPage,
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
            title: "Coming Soon!",
            description: "We are going to launch this feature very soon. Stay tuned!",
            backText: "Back"
        },
    },
  },
} satisfies Meta<typeof ComingSoonPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComingSoon: Story = {};
