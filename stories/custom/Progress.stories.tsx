import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from '.components/progress';

const meta: Meta<typeof Progress> = {
  title: 'Custom/Progress',
  component: Progress,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Example: Story = {
  args: {
    progressDataList: [
      {
        name: 'Test',
        percentage: 80,
        color: 'green'
      }
    ]
  },
  parameters: {
    jest: ['progress.test.tsx']
  }
};
