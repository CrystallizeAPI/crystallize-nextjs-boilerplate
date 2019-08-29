const { useRouter } = require('next/router');
const { useQuery } = require('urql');

const TREE_NODE = require('./tree-node');
const MENU_AND_TENANT = require('./menu-and-tenant');

/**
 * Custom hook to enable the general query for fetching data from
 * Get the menu and tenant defaults
 */
const useMenuAndTenantQuery = () => {
  const [result] = useQuery({
    query: MENU_AND_TENANT,
    variables: { language: 'en' }
  });

  return result;
};

/**
 * Get the tree node at the current router path
 */
const useTreeNodeQuery = () => {
  const router = useRouter();
  const { query, asPath } = router;
  const path = query.path ? `/${query.path}` : asPath;

  const [result] = useQuery({
    query: TREE_NODE,
    variables: { path, language: 'en' }
  });

  return result;
};

module.exports = {
  TREE_NODE,
  MENU_AND_TENANT,
  useTreeNodeQuery,
  useMenuAndTenantQuery
};
