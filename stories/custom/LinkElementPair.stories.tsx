import { expect } from '@storybook/jest';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { LinkElementPair } from '@components/link-element-pair';

export default {
  title: 'Custom/Link Element Pair',
  component: LinkElementPair,
  argTypes: {
    linkName: {
      control: 'select',
      options: ['cv', 'feed', 'github', 'gitlab', 'linkedin', 'other']
    }
  }
} as ComponentMeta<typeof LinkElementPair>;

const Template: ComponentStory<typeof LinkElementPair> = (args) => (
  <LinkElementPair {...args} />
);

export const Example = Template.bind({});
Example.args = {
  classes: 'w-14',
  otherIconSize: 38
};
Example.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const stringArgs =
    new URLSearchParams(window.location.search).get('args') || '';
  const args: { [key: string]: string } = {};
  if (stringArgs !== '') {
    stringArgs.split(';').forEach((stringArg) => {
      const keyValue = stringArg.split(':');
      args[keyValue[0]] = keyValue[1];
    });
  }
  switch (args.linkName) {
    case 'cv':
      await expect(canvas.getByTestId('cv')).toBeInTheDocument();
      break;
    case 'feed':
      await expect(canvas.getByTestId('feed')).toBeInTheDocument();
      break;
    case 'github':
      await expect(canvas.getByTestId('github')).toBeInTheDocument();
      break;
    case 'gitlab':
      await expect(canvas.getByTestId('gitlab')).toBeInTheDocument();
      break;
    case 'linkedin':
      await expect(canvas.getByTestId('linkedin')).toBeInTheDocument();
      break;
    default:
      await expect(canvas.getByTestId('other')).toBeInTheDocument();
      break;
  }
};
