import { PropsWithChildren } from 'react';
import { Prism } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface IProp {
  language?: string;
}

const Codeblock = ({ children, language }: PropsWithChildren<IProp>) => (
  <Prism language={language || 'markdown'} style={darcula}>
    {children?.toString() || ''}
  </Prism>
);

export default Codeblock;
