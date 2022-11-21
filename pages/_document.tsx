import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';

import { publicLinks } from '.data/publicLinks';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link
            rel="alternate"
            href={publicLinks.feedAtom}
            title="Irsan's Atom Feed"
            type="application/atom+xml"
          />
          <link
            rel="alternate"
            href={publicLinks.feedJson}
            title="Irsan's JSON Feed"
            type="application/feed+json"
          />
          <link
            rel="alternate"
            href={publicLinks.feedRss}
            title="Irsan's RSS Feed"
            type="application/rss+xml"
          />
        </Head>
        <body className="transition-colors duration-500">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
