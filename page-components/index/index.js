import React from 'react';

import Grid from '@crystallize/grid-renderer/react';
import Layout from 'components/layout';
import Product from 'components/category-item';
import { H1, Outer, Header } from 'ui';

import { useGridQuery } from 'lib/graph';

export default function FrontPage() {
  const { fetching, error, data } = useGridQuery();

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
          renderContent={cell => <Product data={cell.item} />}
        />
      </Outer>
    </Layout>
  );
}
