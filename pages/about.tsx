import type { GetStaticPropsResult } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useTina } from 'tinacms/dist/react';
import { Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid';

import { Cards } from '.components/cards';
import { Codeblock } from '.components/codeblock';
import { OpacityPageTransitionMotion } from '.components/custom-motion';
import { Progress, ProgressData } from '.components/progress';
import { publicLinks } from '.data/publicLinks';
import { TinaProps } from '.entities/tina-props.interface';
import { client } from '.generatedTina/client';
import { AboutQuery } from '.generatedTina/types';

export default function About(props: TinaProps<AboutQuery>): JSX.Element {
  const { data } = useTina({
    data: props.data,
    variables: props.variables,
    query: props.query
  });

  if (data == null || data.about == null) {
    return <div>About data does not exist!</div>;
  }

  const {
    title,
    body,
    overallDevSkills,
    frontend,
    backend,
    generalCoding,
    others
  } = data.about;

  const overallDevSkillsExist =
    overallDevSkills != null && overallDevSkills.length > 0;
  const frontendExist = frontend != null && frontend.length > 0;
  const backendExist = backend != null && backend.length > 0;
  const generalCodingExist = generalCoding != null && generalCoding.length > 0;
  const othersExist = others != null && others.length > 0;

  const components: Components<{}> = {
    code_block: (codeBlockProps) => (
      <Codeblock language={codeBlockProps?.lang}>
        {codeBlockProps?.value}
      </Codeblock>
    )
  };

  return (
    <>
      <NextSeo
        title="About Me"
        description="An about page containing some information about Irsan Arisandy, as a website developer."
      />
      <OpacityPageTransitionMotion>
        <Cards classes="m-4 sm:m-8 p-4 sm:p-8">
          <h1 data-testid="aboutTitle" className="mb-8">
            {title}
          </h1>
          <div className="markdown">
            <TinaMarkdown content={body} components={components} />
          </div>
          <div className="inline-block border-2 rounded-full mt-8 px-4 py-2">
            <Link id="downloadCV" href={publicLinks.cv} target="_blank">
              <span className="flex">
                <DocumentArrowDownIcon className="h-auto w-[28px]" />
                &nbsp;Download CV
              </span>
            </Link>
          </div>
        </Cards>
        {overallDevSkillsExist && (
          <Cards classes="m-4 sm:m-8 p-4 sm:p-8">
            <Progress progressDataList={overallDevSkills as ProgressData[]} />
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
                <ul data-testid="aboutFrontend">
                  {(frontend as string[]).map((skill: string) => (
                    <li key={`Frontend: ${skill}`}>{skill}</li>
                  ))}
                </ul>
              </Cards>
            )}
            {backendExist && (
              <Cards classes="p-4 sm:p-8">
                <h2 className="mb-2">Backend Skills</h2>
                <ul data-testid="aboutBackend">
                  {(backend as string[]).map((skill: string) => (
                    <li key={`Backend: ${skill}`}>{skill}</li>
                  ))}
                </ul>
              </Cards>
            )}
            {generalCodingExist && (
              <Cards classes="p-4 sm:p-8">
                <h2 className="mb-2">General Coding Skills</h2>
                <ul data-testid="aboutGeneralCoding">
                  {(generalCoding as string[]).map((skill: string) => (
                    <li key={`General: ${skill}`}>{skill}</li>
                  ))}
                </ul>
              </Cards>
            )}
            {othersExist && (
              <Cards classes="p-4 sm:p-8">
                <h2 className="mb-2">Other Skills</h2>
                <ul data-testid="aboutOthers">
                  {(others as string[]).map((skill: string) => (
                    <li key={`Other: ${skill}`}>{skill}</li>
                  ))}
                </ul>
              </Cards>
            )}
          </div>
        )}
      </OpacityPageTransitionMotion>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<TinaProps<AboutQuery>>
> {
  const tinaProps = await client.queries.about({ relativePath: 'About.md' });

  return {
    props: {
      data: tinaProps.data,
      variables: tinaProps.variables,
      query: tinaProps.query
    }
  };
}
