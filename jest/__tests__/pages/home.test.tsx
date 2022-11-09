import { render } from '@testing-library/react';

import { HomeQuery } from '.generatedTina/types';
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

  it('should render correctly', async () => {
    const view = render(
      <Home data={data as HomeQuery} variables={variables} query={query} />
    );
    expect((await view.findByTestId('homeButtonAbout')).innerHTML).toMatch(
      /About Me/
    );
    expect((await view.findByTestId('homeButtonBlog')).innerHTML).toMatch(
      /My Blog/
    );
  });
});
