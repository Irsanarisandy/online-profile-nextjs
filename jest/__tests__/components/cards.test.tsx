import { Cards } from '@components/cards';
import { render } from '@testing-library/react';

describe('Cards component', () => {
  it('should render correctly', () => {
    const view = render(
      <Cards>
        <h1 data-testid="test-card-content">Hello</h1>
      </Cards>
    );

    const content = view.getByTestId('test-card-content');

    expect(content).toBeInTheDocument();
    expect(content.tagName.toLowerCase()).toBe('h1');
    expect(content.innerHTML).toBe('Hello');
  });
});
