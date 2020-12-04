import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
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

  const tenant = process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_IDENTIFIER;
  const headTitle = title ? `${title} | ${tenant}` : `${tenant}`;

  //@TODO add url to .env
  const siteUrl = null;

  const canonical = siteUrl ? `${siteUrl}${router?.asPath}` : router?.asPath;

  const SEO = {
    title: headTitle,
    description,
    canonical,
    openGraph: {
      type: 'website',
      url: canonical,
      title: headTitle,
      description,
      ...(image && { images: [image] }),
      site_name: tenant
    },
    twitter: {
      // handle: '@handle',
      site: canonical,
      cardType: 'summary_large_image'
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/static/favicon.svg" />
        <link rel="mask-icon" href="/static/mask-icon.svg" color="#5bbad5" />
        <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
        <link rel="manifest" href="/static/manifest.json" />
      </Head>
      <NextSeo {...SEO} />

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
