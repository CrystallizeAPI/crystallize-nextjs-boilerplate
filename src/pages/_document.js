import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { getLocaleFromContext } from 'lib/app-config';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const locale = getLocaleFromContext(ctx);

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        locale,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang={this.props.locale.appLanguage}>
        <Head>
          <link rel="icon" href="/static/favicon.svg" />
          <link rel="mask-icon" href="/static/mask-icon.svg" color="#5bbad5" />
          <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
          <link rel="manifest" href="/static/manifest.json" />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
