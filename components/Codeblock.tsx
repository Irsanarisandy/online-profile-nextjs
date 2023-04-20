import { Prism, type SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function Codeblock({
  language = 'markdown',
  children
}: SyntaxHighlighterProps): JSX.Element {
  return (
    <Prism language={language} style={darcula}>
      {children?.toString() || ''}
    </Prism>
  );
}
