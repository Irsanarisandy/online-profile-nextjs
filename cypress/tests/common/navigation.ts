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
    expect(response.body)
      .property('cv')
      .to.be.equal('https://www.dropbox.com/s/lfazvco9hgy6qq0/CV.pdf?dl=1');
    expect(response.body)
      .property('linkedin')
      .to.be.equal('https://www.linkedin.com/in/irsan-arisandy');
    expect(response.body)
      .property('github')
      .to.be.equal('https://github.com/irsanarisandy');
    expect(response.body)
      .property('gitlab')
      .to.be.equal('https://gitlab.com/irsanarisandy');
    expect(response.body)
      .property('feedAtom')
      .to.be.equal('/api/feeddata/atom');
    expect(response.body)
      .property('feedJson')
      .to.be.equal('/api/feeddata/json');
    expect(response.body).property('feedRss').to.be.equal('/api/feeddata/rss');
  });
});
