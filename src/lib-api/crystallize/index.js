function createApiCaller(uri) {
  return async function callApi({ query, variables, operationName }) {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Crystallize-Access-Token-Secret':
          process.env.CRYSTALLIZE_SECRET_TOKEN,
        'X-Crystallize-Access-Token-Id': process.env.CRYSTALLIZE_SECRET_TOKEN_ID
      },
      body: JSON.stringify({ operationName, query, variables })
    });

    return response.json();
  };
}

export const callOrdersApi = createApiCaller(
  process.env.CRYSTALLIZE_ORDERS_URL
);
export const callCoreApi = createApiCaller(process.env.CRYSTALLIZE_CORE_URL);
