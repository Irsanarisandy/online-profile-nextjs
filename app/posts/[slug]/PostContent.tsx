'use client';

import Image from 'next/image';
import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { Components, TinaMarkdown } from 'tinacms/dist/rich-text';

import { Cards } from '.components/Cards';
import { Chips } from '.components/Chips';
import { Codeblock } from '.components/Codeblock';
import { OpacityPageTransitionMotion } from '.components/CustomMotion';
import type { PostQuery, PostQueryVariables } from '.generatedTina/types';

export default function PostContent({
  slug,
  tinaProps
}: {
  slug: string;
  tinaProps: {
    data: PostQuery;
    variables: PostQueryVariables;
    query: string;
  };
}) {
  const { data } = useTina({
    data: tinaProps.data,
    variables: tinaProps.variables,
    query: tinaProps.query
  });

  if (data?.post == null) {
    return <div>Post data does not exist!</div>;
  }

  const { title, postDateTime, tags, heroImage, body } = data.post;

  const tagsExist = tags != null && tags.length > 0;

  const displayedDateTime = new Intl.DateTimeFormat(
    typeof navigator !== 'undefined' ? navigator.language : 'en-NZ',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    }
  ).format(new Date(postDateTime as string));

  const components: Components<{}> = {
    code_block: (codeBlockProps) => (
      <Codeblock language={codeBlockProps?.lang}>
        {codeBlockProps?.value as string}
      </Codeblock>
    )
  };

  return (
    <OpacityPageTransitionMotion keyName={`post-${slug}`}>
      <Cards className="m-4 p-4 sm:m-8 sm:p-8">
        <h1 data-tina-field={tinaField(data.post, 'title')}>{title}</h1>
        <span
          className="my-4 block"
          data-tina-field={tinaField(data.post, 'postDateTime')}
        >
          <time>{displayedDateTime}</time>
        </span>
        {tagsExist && (
          <Chips
            labels={tags as string[]}
            clickLocation="tags"
            className="mb-4"
            passedTinaFieldFunc={(i) => tinaField(data.post, 'tags', i)}
          />
        )}
        {heroImage && (
          <div className="w-full">
            <div
              className="mx-auto max-w-md"
              data-tina-field={tinaField(data.post, 'heroImage')}
            >
              <Image
                src={heroImage}
                alt="hero image"
                height={540}
                width={960}
              />
            </div>
          </div>
        )}
        <article
          className="markdown mt-4"
          data-tina-field={tinaField(data.post, 'body')}
        >
          <TinaMarkdown content={body} components={components} />
        </article>
      </Cards>
    </OpacityPageTransitionMotion>
  );
}
