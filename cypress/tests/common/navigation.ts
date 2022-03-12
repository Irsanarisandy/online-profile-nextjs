/// <reference types="cypress" />
import { And, Given } from 'cypress-cucumber-preprocessor/steps';

const envMapping: { [key: string]: string } = {
  offline: 'http://localhost:3000/',
  online: 'https://irsanarisandy.vercel.app/'
};

const pageMapping: { [key: string]: string } = {
  home: '/',
  about: '/about'
};

Given('user is {word}', (status) => {
  cy.visit(envMapping[status]);
});

Given('user goes to {word} page', (page) => {
  cy.visit(pageMapping[page]);
});

And('user is at {word} page', (page) => {
  cy.url().should('include', pageMapping[page]);
});

And('links API is valid', () => {
  cy.request(`${window.location.origin}/api/links`).then((response) => {
    expect(response).property('status').to.be.oneOf([200, 304]);
    cy.fixture('testLinks').then((testLinks) => {
      Object.entries(testLinks).map((link) => {
        expect(response.body).property(link[0]).to.be.equal(link[1]);
      });
    });
  });
});
