import React from 'react';
import upper from 'upper-case-first';
import { graphql } from 'react-apollo';
import Collection from 'components/collection';
import { Outer, Header } from 'ui';
import Layout from 'components/layout';
import CategoryItem from 'components/category-item';

import graphSettings from './graph-settings';
import { List } from './styles';

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
    const { loading, error, catalogue, folder } = data;
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
    const folderData = folder.content_fields.standardCategory;

    return (
      <Layout {...this.props} title={title}>
        <Outer>
          <Header>
            {!!folderData &&
              folderData.data.map(collection => (
                <Collection {...collection} key={collection.id} h1 />
              ))}
          </Header>
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
