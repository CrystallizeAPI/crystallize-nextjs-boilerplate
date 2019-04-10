import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import CrystallizeLayout from '@crystallize/react-layout';

import Aside from 'components/aside';

import Header from '../header';
import GraphData from './graph-data';
import { Main } from './styles';

Router.onRouteChangeComplete = () => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview'
    });
  }
};

class Layout extends React.Component {
  render() {
    const {
      children,
      topLevelFolders,
      tenant,
      title,
      description,
      simpleHeader,
      loading,
      error
    } = this.props;

    let displayTitle = tenant ? tenant.company_name : 'Frontend Boilerplate';
    if (title) {
      displayTitle = `${title} - ${displayTitle}`;
    } else if (loading) {
      displayTitle = 'Loading';
    } else if (error) {
      displayTitle = 'Error';
    } else {
      /* eslint-disable */
      console.warn(
        `Layout is missing title attribute. Remember to provide one!`
      );
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
          <Header
            topLevelFolders={topLevelFolders}
            tenant={tenant}
            simple={simpleHeader}
          />
          <Main loading={loading}>
            {loading ? <div>{children || 'Loading...'}</div> : children}
          </Main>
        </CrystallizeLayout>
      </>
    );
  }
}

export default GraphData(Layout);
