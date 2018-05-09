import React from 'react';
import PropTypes from 'prop-types';
import upper from 'upper-case-first';

import Layout from 'components/layout';
import { H1 } from 'components/style';
import CategoryItem from 'components/category-item';
import withData from 'lib/with-data';
import PropTypeProduct from 'lib/prop-types/product';
import GraphData from './graph-data';

import { Outer, Loader, List } from './styles';

class CategoryPage extends React.PureComponent {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypeProduct)
  };

  render() {
    const { data, router } = this.props;
    const title = upper(router.asPath.replace('/', ''));

    return (
      <Layout {...this.props} title={title}>
        <Outer>
          <H1>Category page</H1>
          {!data ? (
            <Loader>Loading...</Loader>
          ) : (
            <List>
              {data.products.map(p => <CategoryItem key={p.id} data={p} />)}
            </List>
          )}
        </Outer>
      </Layout>
    );
  }
}

export default withData(GraphData(CategoryPage));
