import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Chips } from '../../components/chips';

export default {
  title: 'Custom/Chips',
  component: Chips
} as ComponentMeta<typeof Chips>;

const Template: ComponentStory<typeof Chips> = (args) => <Chips {...args} />;

export const Example = Template.bind({});
Example.args = {
  labels: ['Storybook', 'Next.js']
};
