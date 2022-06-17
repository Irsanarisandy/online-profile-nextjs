import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { preprocessor } from '@badeball/cypress-cucumber-preprocessor/browserify';
import * as browserify from '@cypress/browserify-preprocessor';
import { defineConfig } from 'cypress';

const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');

const options = {
  ...browserify.defaultOptions,
  typescript: require.resolve('typescript')
};

export async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', preprocessor(config, options));
  on('task', { downloadFile });
  return config;
}

export default defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/tests/**/*.{feature,features}'
  }
});
