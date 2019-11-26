const gql = require('graphql-tag');

const item = require('../fragments/item');
const product = require('../fragments/product');

module.exports = gql`
  query TOPIC($name: String!, $ancestry: [String!]) {
    topics(name: $name, ancestry: $ancestry) {
      id
      name
      items {
        edges {
          node {
            ... on Item {
              ...item
              ...product
            }
          }
        }
      }
    }
  }

  ${item}
  ${product}
`;
