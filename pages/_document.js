/* eslint react/no-danger: 0  */
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import GlobalStyle from 'ui/global';

import { NODE_ENV, GTM_ID, TENANT_ID, API_URL } from '../server/config';

// These settings will be exposed to the world
const clientConfig = {
  TENANT_ID,
  API_URL
};

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="no">
        <Head>
          <title>Crystallize</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimal-ui"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />

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
          <GlobalStyle />
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
