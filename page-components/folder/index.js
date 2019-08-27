import React from 'react';

import { Outer, Header } from 'ui';
import Layout from 'components/layout';
import CategoryItem from 'components/category-item';
import ShapeComponents from 'components/shape/components';

import { List } from './styles';

export default class FolderPage extends React.PureComponent {
  render() {
    const { data } = this.props;
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
  }
}
