import { expect } from '@storybook/jest';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Chips } from '@components/chips';

export default {
  title: 'Custom/Chips',
  component: Chips
} as ComponentMeta<typeof Chips>;

const Template: ComponentStory<typeof Chips> = (args) => <Chips {...args} />;

const labels = ['Storybook', 'Next.js'];

export const Example = Template.bind({});
Example.args = {
  labels,
  clickLocation: ''
};
Example.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  labels.forEach(async (label, index) => {
    await expect(
      canvas.getByTestId(`Chip ${index + 1}: ${label}`)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(`Chip ${index + 1}: ${label}`)
    ).toHaveAttribute('href', `/${label}`);
  });
};
