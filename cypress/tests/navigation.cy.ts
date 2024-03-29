import { Given } from '@badeball/cypress-cucumber-preprocessor';
// custom paths doesn't work
import { publicLinks } from '../../data/publicLinks';

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
  cy.request(`${location.origin}/api/links`).then((response) => {
    expect(response).property('status').to.be.oneOf([200, 304]);
    Object.entries(publicLinks).forEach((link) => {
      expect(response.body).property(link[0]).to.be.equal(link[1]);
    });
  });
});
