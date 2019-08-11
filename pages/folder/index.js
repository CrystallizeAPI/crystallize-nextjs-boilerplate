import React from 'react';
import { Query } from 'react-apollo';

import { Outer, Header } from 'ui';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';
import Layout from 'components/layout';
import CategoryItem from 'components/category-item';
import ShapeComponents from 'components/shape/components';

import { List } from './styles';

export default class FolderPage extends React.PureComponent {
  static async getInitialProps({ asPath }) {
    return {
      namespacesRequired: ['common', 'basket', 'product'],
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

          const [folder] = data.tree;

          const { children } = folder;

          return (
            <Layout title={folder.name}>
              <Outer>
                <Header>
                  <ShapeComponents components={folder.components} />
                </Header>
                {children ? (
                  <List>
                    {children.map(p => (
                      <CategoryItem key={p.id} data={p} />
                    ))}
                  </List>
                ) : (
                  'This folder is empty'
                )}
              </Outer>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
