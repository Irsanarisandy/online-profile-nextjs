import React from 'react';

import HomeContent from './HomeContent';
import { client } from '.generatedTina/client';

export default async function Page() {
  const tinaProps = await client.queries.home({ relativePath: 'Home.md' });

  return <HomeContent tinaProps={tinaProps} />;
}
