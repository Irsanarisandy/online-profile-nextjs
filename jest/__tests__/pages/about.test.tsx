import { AboutQuery } from '@generatedTina/types';
import About from '@pages/about';
import { render } from '@testing-library/react';

describe('About page', () => {
  const data = {
    about: {
      title: 'Hello world',
      overallDevSkills: [
        {
          name: 'test',
          percentage: 85,
          color: 'red'
        }
      ],
      frontend: ['frontend'],
      backend: ['backend'],
      generalCoding: ['generalCoding'],
      others: ['others']
    }
  };

  const variables = { relativePath: 'About.md' };

  const query = `{
    about(relativePath: "About.md") {
      title,
      body,
      overallDevSkills {
        name
        percentage
        color
      },
      frontend,
      backend,
      generalCoding,
      others
    }
  }`;

  it('should render correctly without data', async () => {
    const view = render(
      <About
        data={{ about: {} } as AboutQuery}
        variables={variables}
        query={query}
      />
    );
    expect(view.queryByTestId('progress-comp')).not.toBeInTheDocument();
    expect(view.queryByTestId('aboutFrontend')).not.toBeInTheDocument();
    expect(view.queryByTestId('aboutBackend')).not.toBeInTheDocument();
    expect(view.queryByTestId('aboutGeneralCoding')).not.toBeInTheDocument();
    expect(view.queryByTestId('aboutOthers')).not.toBeInTheDocument();
  });

  it('should render correctly with data', async () => {
    const view = render(
      <About data={data as AboutQuery} variables={variables} query={query} />
    );
    expect((await view.findByTestId('aboutTitle')).innerHTML).toMatch(
      /Hello world/
    );

    const progressComp = view.queryByTestId('progress-comp');
    expect(progressComp).toBeInTheDocument();
    expect(progressComp?.childElementCount).toBe(
      data.about.overallDevSkills.length
    );

    const aboutFrontend = view.queryByTestId('aboutFrontend');
    expect(aboutFrontend).toBeInTheDocument();
    expect(aboutFrontend?.childElementCount).toBe(data.about.frontend.length);

    const aboutBackend = view.queryByTestId('aboutBackend');
    expect(aboutBackend).toBeInTheDocument();
    expect(aboutBackend?.childElementCount).toBe(data.about.backend.length);

    const aboutGeneralCoding = view.queryByTestId('aboutGeneralCoding');
    expect(aboutGeneralCoding).toBeInTheDocument();
    expect(aboutGeneralCoding?.childElementCount).toBe(
      data.about.generalCoding.length
    );

    const aboutOthers = view.queryByTestId('aboutOthers');
    expect(aboutOthers).toBeInTheDocument();
    expect(aboutOthers?.childElementCount).toBe(data.about.others.length);
  });
});
