import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { Cards } from '.components/Cards';

const meta: Meta<typeof Cards> = {
  title: 'Custom/Cards',
  component: Cards,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Cards>;

export const Example: Story = {
  args: {
    children: <h1 data-testid="test-card-content">Hello</h1>,
    className: 'bg-[#111827] text-white hover:bg-gray-700 shadow-gray-900 p-4'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('test-card-content')).toBeInTheDocument();
  },
  parameters: {
    jest: ['Cards.test.tsx']
  }
};
