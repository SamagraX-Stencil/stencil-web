import type { Meta, StoryObj } from '@storybook/react';
import { ChatUI } from '.';
import { ConfigContext, CustomThemeProvider } from '@samagra-x/provider';

const meta = {
  title: 'Molecule/ChatUI',
  component: ChatUI,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <ConfigContext>
        <CustomThemeProvider>
          <Story />
        </CustomThemeProvider>
      </ConfigContext>
    ),
  ],
} satisfies Meta<typeof ChatUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChatUIComponent: Story = {};
