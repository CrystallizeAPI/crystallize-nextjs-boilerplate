import React from 'react';

import Layout from 'components/layout';
import Grid, { GridItem } from 'components/grid';
import { simplyFetchFromGraph } from 'lib/graph';
import fragments from 'lib/graph/fragments';
import { getLanguage } from 'lib/language';

import { Outer } from './styles';

export async function getData() {
  try {
    const { data } = await simplyFetchFromGraph({
      query: `
        query FRONTPAGE($language: String!) {
          catalogue(path: "/web-frontpage", language: $language) {
            ...item
            ...product
          }
        }

        ${fragments}
      `,
      variables: { language: getLanguage() },
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function FrontPage({ catalogue }) {
  const [grid] =
    catalogue?.components?.find((c) => c.type === 'gridRelations')?.content
      ?.grids || [];

  return (
    <Layout title="Home">
      <Outer>
        {grid && (
          <Grid
            model={grid}
            cellComponent={({ cell }) => (
              <GridItem data={cell.item} gridCell={cell} />
            )}
          />
        )}
      </Outer>
    </Layout>
  );
}
