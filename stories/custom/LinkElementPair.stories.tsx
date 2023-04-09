import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { LinkElementPair } from '.components/link-element-pair';

const meta: Meta<typeof LinkElementPair> = {
  title: 'Custom/Link Element Pair',
  component: LinkElementPair,
  tags: ['autodocs'],
  argTypes: {
    linkName: {
      control: 'select',
      options: ['cv', 'feed', 'github', 'gitlab', 'linkedin', 'other']
    }
  }
};

export default meta;
type Story = StoryObj<typeof LinkElementPair>;

export const Example: Story = {
  args: {
    classes: 'block w-14',
    otherIconSize: 38
  },
  play: async ({ canvasElement }) => {
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
        expect(canvas.getByTestId('cv')).toBeInTheDocument();
        break;
      case 'feed':
        expect(canvas.getByTestId('feed')).toBeInTheDocument();
        break;
      case 'github':
        expect(canvas.getByTestId('github')).toBeInTheDocument();
        break;
      case 'gitlab':
        expect(canvas.getByTestId('gitlab')).toBeInTheDocument();
        break;
      case 'linkedin':
        expect(canvas.getByTestId('linkedin')).toBeInTheDocument();
        break;
      default:
        expect(canvas.getByTestId('other')).toBeInTheDocument();
        break;
    }
  },
  parameters: {
    jest: ['link-element-pair.test.tsx']
  }
};
