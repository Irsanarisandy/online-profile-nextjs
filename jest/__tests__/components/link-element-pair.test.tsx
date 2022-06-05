import { LinkElementPair } from '@components/link-element-pair';
import { render } from '@testing-library/react';

describe('LinkElementPair component', () => {
  const testCases = [
    ['cv', 'cv'],
    ['feed', 'feed'],
    ['github', 'github'],
    ['gitlab', 'gitlab'],
    ['linkedin', 'linkedin'],
    ['default', undefined]
  ];

  test.each(testCases)('should render %s element correctly', (_, linkName) => {
    const view = render(<LinkElementPair linkName={linkName} />);
    expect(view.getByTestId(linkName || 'other')).toBeInTheDocument();
  });
});
