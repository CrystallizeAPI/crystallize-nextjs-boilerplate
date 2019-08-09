const gql = require('graphql-tag');

module.exports = gql`
  query TENTANT {
    tenant {
      name
      defaults {
        currency
        language
      }
    }
  }
`;
