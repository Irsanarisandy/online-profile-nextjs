const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-links',
    '@storybook/preset-scss'
  ],
  features: {
    previewMdx2: true,
    interactionsDebugger: true // 👈 Enable playback controls
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../components'),
      '@pages': path.resolve(__dirname, '../pages'),
      '@public': path.resolve(__dirname, '../public')
    };

    return config;
  }
};
