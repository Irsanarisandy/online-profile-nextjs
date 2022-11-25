// custom paths for outside Cypress folder doesn't work
import { Chips } from '../../components/chips';

describe('Chips component', () => {
  const testCases = [
    ['without label', undefined],
    ['with label', 'test']
  ];
  const labels = ['Jest', 'Next.js'];

  testCases.forEach(([_, clickLocation]) => {
    it(`should render correctly ${_}`, () => {
      cy.mount(<Chips labels={labels} clickLocation={clickLocation} />);

      labels.forEach(async (label, index) => {
        const content = cy.get(`[data-testid="Chip ${index + 1}: ${label}"]`);
        content.should('exist');
        if (clickLocation) {
          content
            .parent()
            .should('have.attr', 'href')
            .and('eq', `/test/${label}`);
        }
      });
    });
  });
});
