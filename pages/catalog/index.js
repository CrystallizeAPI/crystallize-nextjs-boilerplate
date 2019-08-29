import React from 'react';
import Error from 'pages/_error';

import Layout from 'components/layout';
import DocumentPage from 'page-components/document';
import FolderPage from 'page-components/folder';
import ProductPage from 'page-components/product';
import { useTreeNodeAndMenuQuery } from 'lib/graph';

export default function CatalogPage() {
  const { fetching, error, data } = useTreeNodeAndMenuQuery();

  if (fetching) {
    return <Layout loading />;
  }

  if (error) {
    return <Layout error />;
  }

  // Nothing in Crystallize at this path. Show 404 page
  if (!data.tree || !data.tree.length) {
    return <Error statusCode="404" />;
  }

  const { tree } = data;
  const { type } = tree[0];

  if (type === 'product') {
    return <ProductPage data={data} />;
  }

  if (type === 'folder') {
    return <FolderPage data={data} />;
  }

  if (type === 'document') {
    return <DocumentPage data={data} />;
  }

  // Unsupported type
  return <div>This type ({type}) is not supported</div>;
}
