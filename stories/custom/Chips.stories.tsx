import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { Chips } from '.components/Chips';

const meta: Meta<typeof Chips> = {
  title: 'Custom/Chips',
  component: Chips,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Chips>;

const labels = ['Storybook', 'Next.js'];

export const Example: Story = {
  args: {
    labels
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    labels.forEach(async (label, index) => {
      expect(
        canvas.getByTestId(`Chip ${index + 1}: ${label}`)
      ).toBeInTheDocument();
    });
  },
  parameters: {
    jest: ['Chips.test.tsx']
  }
};
