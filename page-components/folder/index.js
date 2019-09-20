import React from 'react';

import { Grid } from '@crystallize/grid-renderer/react';
import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import Product from 'components/category-item';
import ShapeComponents from 'components/shape/components';

export default class FolderPage extends React.PureComponent {
  render() {
    const { data } = this.props;
    const [folder] = data.tree;
    const { children } = folder;

    const cells = children
      ? children.map(item => ({
          item: {
            ...item
          }
        }))
      : null;

    return (
      <Layout title={folder.name}>
        <Outer>
          <Header>
            <H1>{folder.name}</H1>
            <ShapeComponents components={folder.components} />
          </Header>
          {children && (
            <Grid
              cells={cells}
              renderCellContent={cell => <Product data={cell.item} />}
            />
          )}
        </Outer>
      </Layout>
    );
  }
}
