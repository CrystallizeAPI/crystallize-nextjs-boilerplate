import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import Grid, { GridItem } from 'components/grid';
import ShapeComponents from 'components/shape/components';
import items from 'components/items';

import { List } from './styles';
import query from './query';

export async function getData({ asPath, language }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: { path: asPath, language },
  });

  return data;
}

export default function FolderPage({ folder }) {
  const { children } = folder;

  const gridRelations = folder.components.filter(
    (c) => c.type === 'gridRelations'
  );
  const rest = folder.components.filter((c) => c.type !== 'gridRelations');

  return (
    <Layout title={folder.name}>
      {gridRelations?.map((relations, index) => (
        <div key={index}>
          {relations?.content?.grids?.map((grid, gridIndex) => (
            <Grid
              key={`${index}-${gridIndex}`}
              model={grid}
              cellComponent={({ cell }) => (
                <GridItem data={cell.item} gridCell={cell} />
              )}
            />
          ))}
        </div>
      ))}
      <Outer>
        <Header centerContent>
          <H1>{folder.name}</H1>
          <ShapeComponents components={rest} />
        </Header>
        {children && <List>{children.map((item) => items(item))}</List>}
      </Outer>
    </Layout>
  );
}
