const request = require('request-promise');
const {
  KLARNA_USERNAME,
  KLARNA_PASSWORD,
  KLARNA_API_URL
} = require('../../config.js');

const createAuthKey = () =>
  Buffer.from(`${KLARNA_USERNAME}:${KLARNA_PASSWORD}`).toString('base64');

module.exports = async ({ uri, headers, body = null, method }) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${createAuthKey()}`,
        ...headers
      },
      uri: `${KLARNA_API_URL}${uri}`,
      json: true,
      method,
      body
    };
    request(options)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
