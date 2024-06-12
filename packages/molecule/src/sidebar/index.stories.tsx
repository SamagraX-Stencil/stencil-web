import type { Meta, StoryObj } from '@storybook/react';
import { ConfigContext, CustomThemeProvider } from '@samagra-x/provider';
import Sidebar from '.';
import { fn } from '@storybook/test';

const meta = {
  title: 'Molecule/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  args: {
    isOpen: false,
    onToggle: fn(),
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
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SidebarComponent: Story = {};
