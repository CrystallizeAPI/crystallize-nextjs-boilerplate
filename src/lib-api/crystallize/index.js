function callApi(apiName) {
  return async ({ query, variables, operationName }) => {
    const response = await fetch(
      apiName === 'orders'
        ? `https://api-dev.crystallize.digital/${process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_ID}/${apiName}`
        : 'https://pim-dev.crystallize.digital/graph/core',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-Crystallize-Access-Token-Secret':
            process.env.CRYSTALLIZE_SECRET_TOKEN,
          'X-Crystallize-Access-Token-Id':
            process.env.CRYSTALLIZE_SECRET_TOKEN_ID
        },
        body: JSON.stringify({ operationName, query, variables })
      }
    );

    return response.json();
  };
}

export const callOrdersApi = callApi('orders');
export const callCoreApi = callApi('core');
