import { Prism } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface IProp {
  children?: React.ReactNode;
  language?: string;
}

const Codeblock = ({ children, language }: IProp) => (
  <Prism
    code={children || ''}
    language={language || 'markdown'}
    style={darcula}
  />
);

export default Codeblock;
