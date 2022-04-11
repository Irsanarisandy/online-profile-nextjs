import { PropsWithChildren } from 'react';
import TinaCMS from 'tinacms';
import { tinaConfig } from '../schema';

const TinaProvider = ({ children }: PropsWithChildren<object>) => {
  return <TinaCMS {...(tinaConfig as any)}>{children}</TinaCMS>;
};

export default TinaProvider;
