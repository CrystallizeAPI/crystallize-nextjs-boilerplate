export { default as QUERY_ORDER_BY_ID } from './queries/order-by-id';
export { default as CREATE_ORDER } from './mutations/create-order';

if (typeof window === 'undefined') {
  require('isomorphic-unfetch');
}

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
 * To perform simple fetch requests with no GraphQL
 * client attached.
 */
const createSimpleCache = length => ({
  storage: [],
  set(name, value) {
    if (this.storage.unshift({ name, value }) > length) {
      this.storage.length = length;
    }
  },
  get(name) {
    return this.storage.find(s => s.name === name)?.value;
  }
});

// Create a simple graph with a max of 20 documents to cache
const simpleCache = createSimpleCache(20);

export async function simplyFetchFromGraph(
  { query, variables },
  { cache = false } = {}
) {
  const body = JSON.stringify(safePathQuery({ query, variables }));

  if (cache) {
    const value = simpleCache.get(body);
    if (value) {
      return value;
    }
  }

  const response = await fetch(
    `${process.env.CRYSTALLIZE_API_URL}/${process.env.CRYSTALLIZE_TENANT_ID}/catalogue`,
    {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();

  if (cache) {
    simpleCache.set(body, json);
  }

  return json;
}
