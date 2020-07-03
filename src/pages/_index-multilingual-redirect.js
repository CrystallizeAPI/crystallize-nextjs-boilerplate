/**
 * When multilingual is enabled, this file path should be
 * pages/index.js
 */

import Head from 'next/head';

import { defaultLanguage } from 'lib/language';

/**
 * Redirect all requests from root (/) to your default
 * language root, e.g.: /en
 */
export default function MultilingualRedirect() {
  /**
   * We use a HTML redirect here, instead of a server-side 301.
   * This ensures that it does not require a server, hence being
   * SSG and super fast. Googlebot will treat this as a 301 and
   * you should not expect any SEO penalties
   */
  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; URL=/${defaultLanguage}`} />
    </Head>
  );
}
