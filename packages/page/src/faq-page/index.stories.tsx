import type { Meta, StoryObj } from '@storybook/react';

import { CustomThemeProvider } from '@samagra-x/provider';
import { CssBaseline } from '@mui/material';
import FAQPage from './index';

const meta = {
  title: 'Pages/FAQPage',
  component: FAQPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
        title: 'FAQs',
        userManualText: 'User Manual - For VAWs',
        contactDescriptionText: 'To connect with call centre',
        contactText: 'Dial 155333',
      },
    },
  },
} satisfies Meta<typeof FAQPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Faq: Story = {};
