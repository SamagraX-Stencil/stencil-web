import type { Meta, StoryObj } from '@storybook/react';
import { ConfigContext, CustomThemeProvider } from '@samagra-x/stencil-provider';
import ShareButtons from '.';

const meta = {
  title: 'Molecule/ShareButtons',
  component: ShareButtons,
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
} satisfies Meta<typeof ShareButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const ShareButtonsComponent: Story = {};
