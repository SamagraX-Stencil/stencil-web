import type { Meta, StoryObj } from '@storybook/react';
import { ConfigContext, CustomThemeProvider } from '@repo/provider';
import Navbar from '.';

const meta = {
  title: 'Molecule/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavbarComponent: Story = {};
