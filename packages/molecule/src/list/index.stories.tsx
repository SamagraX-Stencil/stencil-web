import type { Meta, StoryObj } from '@storybook/react';
import { List } from '.';
import { ConfigContext, CustomThemeProvider } from '@repo/provider';

const meta = {
  title: 'Molecule/List',
  component: List,
  tags: ['autodocs'],
  args: {
    items: [
      { id: '1', label: 'item1' },
      { id: '2', label: 'item2' },
      { id: '3', label: 'item3' },
    ],
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
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListComponent: Story = {};
