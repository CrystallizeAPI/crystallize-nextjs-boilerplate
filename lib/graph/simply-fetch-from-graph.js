/**
 * To perform simple fetch requests with no GraphQL
 * client attached.
 */

if (typeof window === 'undefined') {
  // eslint-disable-next-line global-require
  require('isomorphic-unfetch');
}

module.exports = async function simplyFetchFromGraph({ query, variables }) {
  const response = await fetch(global.__crystallizeConfig.GRAPH_URL, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};
