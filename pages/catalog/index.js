import React from 'react';
import Error from 'pages/_error';

import Layout from 'components/layout';
import DocumentPage from 'page-components/document';
import FolderPage from 'page-components/folder';
import ProductPage from 'page-components/product';
import { useTreeNodeQuery, useMenuAndTenantQuery } from 'lib/graph';

export default function CatalogPage() {
  /**
   * Get both the current component at the path and
   * also the top menu and tenant settings. We do both
   * here since the menu and tenant query most likely
   * will be executed later anyways. This approach will
   * save a good handful of milliseconds
   */
  const { fetching, error, data } = useTreeNodeQuery();
  const menuAndTenantResult = useMenuAndTenantQuery();

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

  if (menuAndTenantResult.data && typeof window === 'undefined') {
    // eslint-disable-next-line no-console
    console.log('Populated cache for tenant and menu');
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
