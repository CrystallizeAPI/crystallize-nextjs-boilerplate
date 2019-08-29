import React from 'react';
import Head from 'next/head';
import CrystallizeLayout from '@crystallize/react-layout';

import Aside from 'components/aside';
import Spinner from 'components/spinner';

import Header from '../header';
import {
  Main,
  LoadingWrapper,
  SpinnerWrapper,
  LoadingTextWrapper
} from './styles';

const Layout = ({ children, title, description, simple, loading, error }) => {
  let displayTitle = 'Crystallize';
  if (title) {
    displayTitle = `${title} - ${displayTitle}`;
  } else if (loading) {
    displayTitle = 'Loading';
  } else if (error) {
    displayTitle = 'Error';
  } else {
    /* eslint-disable */
    console.warn(`Layout is missing title attribute. Remember to provide one!`);
    /* eslint-enable */
  }

  return (
    <>
      <Head>
        <title key="title">{displayTitle}</title>
        {description && (
          <meta key="description" name="description" content={description} />
        )}
      </Head>
      <CrystallizeLayout right={simple ? null : Aside}>
        <Header simple={simple} />
        <Main>
          {loading ? (
            <LoadingWrapper>
              <SpinnerWrapper>
                <Spinner size="40" />
              </SpinnerWrapper>
              {children || (
                <LoadingTextWrapper>Please wait...</LoadingTextWrapper>
              )}
            </LoadingWrapper>
          ) : (
            children
          )}
        </Main>
      </CrystallizeLayout>
    </>
  );
};

export default Layout;
