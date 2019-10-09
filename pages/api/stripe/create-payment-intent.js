const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const crystallizeGraphUrlBase = process.env.CRYSTALLIZE_GRAPH_URL_BASE;
const crystallizeTenantId = process.env.CRYSTALLIZE_TENANT_ID;
const stripe = require('stripe')(stripeSecretKey);
const { request } = require('graphql-request');

export default async (req, res) => {
  // TODO fetch product prices separately - it's not ideal to rely on the
  // frontend to pass them through as they can easily be manipulated.
  const { lineItems } = JSON.parse(req.body);

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
  const data = await Promise.all(requests);

  // Get an array of individual product variants we've ordered
  const products = lineItems
    .map(item =>
      data
        .map(({ tree }) => {
          const variant = tree[0].variants.find(v => v.id === item.id);
          if (!variant) return false;

          variant.quantity = item.quantity;
          return variant;
        })
        .filter(variant => variant)
    )
    .flat();

  const amount = products.reduce((acc, val) => {
    return acc + val.price * val.quantity;
  }, 0);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'nok'
  });

  return res.json(paymentIntent);
};
