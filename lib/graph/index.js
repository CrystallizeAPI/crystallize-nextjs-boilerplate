const { useRouter } = require('next/router');
const { useQuery } = require('urql');

const TREE_NODE_AND_MENU_AND_TENANT = require('./tree-node-and-menu-and-tenant');

/**
 * Custom hook to enable the general query for fetching data from
 * Crystallize for the current path
 */
const useTreeNodeAndMenuQuery = () => {
  const router = useRouter();
  const { query, asPath } = router;
  const path = query.path ? `/${query.path}` : asPath;

  const [result] = useQuery({
    query: TREE_NODE_AND_MENU_AND_TENANT,
    variables: { path, language: 'en' }
  });

  return result;
};

module.exports = {
  TREE_NODE_AND_MENU_AND_TENANT,
  useTreeNodeAndMenuQuery
};
