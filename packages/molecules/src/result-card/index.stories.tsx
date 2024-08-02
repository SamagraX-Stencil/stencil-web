import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ResultCard } from './index'; // Adjust the import path as needed

const meta: Meta<typeof ResultCard> = {
  title: 'Components/Card',
  component: ResultCard,
  argTypes: {
    bgcolor: { control: 'color' },
    textColor: { control: 'color' },
    name: { control: 'text' },
    secondaryText: { control: 'text' },
    onButtonClick: { action: 'clicked' },
    buttonText: { control: 'text' },
    buttonVariant: {
      control: { type: 'select', options: ['text', 'outlined', 'contained'] },
    },
    isAccordion: { control: 'boolean' },
    icon: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ResultCard>;

export const Default: Story = {
  args: {
    key: '1',
    bgcolor: '#f0f0f0',
    textColor: '#000000',
    name: 'Card Title',
    secondaryText: 'Secondary Text',
    buttonText: 'Click Me',
    buttonVariant: 'contained',
    isAccordion: false,
    icon: '/path/to/icon.png',
  },
};

export const AccordionCard: Story = {
  args: {
    ...Default.args,
    isAccordion: true,
    InfoCard: <div>Accordion Content</div>,
  },
};

export const CustomStyledCard: Story = {
  args: {
    ...Default.args,
    bgcolor: '#e0e0ff',
    textColor: '#0000ff',
    buttonVariant: 'outlined',
    buttonStyle: { borderColor: '#0000ff', color: '#0000ff' },
  },
};
