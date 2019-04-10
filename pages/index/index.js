import React from 'react';
import { graphql } from 'react-apollo';

import Layout from 'components/layout';
import ProductGrid from 'components/product-grid';
import { H1, Outer, Header } from 'ui';
import graphSettings from './graph-settings';

class FrontPage extends React.Component {
  // Attach the graph settings to the class
  static graph = graphSettings;

  render() {
    const { router, data } = this.props;
    let childrenArray = [];

    if (data && data.length > 0) {
      data.forEach(p => {
        const { children } = p;
        childrenArray = childrenArray.concat(children);
      });
    }

    const productsArray = childrenArray.filter(p => p.type === 'product');

    if (!data) return <Layout loading />;

    if (data.loading) return <Layout loading />;

    return (
      <Layout router={router} title="Front page">
        <Outer>
          <Header>
            <H1>Oh hi there!</H1>
            <p>Cool of you to join us.</p>
          </Header>
          {productsArray && <ProductGrid products={productsArray} />}
        </Outer>
      </Layout>
    );
  }
}

export default graphql(FrontPage.graph.query, FrontPage.graph)(FrontPage);
