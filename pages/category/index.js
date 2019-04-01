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
      if (!graphData || !graphData.tree) {
        req.throw404();
      }
    }
    return {};
  }

  // Attach the graph settings to the class
  static graph = graphSettings;

  render() {
    const { data, router } = this.props;
    const { loading, error, folder } = data;
    const title = upper(router.asPath.replace('/', ''));
    let folderData = false;

    if (error) {
      return (
        <Layout {...this.props} title={title}>
          Could not load
          {title}
        </Layout>
      );
    }

    if (loading) {
      return <Layout {...this.props} title={title} loading />;
    }

    const { children } = data.tree[0];
    if (folder) {
      const { standardCategory, standardProduct } = folder;
      if (!standardCategory && !standardProduct) folderData = false;
      if (standardCategory) folderData = standardCategory.content;
      if (standardProduct) folderData = standardProduct.content;
      folderData = false;
    }

    return (
      <Layout {...this.props} title={title}>
        <Outer>
          <Header>
            {!!folderData &&
              folderData.paragraphs.map(collection => (
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
