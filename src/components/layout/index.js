import React from 'react';
import Head from 'next/head';
import CrystallizeLayout from '@crystallize/react-layout';

import { Spinner } from 'ui';
import GlobalStyle from 'ui/global';
import { useRouter } from 'next/router';
import Aside from './aside';
import Header from './header';
import Footer from './footer';
import {
  Main,
  LoadingWrapper,
  SpinnerWrapper,
  LoadingTextWrapper
} from './styles';

function Loader({ children }) {
  return (
    <LoadingWrapper>
      <div>
        <SpinnerWrapper>
          <Spinner size="40" />
        </SpinnerWrapper>
        <LoadingTextWrapper>{children || 'Please wait...'}</LoadingTextWrapper>
      </div>
    </LoadingWrapper>
  );
}

export default function Layout({
  children,
  title,
  description,
  image,
  simple,
  loading,
  preview
}) {
  const router = useRouter();
  const headTilte = title
    ? `${title} | ${process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_IDENTIFIER}`
    : `${process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_IDENTIFIER}`;

  //@TODO add url to .env
  const siteUrl = null;
  return (
    <>
      <Head>
        <title key="title">{headTilte}</title>
        <meta name="title" content={headTilte} />
        <meta property="og:title" content={headTilte} />
        <meta property="twitter:title" content={headTilte} />
        {siteUrl && (
          <link href={`${siteUrl}${router?.asPath}`} rel="canonical" />
        )}
        {description && (
          <>
            <meta key="description" name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
          </>
        )}
        {image && (
          <>
            <meta property="og:image" content={image} />
            <meta property="twitter:image" content={image} />
          </>
        )}

        {/* Preconnect to Crystallize media CDN */}
        <link rel="preconnect" href="https://media.crystallize.com" />

        {/* Favicon */}
        <link rel="icon" href="/static/favicon.svg" />
        <link rel="mask-icon" href="/static/mask-icon.svg" color="#5bbad5" />
        <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
        <link rel="manifest" href="/static/manifest.json" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={siteUrl ? `${siteUrl}${router?.asPath}` : router?.asPath}
        />
        <meta
          property="twitter:url"
          content={siteUrl ? `${siteUrl}${router?.asPath}` : router?.asPath}
        />

        <meta property="twitter:card" content="summary_large_image" />
      </Head>
      <GlobalStyle />

      {simple ? (
        <>
          <Header simple={simple} preview={preview} />
          <Main>{loading ? <Loader /> : children}</Main>
          <Footer />
        </>
      ) : (
        <CrystallizeLayout right={Aside}>
          <Header simple={simple} preview={preview} />
          <Main>{loading ? <Loader /> : children}</Main>
          <Footer />
        </CrystallizeLayout>
      )}
    </>
  );
}
