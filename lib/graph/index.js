const { useRouter } = require('next/router');
const { useQuery } = require('urql');

const { customClientUseQuery } = require('./use-query');
const TREE_NODE = require('./queries/tree-node');
const MENU_AND_TENANT = require('./queries/menu-and-tenant');
const GRID = require('./queries/grid');
const TOPIC = require('./queries/topic');
const QUERY_ORDER_BY_ID = require('./queries/order-by-id');
const CREATE_ORDER = require('./mutations/create-order');

const tenantVariables = {};
/**
 * Custom hook to enable the general query for fetching data from
 * Get the menu and tenant defaults
 */
const useMenuAndTenantQuery = () => {
  const [result] = useQuery({
    query: MENU_AND_TENANT,
    variables: { language: 'en' }
  });
  tenantVariables.currency = result.data.tenant.defaults.currency;
  return result;
};

const getTenantVariables = () => {
  return tenantVariables;
};
/**
 * Get the tree node at the current router path
 */
const useTreeNodeQuery = () => {
  const router = useRouter();

  const [path] = router.asPath.split('?');

  const [result] = useQuery({
    query: TREE_NODE,
    variables: { path, language: 'en' }
  });

  return result;
};

const useGridQuery = () => {
  const [result] = useQuery({
    query: GRID,
    variables: { id: 28, language: 'en' }
  });
  return result;
};

/**
 * Get the topic based on the name.
 */
const useTopicQuery = ({ name, ancestry }) => {
  const [result] = useQuery({
    query: TOPIC,
    variables: { name, ancestry }
  });
  return result;
};

/**
 * Query an order based on its id.
 */
const useOrderByIdQuery = ({ id, client }) => {
  const result = customClientUseQuery({
    client,
    query: QUERY_ORDER_BY_ID,
    variables: { id }
  });
  return result;
};

module.exports = {
  TREE_NODE,
  MENU_AND_TENANT,
  TOPIC,
  QUERY_ORDER_BY_ID,
  CREATE_ORDER,
  useTreeNodeQuery,
  useMenuAndTenantQuery,
  useGridQuery,
  useTopicQuery,
  useOrderByIdQuery,
  getTenantVariables
};
