import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('home buttons exist', () => {
  cy.get('#homeButtonAbout')
    .should('have.attr', 'aria-label')
    .and('include', 'about page button');
  cy.get('#homeButtonBlog')
    .should('have.attr', 'aria-label')
    .and('include', 'blog page button');
});
