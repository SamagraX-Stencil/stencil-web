import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ExamSection from './index';
import { Button } from '@mui/material';

const meta: Meta<typeof ExamSection> = {
  title: 'Components/ExamSection',
  component: ExamSection,
  argTypes: {
    isBackdrop: { control: 'boolean' },
    image: { control: 'text' },
    imageWidth: { control: 'number' },
    imageHeight: { control: 'number' },
    title: { control: 'text' },
    description: { control: 'text' },
    primaryButton: { control: 'object' },
    secondaryButton: { control: 'object' },
    showStudyBird: { control: 'boolean' },
    showResultSection: { control: 'boolean' },
    progressValue: { control: 'number' },
    resultValue: { control: 'text' },
    resultCardData: { control: 'object' },
    resultDescription: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ExamSection>;

export const Default: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    primaryButton: <Button>Primary Button</Button>,
    secondaryButton: <Button>Secondary Button</Button>,
  },
};

export const WithBackdrop: Story = {
  args: {
    ...Default.args,
    isBackdrop: true,
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    image: 'https://via.placeholder.com/98x98',
  },
};

export const WithResultSection: Story = {
  args: {
    ...Default.args,
    showResultSection: true,
    progressValue: 50,
    resultValue: 'Result Value',
    resultCardData: {
      rightAnswer: 10,
      total: 20,
      wrongAnswer: 5,
    },
    resultDescription: 'Result Description',
  },
};

export const WithStudyBird: Story = {
  args: {
    ...Default.args,
    showStudyBird: true,
  },
};
