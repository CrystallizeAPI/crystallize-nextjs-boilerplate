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
              sku
              name
              stock
              price
              attributes {
                attribute
                value
              }
              images {
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

  return paths.map((_, i) => response.data[`product${i}`]);
}

export function useExtendedProductVariants({ productsVariantsToExtend = [] }) {
  const locale = useLocale();
  const [extendedProductData, setExtendedProductData] = useState([]);

  useEffect(() => {
    (async function getExtendedProductVariants() {
      console.log(JSON.stringify(productsVariantsToExtend, null, 3));
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
            ...productsToFetch.map((cartItem) => {
              const product = productsFromApi.find((product) =>
                product.variants.some((v) => v.sku === cartItem.sku)
              );
              if (product) {
                const { vatType } = product;
                const { price, ...variant } = product.variants.find(
                  (v) => v.sku === cartItem.sku
                );

                const gross = price;
                const net = (price / (100 + vatType.percent)) * 100;
                const vat = gross - net;

                return {
                  sku: cartItem.sku,
                  vatType,
                  price: {
                    gross,
                    net,
                    vat,
                    currency: locale.defaultCurrency
                  },
                  ...variant
                };
              }
              return null;
            })
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [extendedProductData, productsVariantsToExtend, locale]);

  return extendedProductData;
}
