import type { Preview } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

export const decorators = [
  withTests({
    results: require('../jest-test-results.json'),
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
