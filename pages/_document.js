/* eslint react/no-danger: 0  */
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { NODE_ENV, GTM_ID, GRAPH_URL } from '../config';

// These settings will be exposed to the world
const clientConfig = {
  GRAPH_URL
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
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
      <html lang="no">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimal-ui"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicons/safari-pinned-tab.svg"
            color="#8fdecb"
          />
          <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta
            name="msapplication-config"
            content="/static/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />

          {GTM_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = [{ environment: '${NODE_ENV}' }];
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
                `
              }}
            />
          )}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              __crystallizeConfig=${JSON.stringify(clientConfig)};
              __crystallizeConfig.HOST_NAME = location.origin;
              `
            }}
          />
          <script id="stripe-js" src="https://js.stripe.com/v3/" async />
          {this.props.styleTags}
        </Head>
        <body>
          {GTM_ID && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tagmanager noscript tracking"
              />
            </noscript>
          )}
          <Main />
          <script src="https://cdn.polyfill.io/v2/polyfill.js?features=default,fetch" />
          <NextScript />
        </body>
      </html>
    );
  }
}
