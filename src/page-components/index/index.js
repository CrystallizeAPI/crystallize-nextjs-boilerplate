import React from 'react';
import Grid from '@crystallize/grid-renderer';

import Layout from 'components/layout';
import GridItem from 'components/grid-item';
import { simplyFetchFromGraph } from 'lib/graph';
import itemFragment from 'lib/graph/fragments/item';
import productFragment from 'lib/graph/fragments/product';

import { Outer } from './styles';

export async function getData() {
  try {
    const { data } = await simplyFetchFromGraph({
      query: `
        query FRONTPAGE($language: String!) {
          catalogue(path: "/frontpage", language: $language) {
            components {
              name
              type
              content {
                ... on GridRelationsContent {
                  grids {
                    name
                    rows {
                      columns {
                        layout {
                          rowspan
                          colspan
                        }
                        itemType
                        itemId
                        item {
                          ... on Item {
                            ...item
                            ...product
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      
        ${itemFragment}
        ${productFragment}
      `,
      variables: { language: 'en' },
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
