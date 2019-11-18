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
   * will be fetched later anyways. This approach will
   * save a good handful of milliseconds
   */
  const { fetching, error, data } = useTreeNodeQuery();
  // eslint-disable-next-line no-unused-vars
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

  const { tree } = data;
  const { type } = tree[0];

  const render = {
    product: <ProductPage data={data} />,
    folder: <FolderPage data={data} />,
    document: <DocumentPage data={data} />
  };

  // Unsupported type
  return render[type];
}
