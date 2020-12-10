import TripletexClient from '@crystallize/node-tripletex';
import ProductQuery from 'lib-api/crystallize/graph/queries/product-by-sku';
import { callPimApi } from 'lib-api/crystallize';

let client;
export const getClient = () => {
  if (client) {
    return client;
  }

  client = new TripletexClient({
    testDrive: true,
    consumerToken: process.env.TRIPLETEX_CONSUMER_TOKEN,
    employeeToken: process.env.TRIPLETEX_EMPOLOYEE_TOKEN
  });

  return client;
};

export const getCrystallizeProduct = ({ id }) => {
  return callPimApi({
    operationName: 'getProduct',
    variables: {
      id
    },
    query: ProductQuery
  });
};
