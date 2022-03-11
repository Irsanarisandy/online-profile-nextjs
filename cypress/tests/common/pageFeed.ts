/// <reference types="cypress" />
/// <reference types="cypress-downloadfile"/>
import { Then, When } from 'cypress-cucumber-preprocessor/steps';

const feedFileMapping: { [key: string]: string } = {
  Atom: 'atom.xml',
  JSON: 'feed.json',
  RSS: 'feed.xml'
};

const feedLinkMapping: { [key: string]: string } = {
  Atom: 'api/feeddata/atom',
  JSON: 'api/feeddata/json',
  RSS: 'api/feeddata/rss'
};

When('user clicks on feed menu button', () => {
  cy.get('#feedMenuButton').click();
});

Then('user can see feed menu', () => {
  cy.get('#feedAtom')
    .should('have.attr', 'href')
    .and('include', feedLinkMapping['Atom']);
  cy.get('#feedJSON')
    .should('have.attr', 'href')
    .and('include', feedLinkMapping['JSON']);
  cy.get('#feedRSS')
    .should('have.attr', 'href')
    .and('include', feedLinkMapping['RSS']);
});

When('user generate {word} feed', (feedType) => {
  cy.downloadFile(
    `${window.location.origin}/${feedLinkMapping[feedType]}`,
    'cypress/downloads',
    feedFileMapping[feedType]
  );
});

Then('user downloads {word} feed file', (feedType) => {
  cy.readFile(`cypress/downloads/${feedFileMapping[feedType]}`).then(
    (fileContent) => {
      if (feedType === 'JSON')
        expect(fileContent.feed_url).to.contain(feedLinkMapping[feedType]);
      else expect(fileContent).to.contain(feedLinkMapping[feedType]);
    }
  );
});
