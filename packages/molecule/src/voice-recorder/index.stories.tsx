import type { Meta, StoryObj } from '@storybook/react';
import VoiceRecorder from '.';
import { ConfigContext, CustomThemeProvider } from '@repo/provider';
import { fn } from '@storybook/test';

const meta = {
  title: 'Molecule/VoiceRecorder',
  component: VoiceRecorder,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ConfigContext>
        <CustomThemeProvider>
          <Story />
        </CustomThemeProvider>
      </ConfigContext>
    ),
  ],
  args: {
    setInputMsg: fn(),
    tapToSpeak: false,
  },
} satisfies Meta<typeof VoiceRecorder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VoiceRecorderComponent: Story = {};
