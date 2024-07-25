import type { Meta, StoryObj } from '@storybook/react';
import ProfileCard from './index';

const meta = {
  title: 'Molecule/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'John Doe',
    profileType: 'teacher',
    district: 'Agra',
    block: 'Block A',
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TeacherGold: Story = {
  args: {
    name: 'आकाश सिंगला',
    profileType: 'teacher',
    teacherDetails: {
      type: 'gold',
      imageUrl: '/gold.png',
    },
  },
};

export const TeacherSilver: Story = {
  args: {
    name: 'आकाश सिंगला',
    profileType: 'teacher',
    teacherDetails: {
      type: 'silver',
      imageUrl: '/silver.png',
    },
  },
};

export const TeacherBronze: Story = {
  args: {
    name: 'आकाश सिंगला',
    profileType: 'teacher',
    teacherDetails: {
      type: 'bronze',
      imageUrl: '/bronze.png',
    },
  },
};

export const Student: Story = {
  args: {
    name: 'रूद्रम सिंह',
    profileType: 'student',
    studentDetails: {
      id: '0987654321',
      grade: 2,
      roll_no: 6565,
      imageUrl: '/information-bird.png',
    },
  },
};
