import Head from 'next/head';

import { defaultLanguage } from 'lib/language';

export default function MultilingualRedirect() {
  /**
   * We use a HTML redirect here, instead of a server-side 301.
   * This ensures that we can still statically generate the page,
   * and Googlebot will treat this as a 301.
   */
  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; URL=/${defaultLanguage}`} />
    </Head>
  );
}
