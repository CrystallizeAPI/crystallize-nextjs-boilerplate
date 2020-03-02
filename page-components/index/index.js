import React from 'react';
import { useQuery } from 'urql';

import Grid from 'components/grid-renderer';
import Layout from 'components/layout';
import CategoryItem from 'components/category-item';
import { H1, Outer, Header } from 'ui';
import itemFragment from 'lib/graph/fragments/item';
import productFragment from 'lib/graph/fragments/product';

export default function FrontPage() {
  const [{ fetching, error, data }] = useQuery({
    query: `
      query FRONTPAGE_GRID($id: ID!, $language: String!) {
        grid(id: $id, language: $language) {
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
    variables: { id: '5dc3fe4d43b90109229ee27b', language: 'en' }
  });

  if (fetching) {
    return <Layout loading />;
  }

  if (error || !data) {
    return <Layout error />;
  }

  const { grid } = data;

  return (
    <Layout title="Home">
      <Outer>
        <Header>
          <H1>Oh hi there!</H1>
          <p>Cool of you to join us.</p>
        </Header>

        <Grid
          model={grid}
          renderCellContent={cell => (
            <CategoryItem data={cell.item} gridCell={cell} />
          )}
        />
      </Outer>
    </Layout>
  );
}
