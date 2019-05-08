import React from 'react';
import Head from 'next/head';
import CrystallizeLayout from '@crystallize/react-layout';

import Aside from 'components/aside';

import Header from '../header';
import { Main } from './styles';

const Layout = ({
  children,
  title,
  description,
  simpleHeader,
  loading,
  error
}) => {
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
      <CrystallizeLayout right={Aside}>
        <Header simple={simpleHeader} />
        <Main loading={loading}>
          {loading ? <div>{children || 'Loading...'}</div> : children}
        </Main>
      </CrystallizeLayout>
    </>
  );
};

export default Layout;
