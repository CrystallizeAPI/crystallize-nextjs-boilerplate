/**
 * This file is used when we deal with an unknown url, e.g.:
 * /teddy-bears/fluffy-teddy
 * We need to check on the Crystallize end if this is a valid
 * url, typically by querying the catalogue to see if there is
 * an item with this url as path.
 * If we get nothing back from Crystallize, it's a 404
 */

import React from 'react';
import Error from 'pages/_error';
import { useRouter } from 'next/router';

import withGraphQLAndBasket from 'lib/with-graphql-and-basket';
import { useSafePathQuery } from 'lib/graph';
import Layout from 'components/layout';
import DocumentPage from 'page-components/document';
import FolderPage from 'page-components/folder';
import ProductPage from 'page-components/product';
import { useSettings } from 'components/settings-context';

function CataloguePage() {
  const router = useRouter();
  const { language } = useSettings();

  // Get the item type for the current pathname
  const [queryResult] = useSafePathQuery({
    query: `
      query GET_ITEM_FOR_UNKNOWN_URL($language: String!, $path: String) {
        catalogue(language: $language, path: $path) {
          type
        }
      }
    `,
    variables: {
      path: router.asPath,
      language
    }
  });

  const { fetching, error, data } = queryResult;

  if (fetching) {
    return <Layout loading />;
  }

  if (error || !data) {
    return <Layout error />;
  }

  const { catalogue } = data;

  // Nothing in Crystallize at this path. Show 404 page
  if (!catalogue) {
    return <Error statusCode="404" />;
  }

  const { type } = catalogue;

  const Cmp = {
    product: ProductPage,
    folder: FolderPage,
    document: DocumentPage
  }[type];

  /**
   * Render the corresponding type template, or 404
   * if there is no template for the type
   */
  return Cmp ? <Cmp key={router.asPath} /> : <Error statusCode="404" />;
}

export default withGraphQLAndBasket(CataloguePage);
