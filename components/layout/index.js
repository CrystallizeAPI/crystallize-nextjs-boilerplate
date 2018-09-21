import React, { Fragment } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import CrystallizeLayout from '@crystallize/react-layout';
import { BasketProvider } from '@crystallize/react-basket';

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
      categories,
      tenant,
      title,
      description,
      simpleHeader,
      loading,
      error
    } = this.props;

    let displayTitle = tenant ? tenant.company_name : '';
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
      <Fragment>
        <Head>
          <title key="title">{displayTitle}</title>
          {description && (
            <meta key="description" name="description" content={description} />
          )}
        </Head>
        <BasketProvider
          shippingCost="199"
          freeShippingMinimumPurchaseAmount="800"
          validateEndpoint="/checkout/validate-basket"
        >
          <CrystallizeLayout right={Aside}>
            <Header
              categories={categories}
              tenant={tenant}
              simple={simpleHeader}
            />
            <Main>{children}</Main>
          </CrystallizeLayout>
        </BasketProvider>
      </Fragment>
    );
  }
}

export default GraphData(Layout);
