import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';
import { defineConfig } from 'cypress';

const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');

const options = {
  typescript: require.resolve('typescript')
};

export async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', browserify(config, options));
  on('task', { downloadFile });
  return config;
}

export default defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/tests/**/*.{feature,features}'
  }
});
