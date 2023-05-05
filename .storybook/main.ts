import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: require('sass')
        }
      }
    }
  ],
  features: {
    buildStoriesJson: true
  },
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  core: {
    disableTelemetry: true
  },
  webpackFinal: async (config) => {
    if (config.resolve == null) config.resolve = {};

    config.resolve.alias = {
      ...config.resolve.alias,
      '.app': path.resolve(__dirname, '../app'),
      '.components': path.resolve(__dirname, '../components'),
      '.images': path.resolve(__dirname, '../public/images'),
      '.pages': path.resolve(__dirname, '../pages'),
      '.styles': path.resolve(__dirname, '../styles')
    };

    return config;
  }
};

export default config;
