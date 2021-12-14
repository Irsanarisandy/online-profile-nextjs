import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

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
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Merienda:wght@400;700&family=Quicksand:wght@300;400;500;600;700&display=swap"
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
