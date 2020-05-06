/* eslint-disable no-underscore-dangle */
const request = require('request-promise');
const orderMutation = require('./graph/mutations/create-order');
const updateOrderMutation = require('./graph/mutations/update-order');
const orderQuery = require('./graph/queries/order-by-id');
const {
  MY_CRYSTALLIZE_SECRET_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN_ID,
  ORDER_API_URL,
  CRYSTALLIZE_CORE_API_URL
} = require('../config');

const apiCall = async (query, variables, operationName, update = false) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'content-type': 'application/json',
        'X-Crystallize-Access-Token-Secret': MY_CRYSTALLIZE_SECRET_TOKEN,
        'X-Crystallize-Access-Token-Id': MY_CRYSTALLIZE_SECRET_TOKEN_ID
      },
      uri: update ? CRYSTALLIZE_CORE_API_URL : ORDER_API_URL,
      json: true,
      method: 'POST',
      body: { operationName, query, variables }
    };

    request(options)
      .then(resolve)
      .catch(reject);
  });
};

const persistCrystallizeOrder = (input, update = false) =>
  update
    ? apiCall(updateOrderMutation, input, 'updateOrder', update)
    : apiCall(orderMutation, input, 'createOrder');

const fetchCrystallizeOrder = orderId =>
  apiCall(orderQuery, { id: orderId }, 'getOrder');

// Reminder that mutationBody must be a string
module.exports = {
  persistCrystallizeOrder,
  fetchCrystallizeOrder
};
