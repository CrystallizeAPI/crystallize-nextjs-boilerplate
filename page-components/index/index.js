import React from 'react';

import Layout from 'components/layout';
import ProductGrid from 'components/product-grid';
import { H1, Outer, Header } from 'ui';

import { useTreeNodeAndMenuQuery } from 'lib/graph';

export default function FrontPage() {
  const { fetching, error, data } = useTreeNodeAndMenuQuery();

  if (fetching) {
    return <Layout loading />;
  }

  if (error || !data) {
    return <Layout error />;
  }

  const { tree } = data;

  let productsArray = [];
  if (tree && tree.length > 0) {
    tree.forEach(p => {
      const { children } = p;
      productsArray = productsArray.concat(
        (children || []).filter(c => c.type === 'product')
      );
    });
  }

  return (
    <Layout title="Home">
      <Outer>
        <Header>
          <H1>Oh hi there!</H1>
          <p>Cool of you to join us.</p>
        </Header>
        {productsArray && <ProductGrid products={productsArray} />}
      </Outer>
    </Layout>
  );
}
