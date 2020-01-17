const { useQuery } = require('urql');

const QUERY_ORDER_BY_ID = require('./queries/order-by-id');
const CREATE_ORDER = require('./mutations/create-order');

/**
 * Helper for getting a catalogue item with a path
 * from url, removing any query params from the variables
 */
function useSafePathQuery({ variables, ...rest }) {
  const safePath = (variables.path || '').split('?')[0];
  const vars = {
    ...variables,
    path: safePath
  };

  return useQuery({ variables: vars, ...rest });
}

module.exports = {
  QUERY_ORDER_BY_ID,
  CREATE_ORDER,
  useSafePathQuery
};
