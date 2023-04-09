import type { Preview } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import results from '../jest-test-results.json';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

export const decorators = [
  withTests({
    results,
    filesExt: '(\\.test)?(\\.tsx?)?$'
  })
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
