import type { Meta, StoryObj } from '@storybook/react';
import { ConfigContext, CustomThemeProvider } from '@repo/provider';
import MessageItem from '.';
import { fn } from '@storybook/test';

const meta = {
  title: 'Molecule/MessageItem',
  component: MessageItem,
  tags: ['autodocs'],
  args: {
    message: 'Hello World!',
    chatUi: fn(),
    themeColor: 'primary',
  },
  decorators: [
    (Story) => (
      <ConfigContext>
        <CustomThemeProvider>
          <Story />
        </CustomThemeProvider>
      </ConfigContext>
    ),
  ],
} satisfies Meta<typeof MessageItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageItemComponent: Story = {};
