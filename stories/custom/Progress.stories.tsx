import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Progress } from '../../components/progress';

export default {
  title: 'Custom/Progress',
  component: Progress
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const Example = Template.bind({});
Example.args = {
  progressDataList: [
    {
      name: 'Test',
      percentage: 80,
      color: 'green'
    }
  ],
  bgColor: 'aqua'
};
