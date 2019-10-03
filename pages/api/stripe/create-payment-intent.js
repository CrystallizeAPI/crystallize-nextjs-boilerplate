const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const crystallizeGraphUrlBase = process.env.CRYSTALLIZE_GRAPH_URL_BASE;
const crystallizeTenantId = process.env.CRYSTALLIZE_TENANT_ID;
const stripe = require('stripe')(stripeSecretKey);
const { request } = require('graphql-request');

export default async (req, res) => {
  // TODO fetch product prices separately - it's not ideal to rely on the
  // frontend to pass them through as they can easily be manipulated.
  const { lineItems } = JSON.parse(req.body);

  const query = `
    query {
      ${lineItems.map(item => {
        return `
          tree(language: "en", path: "${item.path}") {
            path
            type
            ... on Product {
              variants {
                id
                price
              }
            }
          }
        `;
      })}
    }
  `;

  const data = await request(
    `${crystallizeGraphUrlBase}/tenant/${crystallizeTenantId}`,
    query
  );

  // Get an array of individual product variants we've ordered
  const products = lineItems
    .map(
      item =>
        data.tree.find(product => {
          const variant = product.variants.find(v => v.id === item.id);
          if (!variant) return false;

          variant.quantity = item.quantity;
          return variant;
        }).variants
    )
    .flat();

  const amount = products.reduce(
    (acc, val) => acc + val.price * val.quantity,
    0
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'nok'
  });

  return res.json({ clientSecret: paymentIntent.client_secret });
};
