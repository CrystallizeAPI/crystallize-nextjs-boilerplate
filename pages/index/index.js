import React from 'react';
import { graphql } from 'react-apollo';

import Layout from 'components/layout';
import ProductGrid from 'components/product-grid';
import { H1, Outer, Header } from 'ui';
import graphSettings from './graph-settings';

class FrontPage extends React.Component {
  static getInitialProps({ req, graphData }) {
    if (req) {
      // No category found. Show 404
      if (!graphData || !graphData.catalogue) {
        req.throw404();
      }
    }
    return {};
  }

  // Attach the graph settings to the class
  static graph = graphSettings;

  render() {
    const { router, data } = this.props;
    if (!data || data.loading) return <Layout loading />;
    return (
      <Layout router={router} title="Front page">
        <Outer>
          <Header>
            <H1>Oh hi there!</H1>
            <p>Cool of you to join us.</p>
          </Header>
          {!!data.products && <ProductGrid {...data} />}
        </Outer>
      </Layout>
    );
  }
}
export default graphql(FrontPage.graph.query, FrontPage.graph)(FrontPage);
