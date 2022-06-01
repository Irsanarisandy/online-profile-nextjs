import { expect } from '@storybook/jest';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Cards } from '@components/cards';

export default {
  title: 'Custom/Cards',
  component: Cards
} as ComponentMeta<typeof Cards>;

const Template: ComponentStory<typeof Cards> = (args) => <Cards {...args} />;

export const Example = Template.bind({});
Example.args = {
  children: <h1 data-testid="test-card-content">Hello</h1>,
  classes: 'bg-[#111827] text-white hover:bg-gray-700 shadow-gray-900 p-4'
};
Example.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByTestId('test-card-content')).toBeInTheDocument();
};
