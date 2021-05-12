const fetch = require('node-fetch');

const TENANT_IDENTIFIER = 'furniture';

async function simplyFetchFromCatalogue({
  uri = `https://api.crystallize.com/${TENANT_IDENTIFIER}/catalogue`,
  query,
  variables
}) {
  const body = JSON.stringify({ query, variables });

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

  return response.json();
}

function simplyFetchFromSearch(args) {
  return simplyFetchFromCatalogue({
    uri: `https://api.crystallize.com/${TENANT_IDENTIFIER}/search`,
    ...args
  });
}

module.exports = {
  simplyFetchFromCatalogue,
  simplyFetchFromSearch
};
