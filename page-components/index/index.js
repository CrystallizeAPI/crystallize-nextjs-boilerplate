import React from 'react';
import { Query } from 'react-apollo';

import Layout from 'components/layout';
import ProductGrid from 'components/product-grid';
import { H1, Outer, Header } from 'ui';

import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';

export default class FrontPage extends React.Component {
  render() {
    return (
      <Query
        query={FETCH_TREE_NODE_AND_MENU}
        variables={{ path: '/', language: 'en' }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Layout loading />;
          }

          if (error) {
            return <Layout error />;
          }

          const { tree } = data;

          let productsArray = [];
          if (tree && tree.length > 0) {
            tree.forEach(p => {
              const { children } = p;
              productsArray = productsArray.concat(
                (children || []).filter(c => c.type === 'product')
              );
            });
          }

          return (
            <Layout title="Home">
              <Outer>
                <Header>
                  <H1>Oh hi there!</H1>
                  <p>Cool of you to join us.</p>
                </Header>
                {productsArray && <ProductGrid products={productsArray} />}
              </Outer>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
