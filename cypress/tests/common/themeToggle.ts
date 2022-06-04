import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

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
