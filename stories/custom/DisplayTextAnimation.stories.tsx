import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DisplayTextAnimation } from '../../components/display-text-animation';

export default {
  title: 'Custom/Display Text Animation',
  component: DisplayTextAnimation
} as ComponentMeta<typeof DisplayTextAnimation>;

const Template: ComponentStory<typeof DisplayTextAnimation> = (args) => (
  <DisplayTextAnimation {...args} />
);

export const Example = Template.bind({});
Example.args = {
  paragraph: ['Hello,', 'My name is Irsan']
};
