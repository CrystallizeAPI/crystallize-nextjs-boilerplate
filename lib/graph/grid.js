const gql = require('graphql-tag');

const item = require('./fragments/item');
const product = require('./fragments/product');

module.exports = gql`
  query GRID($id: Int!, $language: String!) {
    grid(id: $id, language: $language) {
      id
      name
      rows {
        columns {
          layout {
            rowspan
            colspan
          }
          itemType
          itemId
          item {
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
