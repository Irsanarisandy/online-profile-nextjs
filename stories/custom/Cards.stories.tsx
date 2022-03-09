import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Cards } from '../../components/cards';

export default {
  title: 'Custom/Cards',
  component: Cards
} as ComponentMeta<typeof Cards>;

const Template: ComponentStory<typeof Cards> = (args) => <Cards {...args} />;

export const Example = Template.bind({});
Example.args = {
  children: <h1>Hello</h1>,
  classes: 'bg-[#111827] text-white hover:bg-gray-700 shadow-gray-900 p-4'
};
