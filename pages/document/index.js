import React from 'react';
import { Query } from 'react-apollo';

import { Outer } from 'ui';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

export default class DocumentPage extends React.PureComponent {
  static async getInitialProps({ asPath }) {
    return {
      asPath
    };
  }

  render() {
    const { asPath: path } = this.props;

    return (
      <Query
        variables={{ path, language: 'en' }}
        query={FETCH_TREE_NODE_AND_MENU}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Layout loading />;
          }

          if (error || !data.tree) {
            return <Layout error />;
          }

          const [document] = data.tree;

          return (
            <Layout title={document.name}>
              <Outer>
                <ShapeComponents components={document.components} />
              </Outer>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
