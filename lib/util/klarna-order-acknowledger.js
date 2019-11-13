const klarnaApiCall = require('./klarna-utils');

module.exports = async orderId =>
  klarnaApiCall({
    uri: `/ordermanagement/v1/orders/${orderId}/acknowledge`,
    method: 'POST'
  });
