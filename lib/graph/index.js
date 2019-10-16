const { useRouter } = require('next/router');
const { useQuery } = require('urql');

const TREE_NODE = require('./tree-node');
const MENU_AND_TENANT = require('./menu-and-tenant');
const GRID = require('./grid');
const TOPIC = require('./topic');
const ORDER = require('./order');

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
    variables: { id: 118, language: 'en' }
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

module.exports = {
  TREE_NODE,
  MENU_AND_TENANT,
  TOPIC,
  ORDER,
  useTreeNodeQuery,
  useMenuAndTenantQuery,
  useGridQuery,
  useTopicQuery
};
