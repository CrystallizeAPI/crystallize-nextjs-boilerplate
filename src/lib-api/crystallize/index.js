function callApi(apiName) {
  return async ({ query, variables, operationName }) => {
    const response = await fetch(
      `https://api.crystallize.com/${process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_ID}/${apiName}`,
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
  };
}

export const callOrdersApi = callApi('orders');
export const callCoreApi = callApi('core');
