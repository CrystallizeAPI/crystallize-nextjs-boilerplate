import Head from 'next/head';

const MetaTags = () => {
  return (
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
    </Head>
  );
};

export default MetaTags;
