const request = require('request-promise');
const {
  VIPPS_USERNAME,
  VIPPS_PASSWORD,
  VIPPS_API_URL,
  VIPPS_MERCHANT_SERIAL,
  NGROK_URL
} = require('../../config.js');

const createAuthKey = () =>
  Buffer.from(`${VIPPS_USERNAME}:${VIPPS_PASSWORD}`).toString('base64');

module.exports = async ({ uri, headers, body, method }) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${createAuthKey()}`,
        ...headers
      },
      uri: `${VIPPS_API_URL}${uri}`,
      json: true,
      method,
      body: body
    };
    request(options)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
