// custom paths for outside Cypress folder doesn't work
import { LinkElementPair } from '../../components/link-element-pair';

describe('LinkElementPair component', () => {
  const testCases = [
    ['cv', 'cv'],
    ['feed', 'feed'],
    ['github', 'github'],
    ['gitlab', 'gitlab'],
    ['linkedin', 'linkedin'],
    ['default', undefined]
  ];

  testCases.forEach(([_, linkName]) => {
    it(`should render ${_} element correctly`, () => {
      cy.mount(<LinkElementPair linkName={linkName} />);
      const content = cy.get(`[data-testid="${linkName || 'other'}"`);
      content.should('exist');
    });
  });
});
