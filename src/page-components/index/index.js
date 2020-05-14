import React from 'react';
import Grid from '@crystallize/grid-renderer';

import Layout from 'components/layout';
import GridItem from 'components/grid-item';
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
      variables: { gridId: '5ea19e7aba5038001c0180b6', language: 'en' }
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
      {/* <Header>
          <H1>Oh hi there!</H1>
          <p>Cool of you to join us.</p>
        </Header> */}
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
