import React from 'react';
import { Query } from 'react-apollo';
import Error from 'pages/_error';

import Layout from 'components/layout';
import DocumentPage from 'page-components/document';
import FolderPage from 'page-components/folder';
import ProductPage from 'page-components/product';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';

export default class CatalogPage extends React.Component {
  static getInitialProps({ query, asPath }) {
    const path = query.path ? `/${query.path}` : asPath;
    return { path };
  }

  render() {
    const { path } = this.props;

    return (
      <Query
        variables={{ path, language: 'en' }}
        query={FETCH_TREE_NODE_AND_MENU}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Layout loading title="Loading" />;
          }

          if (error) {
            return <Layout error />;
          }

          if (!data.tree || !data.tree.length) {
            return <Error statusCode="404" />;
          }

          const { tree } = data;
          const { type } = tree[0];

          if (type === 'product') {
            return <ProductPage data={data} />;
          }

          if (type === 'folder') {
            return <FolderPage data={data} />;
          }

          if (type === 'document') {
            return <DocumentPage data={data} />;
          }

          // Unsupported type
          return <layout error />;
        }}
      </Query>
    );
  }
}
