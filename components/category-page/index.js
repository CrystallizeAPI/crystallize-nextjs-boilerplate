import React from 'react';
import PropTypes from 'prop-types';

import Layout from 'components/layout';
import Product from 'components/product';
import { H1 } from 'components/style';
import PropTypeProduct from 'lib/prop-types/product';
import GraphData from './graph-data';

import { Outer, Loader, ProductList } from './styles';

class CategoryPage extends React.PureComponent {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypeProduct)
  };

  render() {
    const { data } = this.props;
    return (
      <Layout {...this.props}>
        <Outer>
          <H1>Category page</H1>
          {!data ? (
            <Loader>Loading...</Loader>
          ) : (
            <ProductList>
              {data.products.map(p => <Product key={p.id} data={p} />)}
            </ProductList>
          )}
        </Outer>
      </Layout>
    );
  }
}

export default GraphData(CategoryPage);
