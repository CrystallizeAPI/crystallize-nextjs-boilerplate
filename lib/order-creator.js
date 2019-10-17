/* eslint-disable no-underscore-dangle */
const request = require('request-promise');
const orderMutation = require('./graph/mutations/create-order');

const apiCall = async (query, variables, operationName) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      headers: {
        'content-type': 'application/json',
        'X-Crystallize-Secret-Token':
          global.__crystallizeConfig.MY_CRYSTALLIZE_SECRET_TOKEN
      },
      uri: global.__crystallizeConfig.ORDER_API_URL,
      json: true,
      method: 'POST',
      body: { operationName, query, variables }
    };
    request(options)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// Reminder that mutationBody must be a string
module.exports = function createCrystallizeOrder(input) {
  // if (typeof orderData === 'object')
  //   input = `mutation{orders{create(input:{${JSON.stringify(
  //     orderData
  //   )}}){id}}}`;
  // return new Promise((resolve, reject) => {
  //   fetch(global.__crystallizeConfig.ORDER_API_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: input
  //   }).then(res => {
  //     if (res.status !== 200) return reject(res);
  //     return resolve(res.json);
  //   });
  // });

  return apiCall(orderMutation, input, 'createOrder');
};
