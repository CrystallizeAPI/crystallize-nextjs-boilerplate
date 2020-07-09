import Document, { Head, Main, NextScript } from 'next/document';
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
      <html lang={this.props.locale.appLanguage}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimal-ui"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&family=Roboto:wght@300;400;700&display=swap"
            rel="stylesheet"
          />

          <meta name="theme-color" content="#ffffff" />
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
      </html>
    );
  }
}
