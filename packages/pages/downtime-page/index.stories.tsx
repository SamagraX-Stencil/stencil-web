import type { Meta, StoryObj } from '@storybook/react'

import { CustomThemeProvider } from '@stencil/provider'
import { CssBaseline } from '@mui/material'
import DowntimePage from './index'

const meta = {
  title: 'Pages/DowntimePage',
  component: DowntimePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <CustomThemeProvider>
        <CssBaseline />
        <Story />
      </CustomThemeProvider>
    ),
  ],
  args: {
    config: {
      component: {
        title: "We're under maintainance",
        downTimeImage: '/src/pages/downtime-page/assets/downTimeGIF.gif',
        supportingText: 'Have an urgent query?',
        contactLink: 'Call Ama Krushi',
        refreshText: 'Try Again',
        previousPageText: 'Previous Page',
      },
    },
  },
} satisfies Meta<typeof DowntimePage>

export default meta
type Story = StoryObj<typeof meta>

export const Downtime: Story = {}
