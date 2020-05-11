import React from 'react';
import Grid from '@crystallize/grid-renderer';

import Layout from 'components/layout';
import CategoryItem from 'components/category-item';
import { H1, Header } from 'ui';
import { simplyFetchFromGraph } from 'lib/graph';
import itemFragment from 'lib/graph/fragments/item';
import productFragment from 'lib/graph/fragments/product';

import { Outer } from './styles';

export async function getData() {
  try {
    const { data } = await simplyFetchFromGraph({
      query: `
        query FRONTPAGE($gridId: ID!, $language: String!) {
          grid(language: $language, id: $gridId) {
            id
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
      
        ${itemFragment}
        ${productFragment}
      `,
      variables: { gridId: '5dc3fe4d43b90109229ee27b', language: 'en' }
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function FrontPage({ grid }) {
  return (
    <Layout title="Home">
      <Outer>
        <Header>
          <H1>Oh hi there!</H1>
          <p>Cool of you to join us.</p>
        </Header>

        {grid && (
          <Grid
            model={grid}
            cellComponent={({ cell }) => (
              <CategoryItem data={cell.item} gridCell={cell} />
            )}
          />
        )}
      </Outer>
    </Layout>
  );
}
