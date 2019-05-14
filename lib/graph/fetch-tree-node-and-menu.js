const gql = require('graphql-tag');

const item = require('./fragments/item');
const product = require('./fragments/product');

module.exports = gql`
  query TREE_NODE_AND_LAYOUT_QUERY($language: String!, $path: String) {
    tree(language: $language, path: $path) {
      ...item
      ...product

      ... on Item {
        children {
          ...item
          ...product
        }
      }
    }

    menu: tree(language: $language, path: "/") {
      ...item
    }
  }

  ${item}
  ${product}
`;
