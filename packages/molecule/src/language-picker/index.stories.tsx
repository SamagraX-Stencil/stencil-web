import type { Meta, StoryObj } from '@storybook/react';

import LanguagePicker from './index';
import { CustomThemeProvider } from '@samagra-x/provider';

const meta = {
  title: 'Molecule/LanguagePicker',
  component: LanguagePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <CustomThemeProvider>
        <Story />
      </CustomThemeProvider>
    ),
  ],
} satisfies Meta<typeof LanguagePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LanguagePickerComponent: Story = {};
