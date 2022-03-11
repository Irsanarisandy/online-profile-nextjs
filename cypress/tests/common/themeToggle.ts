/// <reference types="cypress" />
import { Then, When } from 'cypress-cucumber-preprocessor/steps';

let pastTheme = '';

When('user toggle theme', () => {
  cy.window()
    .its('localStorage')
    .then((storage) => {
      pastTheme = storage.getItem('theme') as string;
    });
  cy.get('#themeToggleButton').click();
});

Then('page theme changes', () => {
  if (pastTheme === 'dark')
    cy.window().its('localStorage').its('theme').should('equal', 'light');
  else if (pastTheme === 'light')
    cy.window().its('localStorage').its('theme').should('equal', 'dark');
});
