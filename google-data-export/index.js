const fs = require('fs');

const utils = require('./utils');

(async function buildExport() {
  const allProducts = await getAllProducts();

  fs.writeFileSync(
    __dirname + '/export-' + Date.now() + '.json',
    `${allProducts.map((p) => JSON.stringify(p)).join('\n')}`
  );
})();

async function getAllProducts() {
  const response = await utils.simplyFetchFromSearch({
    query: `
      {
        search (
          first: 100
          filter: {
            type: PRODUCT
          }
        ) {
          edges {
            node {
              path
            }
          }
        }
      }
    `
  });

  const searchProducts = response.data.search.edges.map((e) => e.node);

  const catalogueProducts = await Promise.all(
    searchProducts.map(async function getCatalogueInfo({ path }) {
      const response = await utils.simplyFetchFromCatalogue({
        query: `
        {
          catalogue(path: "${path}", language: "en") {
            id
            name
            path
            publishedAt
            description: component(id: "summary") {
              content {
                ... on RichTextContent {
                  plainText
                }
              }
            }
            ... on Product {
              defaultVariant {
                id
                name
                sku
                stock
                price
                attributes {
                  attribute
                  value
                }
                images {
                  altText
                  variants {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      `
      });

      return response.data.catalogue;
    })
  );

  return catalogueProducts.map(function normaliseForGoogle({
    path,
    name,
    publishedAt,
    description,
    defaultVariant
  }) {
    function categoryFromPath(path) {
      const parts = path.replace('/shop/', '').split('/');
      parts.length = parts.length - 1;

      return parts.join(' > ');
    }

    const desc =
      description && description.content && description.content.plainText[0];

    return {
      id: defaultVariant.sku,
      name: `projects/584488308354/locations/global/catalogs/default_catalog/operations/${defaultVariant.sku}`,
      title: name,
      uri: `https://recommend.superfast.shop${path}`,
      language_code: 'en',
      categories: [categoryFromPath(path)],
      ...(desc && { description: desc }),
      availableTime: publishedAt,
      availableQuantity: defaultVariant.stock.toString(),
      priceInfo: {
        currencyCode: 'EUR',
        price: defaultVariant.price,
        originalPrice: defaultVariant.price,
        cost: parseInt(defaultVariant.price * 0.8, 10)
      },
      images:
        defaultVariant.images &&
        defaultVariant.images.length > 0 &&
        defaultVariant.images[0].variants
          .filter(function noWebP(variant) {
            return !variant.url.endsWith('.webp');
          })
          .map((image) => ({
            uri: image.url,
            width: image.width,
            height: image.height
          }))
    };
  });
}
