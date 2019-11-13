const gql = require('graphql-tag');

const item = require('../fragments/item');

module.exports = gql`
  query MENU_AND_TENANT($language: String!) {
    menu: tree(language: $language, path: "/") {
      ...item
    }

    tenant(language: $language) {
      name
      defaults {
        currency
        language
      }
    }
  }

  ${item}
`;
