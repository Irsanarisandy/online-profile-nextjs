// ***********************************************************
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { preprocessor } from '@badeball/cypress-cucumber-preprocessor/browserify';
import * as browserify from '@cypress/browserify-preprocessor';

const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');

// This function is called when a project is opened or re-opened
// (e.g. due to the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  await addCucumberPreprocessorPlugin(on, config);
  const options = {
    ...browserify.defaultOptions,
    typescript: require.resolve('typescript')
  };
  on('file:preprocessor', preprocessor(config, options));
  on('task', { downloadFile });
  return config;
};
