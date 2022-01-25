import type { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { staticRequest } from 'tinacms';
import { Components, TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import Cards from '@components/cards';
import Codeblock from '@components/codeblock';
import { OpacityPageTransitionMotion } from '@components/custom-motion';
import Progress, { ProgressData } from '@components/progress';

interface AboutData {
  title: string;
  body: TinaMarkdownContent | TinaMarkdownContent[];
  overallWebSkills: ProgressData[];
  frontend: string[];
  backend: string[];
  generalCoding: string[];
  others: string[];
}

interface AboutProp {
  query: string;
  data: any;
}

const About: NextPage<AboutProp> = ({data}) => {
  const {
    title,
    body,
    overallWebSkills,
    frontend,
    backend,
    generalCoding,
    others
  } = data.getAboutDocument.data as AboutData;

  const overallWebSkillsExist = overallWebSkills && overallWebSkills.length > 0;
  const frontendExist = frontend && frontend.length > 0;
  const backendExist = backend && backend.length > 0;
  const generalCodingExist = generalCoding && generalCoding.length > 0;
  const othersExist = others && others.length > 0;

  const components: Components<{}> = {
    code_block: (props) => (
      // eslint-disable-next-line react/no-children-prop
      <Codeblock children={props?.children} language={props?.lang} />
    )
  };

  return (
    <>
      <Head>
        <meta name="description" content="About Page" />
      </Head>
      <OpacityPageTransitionMotion>
        <Cards classes="m-4 sm:m-8 p-4 sm:p-8">
          {title && <h1 className="mb-8">{title}</h1>}
          <div className="markdown">
            <TinaMarkdown content={body} components={components} />
          </div>
        </Cards>
        {overallWebSkillsExist && <Cards classes="m-4 sm:m-8 p-4 sm:p-8">
          <Progress progressDataList={overallWebSkills} />
        </Cards>}
        {(frontendExist || backendExist || generalCodingExist || othersExist) &&
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 m-4 sm:m-8">
            {frontendExist && <Cards classes="p-4 sm:p-8">
              <h2 className="mb-2">Frontend Skills</h2>
              <ul>
                {frontend.map((skill: string) => <li key={skill}>{skill}</li>)}
              </ul>
            </Cards>}
            {backendExist && <Cards classes="p-4 sm:p-8">
              <h2 className="mb-2">Backend Skills</h2>
              <ul>
                {backend.map((skill: string) => <li key={skill}>{skill}</li>)}
              </ul>
            </Cards>}
            {generalCodingExist && <Cards classes="p-4 sm:p-8">
              <h2 className="mb-2">General Coding Skills</h2>
              <ul>
                {generalCoding.map((skill: string) => <li key={skill}>{skill}</li>)}
              </ul>
            </Cards>}
            {othersExist && <Cards classes="p-4 sm:p-8">
              <h2 className="mb-2">Other Skills</h2>
              <ul>
                {others.map((skill: string) => <li key={skill}>{skill}</li>)}
              </ul>
            </Cards>}
          </div>
        }
      </OpacityPageTransitionMotion>
    </>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<AboutProp>> {
  const query = `
    query {
      getAboutDocument(relativePath: "About.md") {
        data {
          title,
          body,
          overallWebSkills {
            name
            percentage
            color
          },
          frontend,
          backend,
          generalCoding,
          others
        }
      }
    }
  `;
  const data = await staticRequest({ query });

  return {
    props: {
      query,
      data
    }
  };
}

export default About;
