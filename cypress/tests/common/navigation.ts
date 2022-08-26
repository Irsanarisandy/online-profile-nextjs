import { Given } from '@badeball/cypress-cucumber-preprocessor';

const envMapping: { [key: string]: string } = {
  offline: 'http://localhost:3000/',
  online: Cypress.env('online-url')
};

const pageMapping: { [key: string]: string } = {
  home: '/',
  about: '/about'
};

Given('user is {word}', (status: string) => {
  cy.visit(envMapping[status]);
});

Given('user goes to {word} page', (page: string) => {
  cy.visit(pageMapping[page]);
  cy.url().should('include', pageMapping[page]);
});

Given('links API is valid', () => {
  cy.request(`${window.location.origin}/api/links`).then((response) => {
    expect(response).property('status').to.be.oneOf([200, 304]);
    cy.fixture('testLinks').then((testLinks) => {
      Object.entries(testLinks).map((link) => {
        expect(response.body).property(link[0]).to.be.equal(link[1]);
      });
    });
  });
});
