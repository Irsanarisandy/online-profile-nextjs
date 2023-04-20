import { render } from '@testing-library/react';

import type { HomeQuery } from '.generatedTina/types';
import Home from '.pages/index';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    pathname: '/',
    asPath: '/'
  })
}));

describe('Home page', () => {
  const data = {
    home: {
      intro: ['Hello world']
    }
  };

  const variables = { relativePath: 'Home.md' };

  const query = `{
    home(relativePath: "Home.md") {
      intro
    }
  }`;

  it('should render correctly', () => {
    const view = render(
      <Home data={data as HomeQuery} variables={variables} query={query} />
    );
    expect(view.getByTestId('homeButtonAbout').innerHTML).toMatch(/About Me/);
    expect(view.getByTestId('homeButtonBlog').innerHTML).toMatch(/My Blog/);
  });
});
