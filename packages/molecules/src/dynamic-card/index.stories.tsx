import { Meta, StoryObj } from '@storybook/react';
import DynamicCard from './index';
const meta: Meta<typeof DynamicCard> = {
  title: 'Components/DynamicCard',
  component: DynamicCard,
  argTypes: {
    outerAccordion: {
      control: 'object',
      description: 'Outer accordion props',
    },
    results: {
      control: 'object',
      description: 'Array of card props',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DynamicCard>;

const outerAccordion = {
  title: 'Accordion Title',
  date: '2023-02-20',
  index: 1,
};

const results = [
  {
    assessee_id: '101943588',
    assessor_id: '651f26dc-2081-472d-b46a-60001ad91b04',
    competency_id: '63b673df-ece9-442d-961a-81763253d434',
    isAccordion: true,
    grade: 'failed',
    level: 3,
    metadata: {
      start_time: '2024-07-31T16:43:15.769+05:30',
      end_time: '2024-07-31T16:43:23.258+05:30',
      type: 'non-verbal',
    },
    player_id: 'ff839ec7-2c6c-4931-bedd-7dd7a378ab62',
    results: {
      group_id: '9kLswRFIlcrB',
      max_score: '4',
      scored: '4',
      answered_right: [],
      answered_wrong: [],
      track: 'Hindi',
    },
  },
  {
    assessee_id: '101943588',
    assessor_id: '651f26dc-2081-472d-b46a-60001ad91b04',
    competency_id: '63b673df-ece9-442d-961a-81763253d434',
    grade: 'Passed',
    isAccordion: true,
    level: 3,
    metadata: {
      start_time: '2024-07-31T16:43:15.769+05:30',
      end_time: '2024-07-31T16:43:23.258+05:30',
      type: 'non-verbal',
    },
    player_id: 'ff839ec7-2c6c-4931-bedd-7dd7a378ab62',
    results: {
      group_id: '9kLswRFIlcrB',
      max_score: '4',
      scored: '4',
      answered_right: [],
      answered_wrong: [],
      track: 'Hindi',
    },
  },
];

export const Default: Story = {
  args: {
    outerAccordion,
    results,
  },
};

export const WithMultipleResults: Story = {
  args: {
    outerAccordion,
    results: results,
  },
};

export const WithNoResults: Story = {
  args: {
    outerAccordion,
    results: [],
  },
};

export const CustomStyledCard: Story = {
  args: {
    outerAccordion,
    results,
  },
};
