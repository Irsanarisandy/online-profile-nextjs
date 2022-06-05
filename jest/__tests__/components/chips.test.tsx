import { Chips } from '@components/chips';
import { render } from '@testing-library/react';

describe('Chips component', () => {
  const testCases = [
    ['without label', undefined],
    ['with label', 'test']
  ];
  const labels = ['Jest', 'Next.js'];

  test.each(testCases)('should render correctly %s', (_, clickLocation) => {
    const view = render(
      <Chips labels={labels} clickLocation={clickLocation} />
    );

    labels.forEach(async (label, index) => {
      const content = view.getByTestId(`Chip ${index + 1}: ${label}`);
      expect(content).toBeInTheDocument();
      if (clickLocation) {
        expect(content).toHaveAttribute('href', `/test/${label}`);
      }
    });
  });
});
