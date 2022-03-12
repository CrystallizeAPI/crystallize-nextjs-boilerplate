import { reduceImageSizeInCatalogueResponse } from '../reduce-image-size-in-catalogue-response';

/**
 * Helper for getting a catalogue item with a path
 * from url, removing any query params from the variables
 */
export function safePathQuery({ variables, ...rest }) {
  if (variables && 'path' in variables) {
    const safePath = (variables.path || '')
      .split('?')[0]
      .split('#')[0]
      .replace(/\/$/, '');

    return {
      variables: {
        ...variables,
        path: safePath
      },
      ...rest
    };
  }

  return {
    variables,
    ...rest
  };
}

/**
 * If you have enabled authentication on your APIs, then you need to
 * proxy the requests through the Service API:
 * const apiUrlBase = process.env.NEXT_PUBLIC_SERVICE_API_URL.replace(
 *  '/graphql',
 *  '/crystallize'
 * );
 * Read more about authentication for the APIs here:
 * https://crystallize.com/learn/developer-guides/api-overview/authentication
 */
const apiUrlBase = `https://api.crystallize.com/${process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_IDENTIFIER}`;

export async function simplyFetchFromGraph({
  uri = `${apiUrlBase}/catalogue`,
  query,
  variables
}) {
  const body = JSON.stringify(safePathQuery({ query, variables }));

  const response = await fetch(uri, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();

  return reduceImageSizeInCatalogueResponse(json);
}

export function simplyFetchFromSearchGraph(args) {
  return simplyFetchFromGraph({
    uri: `${apiUrlBase}/search`,
    ...args
  });
}
