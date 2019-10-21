const { request } = require('graphql-request');

const crystallizeGraphUrlBase = process.env.CRYSTALLIZE_GRAPH_URL_BASE;
const crystallizeTenantId = process.env.CRYSTALLIZE_TENANT_ID;

export const validateItems = lineItems =>
  new Promise(async (resolve, reject) => {
    const queries = lineItems.map(
      (item, i) => `
          query PRODUCT_${i} {
            tree (language: "en", path: "${item.path}") {
              ... on Product {
                variants {
                  id
                  price
                }
              }
            }
          }
        `
    );
    const requests = queries.map(query =>
      request(
        `${crystallizeGraphUrlBase}/${crystallizeTenantId}/catalogue`,
        query
      )
    );
    let data;
    try {
      data = await Promise.all(requests);
      // Get an array of individual product variants we've ordered
      // Note: Node < 11 does not support Array.flat()
      resolve(
        lineItems.map(
          item =>
            data
              .map(({ tree }) => {
                const variant = tree[0].variants.find(v => v.id === item.id);
                if (!variant) return false;

                variant.quantity = item.quantity;
                return variant;
              })
              .filter(variant => variant)[0]
        )
      );
    } catch (error) {
      reject(error);
    }
  });
