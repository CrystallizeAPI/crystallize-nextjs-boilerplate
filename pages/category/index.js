import React from 'react';
import upper from 'upper-case-first';
import { graphql } from 'react-apollo';

import Layout from 'components/layout';
import { H1 } from 'ui';
import CategoryItem from 'components/category-item';

import graphSettings from './graph-settings';
import { Outer, List } from './styles';

class CategoryPage extends React.PureComponent {
  static getInitialProps({ req, graphData }) {
    if (req) {
      // No category found. Show 404
      if (!graphData.catalogue) {
        const err = new Error();
        err.code = 'ENOENT';
        throw err;
      }
    }
    return {};
  }

  // Attach the graph settings to the class
  static graph = graphSettings;

  render() {
    const { data, router } = this.props;
    const { loading, error, catalogue } = data;
    const title = upper(router.asPath.replace('/', ''));

    if (!catalogue || error) {
      return (
        <Layout {...this.props} title={title}>
          Could not load
          {title}
        </Layout>
      );
    }

    if (loading) {
      return (
        <Layout {...this.props} title={title} loading>
          Loading
          {title}
          ...
        </Layout>
      );
    }

    const { children } = catalogue;

    return (
      <Layout {...this.props} title={title}>
        <Outer>
          <H1>{title}</H1>
          <List>
            {children.map(p => (
              <CategoryItem key={p.id} data={p} />
            ))}
          </List>
        </Outer>
      </Layout>
    );
  }
}

export default graphql(CategoryPage.graph.query, CategoryPage.graph)(
  CategoryPage
);
