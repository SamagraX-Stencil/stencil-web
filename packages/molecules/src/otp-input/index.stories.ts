import type { Meta, StoryObj } from '@storybook/react';

import { OTPInput } from './index';
import { fn } from '@storybook/test';

const meta = {
  title: 'Molecule/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    separator: '-',
    length: 4,
    value: '',
    onChange: fn(),
  },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedIn: Story = {
//   args: {
//     json: {
//       name: 'Jane Doe',
//     },
//   },
// };

export const OTP: Story = {};
