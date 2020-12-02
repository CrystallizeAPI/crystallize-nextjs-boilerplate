import TripletexClient from 'node-tripletex';
import ProductQuery from 'lib-api/crystallize/graph/queries/product-by-sku';
import { callCoreApi } from 'lib-api/crystallize';

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
  return callCoreApi({
    operationName: 'getProduct',
    variables: {
      id
    },
    query: ProductQuery
  });
};
