import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CrystallizeLayout from '@crystallize/react-layout';
import { BasketProvider } from '@crystallize/react-basket';

import 'components/style/reset';

import PropTypeCategory from 'lib/prop-types/category';
import PropTypeTenant from 'lib/prop-types/tenant';
import Aside from 'cmp/aside';

import Header from '../header';
import GraphData from './graph-data';
import { Main } from './styles';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    tenant: PropTypeTenant,
    categories: PropTypes.arrayOf(PropTypeCategory)
  };

  render() {
    const {
      children,
      categories,
      tenant,
      title,
      description,
      simpleHeader
    } = this.props;

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
          validateEndpoint="/api/basket/validate"
          translations={{
            'basket.remainingUntilFreeShippingApplies':
              'Yo! Put another {remainingUntilFreeShippingApplies},- and the shipping is free!'
          }}
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
