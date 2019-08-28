const { useRouter } = require('next/router');
const { useQuery } = require('urql');

const TREE_NODE_AND_MENU = require('./fetch-tree-node-and-menu');

const useTreeNodeAndMenuQuery = () => {
  const router = useRouter();
  const { query, asPath } = router;
  const path = query.path ? `/${query.path}` : asPath;

  const [result] = useQuery({
    query: TREE_NODE_AND_MENU,
    variables: { path, language: 'en' }
  });

  return result;
};

module.exports = {
  TREE_NODE_AND_MENU,
  useTreeNodeAndMenuQuery
};
