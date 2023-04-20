/// <reference types="cypress-downloadfile"/>
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

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

Then('user can see {word} feed in menu', (feedType: string) => {
  cy.get(`#feed${feedType}`)
    .should('have.attr', 'href')
    .and('include', feedLinkMapping[feedType]);
});

When('user generate {word} feed', (feedType: string) => {
  cy.downloadFile(
    `${location.origin}/${feedLinkMapping[feedType]}`,
    'cypress/downloads',
    feedFileMapping[feedType]
  );
});

Then('user downloads {word} feed file', (feedType: string) => {
  cy.readFile(`cypress/downloads/${feedFileMapping[feedType]}`).then(
    (fileContent) => {
      if (feedType === 'JSON')
        expect(fileContent.feed_url).to.contain(feedLinkMapping[feedType]);
      else expect(fileContent).to.contain(feedLinkMapping[feedType]);
    }
  );
});
