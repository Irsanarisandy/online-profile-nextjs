'use client';

import Link from 'next/link';
import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { Components, TinaMarkdown } from 'tinacms/dist/rich-text';

import { Cards } from '.components/Cards';
import { Codeblock } from '.components/Codeblock';
import { OpacityPageTransitionMotion } from '.components/CustomMotion';
import { Progress, ProgressData } from '.components/Progress';
import { publicLinks } from '.data/publicLinks';
import type { AboutQuery, AboutQueryVariables } from '.generatedTina/types';

export default function AboutContent({
  tinaProps
}: {
  tinaProps: {
    data: AboutQuery;
    variables: AboutQueryVariables;
    query: string;
  };
}) {
  const { data } = useTina({
    data: tinaProps.data,
    variables: tinaProps.variables,
    query: tinaProps.query
  });

  if (data?.about == null) {
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
        {codeBlockProps?.value as string}
      </Codeblock>
    )
  };

  return (
    <OpacityPageTransitionMotion keyName="about">
      <Cards className="m-4 p-4 sm:m-8 sm:p-8">
        <h1
          data-testid="aboutTitle"
          className="mb-8"
          data-tina-field={tinaField(data.about, 'title')}
        >
          {title}
        </h1>
        <div
          className="markdown"
          data-tina-field={tinaField(data.about, 'body')}
        >
          <TinaMarkdown content={body} components={components} />
        </div>
      </Cards>
      {overallDevSkillsExist && (
        <Cards className="m-4 p-4 sm:m-8 sm:p-8">
          <Progress
            progressDataList={overallDevSkills as ProgressData[]}
            passedTinaFieldFunc={(i) =>
              tinaField(data.about, 'overallDevSkills', i)
            }
          />
        </Cards>
      )}
      {(frontendExist || backendExist || generalCodingExist || othersExist) && (
        <div className="m-4 grid grid-cols-1 gap-8 sm:m-8 md:grid-cols-2 xl:grid-cols-3">
          {frontendExist && (
            <Cards className="p-4 sm:p-8">
              <h2 className="mb-2">Frontend Skills</h2>
              <ul data-testid="aboutFrontend">
                {(frontend as string[]).map((skill, i) => (
                  <li
                    key={`Frontend: ${skill}`}
                    data-tina-field={tinaField(data.about, 'frontend', i)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Cards>
          )}
          {backendExist && (
            <Cards className="p-4 sm:p-8">
              <h2 className="mb-2">Backend Skills</h2>
              <ul data-testid="aboutBackend">
                {(backend as string[]).map((skill, i) => (
                  <li
                    key={`Backend: ${skill}`}
                    data-tina-field={tinaField(data.about, 'backend', i)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Cards>
          )}
          {generalCodingExist && (
            <Cards className="p-4 sm:p-8">
              <h2 className="mb-2">General Coding Skills</h2>
              <ul data-testid="aboutGeneralCoding">
                {(generalCoding as string[]).map((skill, i) => (
                  <li
                    key={`General: ${skill}`}
                    data-tina-field={tinaField(data.about, 'generalCoding', i)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Cards>
          )}
          {othersExist && (
            <Cards className="p-4 sm:p-8">
              <h2 className="mb-2">Other Skills</h2>
              <ul data-testid="aboutOthers">
                {(others as string[]).map((skill, i) => (
                  <li
                    key={`Other: ${skill}`}
                    data-tina-field={tinaField(data.about, 'others', i)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Cards>
          )}
        </div>
      )}
    </OpacityPageTransitionMotion>
  );
}
