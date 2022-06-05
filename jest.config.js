const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add a custom config, which includes setup options, to be passed to Jest before running each test
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom'
};

module.exports = createJestConfig(customJestConfig);
