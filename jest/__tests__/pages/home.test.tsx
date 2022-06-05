import Home from '@pages/index';
import { render } from '@testing-library/react';

describe('Home page', () => {
  const data = {
    home: {
      intro: ['Hello world']
    }
  };

  it('should render correctly', async () => {
    const view = render(<Home data={data} />);
    expect((await view.findByTestId('homeButtonAbout')).innerHTML).toMatch(
      /About Me/
    );
    expect((await view.findByTestId('homeButtonBlog')).innerHTML).toMatch(
      /My Blog/
    );
  });
});
