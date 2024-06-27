import type { Meta, StoryObj } from '@storybook/react';
import { FullPageLoader } from '.';

const meta = {
  title: 'Molecule/FullPageLoader',
  component: FullPageLoader,
  tags: ['autodocs'],
  args: {
    loading: true,
  },
} satisfies Meta<typeof FullPageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loader: Story = {
  args: {
    background: '#ffffff',
  },
};
