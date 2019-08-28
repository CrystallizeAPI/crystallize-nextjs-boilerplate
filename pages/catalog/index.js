import React from 'react';
import Error from 'pages/_error';

import Layout from 'components/layout';
import DocumentPage from 'page-components/document';
import FolderPage from 'page-components/folder';
import ProductPage from 'page-components/product';
import { useTreeNodeAndMenuQuery } from 'lib/graph';

export default function CatalogPage() {
  const { loading, error, data } = useTreeNodeAndMenuQuery();

  if (error) {
    return <Layout error />;
  }

  if (loading || !data) {
    return <Layout loading />;
  }

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
  return <div error />;
}
