import type { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { staticRequest } from 'tinacms';
import { useTina } from 'tinacms/dist/edit-state';
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent
} from 'tinacms/dist/rich-text';
import { DocumentDownloadIcon } from '@heroicons/react/solid';
import { Cards } from '@components/cards';
import Codeblock from '@components/codeblock';
import { OpacityPageTransitionMotion } from '@components/custom-motion';
import { Progress, ProgressData } from '@components/progress';

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
  data: any;
}

const query = `{
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
}`;

const About: NextPage<AboutProp> = (props) => {
  const { data } = useTina({
    query,
    variables: {},
    data: props.data
  });
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
    code_block: (codeBlockProps) => (
      // eslint-disable-next-line react/no-children-prop
      <Codeblock
        children={codeBlockProps?.children}
        language={codeBlockProps?.lang}
      />
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
          <div className="inline-block border-2 rounded-full mt-8 px-4 py-2">
            <Link
              href="https://www.dropbox.com/s/lfazvco9hgy6qq0/CV.pdf?dl=1"
              replace
              passHref
            >
              <a id="downloadCV" target="_blank">
                <span className="flex">
                  <DocumentDownloadIcon className="h-auto w-[28px]" />
                  &nbsp;Download CV
                </span>
              </a>
            </Link>
          </div>
        </Cards>
        {overallWebSkillsExist && (
          <Cards classes="m-4 sm:m-8 p-4 sm:p-8">
            <Progress progressDataList={overallWebSkills} />
          </Cards>
        )}
        {(frontendExist ||
          backendExist ||
          generalCodingExist ||
          othersExist) && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 m-4 sm:m-8">
            {frontendExist && (
              <Cards classes="p-4 sm:p-8">
                <h2 className="mb-2">Frontend Skills</h2>
                <ul>
                  {frontend.map((skill: string) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Cards>
            )}
            {backendExist && (
              <Cards classes="p-4 sm:p-8">
                <h2 className="mb-2">Backend Skills</h2>
                <ul>
                  {backend.map((skill: string) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Cards>
            )}
            {generalCodingExist && (
              <Cards classes="p-4 sm:p-8">
                <h2 className="mb-2">General Coding Skills</h2>
                <ul>
                  {generalCoding.map((skill: string) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Cards>
            )}
            {othersExist && (
              <Cards classes="p-4 sm:p-8">
                <h2 className="mb-2">Other Skills</h2>
                <ul>
                  {others.map((skill: string) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Cards>
            )}
          </div>
        )}
      </OpacityPageTransitionMotion>
    </>
  );
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<AboutProp>
> {
  const data = await staticRequest({ query });

  return {
    props: {
      data
    }
  };
}

export default About;
