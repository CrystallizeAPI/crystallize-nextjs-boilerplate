const fetch = require('cross-fetch');

async function doFetch(
  url,
  { jsonParseResponse = true, body, method = 'get', headers = {} } = {}
) {
  let stringifiedBody;

  if (body) {
    stringifiedBody = typeof body === 'string' ? body : JSON.stringify(body);
  }

  try {
    const fetchCacheObject = {
      url,
      options: {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...headers
        },
        body: stringifiedBody
      }
    };

    const response = await fetch(
      fetchCacheObject.url,
      fetchCacheObject.options
    );

    if (jsonParseResponse) {
      return response.json();
    }

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    return {
      success: false,
      error
    };
  }
}

module.exports = {
  doFetch
};
