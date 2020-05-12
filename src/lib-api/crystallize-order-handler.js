import orderMutation from './graph/mutations/create-order';
import orderQuery from './graph/queries/order-by-id';

export async function callOrdersApi({ query, variables, operationName }) {
  const response = await fetch(
    `https://api.crystallize.com/${process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_ID}/orders`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Crystallize-Access-Token-Secret':
          process.env.CRYSTALLIZE_SECRET_TOKEN,
        'X-Crystallize-Access-Token-Id':
          process.env.CRYSTALLIZE_SECRET_TOKEN_ID,
      },
      body: JSON.stringify({ operationName, query, variables }),
    }
  );

  return response.json();
}

export const createCrystallizeOrder = (input) =>
  callOrdersApi({
    query: orderMutation,
    variables: input,
    operationName: 'createOrder',
  });

export const fetchCrystallizeOrder = (orderId) =>
  callOrdersApi({
    query: orderQuery,
    variables: { id: orderId },
    operationName: 'getOrder',
  });
