import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CrystallizeLayout from '@crystallize/react-layout';
import { BasketProvider, TinyBasket } from '@crystallize/react-basket';

import PropTypeCategory from 'lib/prop-types/category';
import PropTypeTenant from 'lib/prop-types/tenant';

import Header from '../header';
import GraphData from './graph-data';
import registerServiceWorker from './register-sw';
import { Main } from './styles';

class Layout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    tenant: PropTypeTenant,
    categories: PropTypes.arrayOf(PropTypeCategory)
  };

  componentDidMount() {
    registerServiceWorker();
  }

  render() {
    const { children, categories, tenant, title, description } = this.props;
    let displayTitle = tenant ? tenant.company_name : '';
    if (title) {
      displayTitle = `${title} - ${displayTitle}`;
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
        >
          <CrystallizeLayout right={TinyBasket} blurContentOnShow>
            <Header categories={categories} tenant={tenant} />
            <Main>{children}</Main>
          </CrystallizeLayout>
        </BasketProvider>
      </Fragment>
    );
  }
}

export default GraphData(Layout);
