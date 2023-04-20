import type { Meta, StoryObj } from '@storybook/react';

import { DisplayTextAnimation } from '.components/DisplayTextAnimation';

const meta: Meta<typeof DisplayTextAnimation> = {
  title: 'Custom/Display Text Animation',
  component: DisplayTextAnimation,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof DisplayTextAnimation>;

export const Example: Story = {
  args: {
    paragraph: ['Hello,', 'My name is Irsan']
  }
};
