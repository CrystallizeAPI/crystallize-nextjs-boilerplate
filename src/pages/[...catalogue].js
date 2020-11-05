/**
 * This file is used when we deal with an unknown url, e.g.:
 * /teddy-bears/fluffy-teddy
 * We need to check on the Crystallize end if this is a valid
 * url, typically by querying the catalogue to see if there is
 * an item with this url as path.
 * If we get nothing back from Crystallize, it's a 404
 */

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';

import { simplyFetchFromGraph } from 'lib/graph';
import { urlToSpec } from 'lib/search';
import { getLocaleFromContext, getValidLocale } from 'lib/app-config';
import Layout from 'components/layout';

import DocPage, { getData as getDataDoc } from 'page-components/document';
import FolderPage, { getData as getDataFolder } from 'page-components/folder';
import ProdPage, { getData as getDataProd } from 'page-components/product';
import SearchPage, { getData as getDataSearch } from 'page-components/search';

const renderers = {
  document: {
    component: DocPage,
    getData: getDataDoc
  },
  folder: {
    component: FolderPage,
    getData: getDataFolder
  },
  product: {
    component: ProdPage,
    getData: getDataProd
  },
  search: {
    component: SearchPage,
    getData: getDataSearch
  }
};

// Returns true if more than half of the children are products
function childrenIsMostlyProducts(children) {
  const productsCount = children.filter((c) => c.type === 'product').length;
  return productsCount > children.length / 2;
}

export async function getStaticProps(context) {
  const { params, preview } = context;
  const { catalogue } = params;
  const locale = getLocaleFromContext(context);

  let asPath;
  try {
    asPath = `/${catalogue.join('/')}`;

    // Get the item type
    const getItemType = await simplyFetchFromGraph({
      query: `
        query ITEM_TYPE($language: String!, $path: String!) {
          catalogue(language: $language, path: $path) {
            type
            language
            children {
              type
            }
          }
        }
      `,
      variables: {
        language: locale.crystallizeCatalogueLanguage,
        path: asPath
      }
    });
    const { type, children } = getItemType.data.catalogue;

    let renderer = 'folder';
    if (type === 'folder' && childrenIsMostlyProducts(children || [])) {
      renderer = 'search';
    } else if (type in renderers) {
      renderer = type;
    }

    const data = await renderers[renderer].getData({
      asPath,
      language: locale.crystallizeCatalogueLanguage,
      preview,
      ...(renderer === 'search' && {
        searchSpec: {
          type: 'PRODUCT',
          ...urlToSpec({ asPath }, locale)
        }
      })
    });

    return {
      props: {
        ...data,
        asPath,
        renderer
      },
      revalidate: 1
    };
  } catch (error) {
    console.log(error);
    console.warn(`Could not get data for ${asPath}`);
  }

  return {
    props: {},
    revalidate: 1
  };
}

export async function getStaticPaths({ locales, defaultLocale }) {
  const paths = [];

  await Promise.all((locales || ['en']).map(handleLocale));

  async function handleLocale(localeName) {
    const locale = getValidLocale(localeName);

    function handleItem({ path, name, children }) {
      if (path !== '/index' && !name?.startsWith('_')) {
        if (defaultLocale !== locale.locale) {
          paths.push(`/${locale.locale}${path}`);
        } else {
          paths.push(path);
        }
      }

      children?.forEach(handleItem);
    }

    try {
      const allCatalogueItems = await simplyFetchFromGraph({
        query: `
          query GET_ALL_CATALOGUE_ITEMS($language: String!) {
            catalogue(language: $language, path: "/") {
              path
              name
              children {
                path
                name
                children {
                  path
                  name
                  children {
                    path
                    name
                    children {
                      path
                      name
                      children {
                        path
                        name
                        children {
                          path
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          language: locale.crystallizeCatalogueLanguage
        }
      });

      allCatalogueItems.data.catalogue.children?.forEach(handleItem);
    } catch (error) {
      console.error(
        'Could not get all catalogue items for ',
        JSON.stringify(locale, null, 3)
      );
      console.log(error);
    }
  }

  return {
    paths,
    fallback: true
  };
}

export default function GenericCatalogueItem({ renderer, asPath, ...rest }) {
  const router = useRouter();
  const Component = (renderers[renderer] || renderers.folder).component;

  if (router.isFallback) {
    return <Layout loading />;
  }

  // No data was found for route. It's a 404
  if (Object.keys(rest).length === 0) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return <Component key={asPath} {...rest} />;
}
