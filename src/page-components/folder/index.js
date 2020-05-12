import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import CategoryItem from 'components/category-item';
import ShapeComponents from 'components/shape/components';

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
        <Header centerContent={!children}>
          <H1>{folder.name}</H1>
          <ShapeComponents components={folder.components} />
        </Header>
        {children && (
          <List>
            {children.map(item => (
              <CategoryItem data={item} key={item.id} />
            ))}
          </List>
        )}
      </Outer>
    </Layout>
  );
}
