import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';
import items from 'components/items';

import { List } from './styles';
import query from './query';

export async function getData({ asPath, language }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: { path: asPath, language }
  });

  return data;
}

export default function FolderPage({ folder }) {
  const { children } = folder;

  return (
    <Layout title={folder.name}>
      <Outer>
        <Header centerContent>
          <H1>{folder.name}</H1>
          <ShapeComponents components={folder.components} />
        </Header>
        {children && <List>{children.map(item => items(item))}</List>}
      </Outer>
    </Layout>
  );
}
