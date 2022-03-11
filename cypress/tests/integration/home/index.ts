/// <reference types="cypress" />
import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('home buttons exist', () => {
  cy.get('#homeButtonAbout')
    .should('have.attr', 'aria-label')
    .and('include', 'about page button');
  cy.get('#homeButtonBlog')
    .should('have.attr', 'aria-label')
    .and('include', 'blog page button');
});
