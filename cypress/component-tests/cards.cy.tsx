// custom paths for outside Cypress folder doesn't work
import { Cards } from '../../components/cards';

describe('Cards component', () => {
  it('should render correctly', () => {
    cy.mount(
      <Cards classes="bg-[#111827] text-white hover:bg-gray-700 shadow-gray-900 p-4">
        <h1 data-cy="test-card-content">Hello</h1>
      </Cards>
    );

    const content = cy.get('[data-cy=test-card-content]');
    content.should('exist');
    content.should('have.text', 'Hello');
  });
});
