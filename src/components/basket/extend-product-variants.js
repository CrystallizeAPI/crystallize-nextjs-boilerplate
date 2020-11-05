import { useState, useEffect } from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { useLocale } from 'lib/app-config';

async function getProducts({ paths, locale }) {
  if (paths.length === 0) {
    return [];
  }

  const response = await simplyFetchFromGraph({
    query: `{
      ${paths.map(
        (path, index) => `
        product${index}: catalogue(path: "${path}", language: "${locale.crystallizeCatalogueLanguage}") {
          ... on Product {
            vatType {
              name
              percent
            }
            variants {
              id
              sku
              name
              stock
              priceVariants {
                price
                identifier
                currency
              }
              attributes {
                attribute
                value
              }
              images {
                url
                variants {
                  url
                  width
                }
              }
            }
          }
        }
      `
      )}
    }`
  });

  return paths.map((_, i) => response.data[`product${i}`]).filter((p) => !!p);
}

export function useExtendedProductVariants({ productsVariantsToExtend = [] }) {
  const locale = useLocale();
  const [extendedProductData, setExtendedProductData] = useState([]);

  useEffect(() => {
    (async function getExtendedProductVariants() {
      // Determine which products we need to fetch from the API
      const productsToFetch = productsVariantsToExtend.filter(
        (p) => !extendedProductData.some((e) => e.sku === p.sku)
      );

      if (productsToFetch.length > 0) {
        try {
          const productsFromApi = await getProducts({
            paths: productsToFetch.map((c) => c.path),
            locale
          });

          setExtendedProductData([
            ...extendedProductData,
            ...productsToFetch
              .map((cartItem) => {
                const product = productsFromApi.find((product) =>
                  product?.variants.some((v) => v.sku === cartItem.sku)
                );
                if (product) {
                  const { vatType } = product;
                  const variant = product.variants.find(
                    (v) => v.sku === cartItem.sku
                  );
                  const { price, currency } =
                    variant.priceVariants.find(
                      (pv) => pv.identifier === locale.crystallizePriceVariant
                    ) ||
                    variant.priceVariants.find(
                      (p) => p.identifier === 'default'
                    );

                  const gross = price;
                  const net = (price * 100) / (100 + vatType.percent);
                  const vat = gross - net;

                  return {
                    vatType,
                    price: {
                      gross,
                      net,
                      vat,
                      currency
                    },
                    ...variant
                  };
                }
                return null;
              })
              .filter((p) => !!p)
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [extendedProductData, productsVariantsToExtend, locale]);

  return extendedProductData;
}
