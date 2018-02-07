import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import PropTypeCategory from 'lib/prop-types/category';
import PropTypeTenant from 'lib/prop-types/tenant';
import Header from '../header';
import GraphData from './graph-data';
import { Outer, Main } from './styles';

class Layout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    tenant: PropTypeTenant,
    categories: PropTypes.arrayOf(PropTypeCategory)
  };

  render() {
    const { children, categories, tenant, title, description } = this.props;
    let displayTitle = tenant ? tenant.company_name : '';
    if (title) {
      displayTitle = `${title} - ${displayTitle}`;
    }

    return (
      <Fragment>
        <Head>
          <title key="title">{displayTitle}</title>
          {description && (
            <meta key="description" name="description" content={description} />
          )}
        </Head>
        <Outer>
          <Header categories={categories} tenant={tenant} />
          <Main>{children}</Main>
        </Outer>
      </Fragment>
    );
  }
}

export default GraphData(Layout);
