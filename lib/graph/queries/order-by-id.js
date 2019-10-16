const gql = require('graphql-tag');

module.exports = gql`
  query ORDER($id: String!) {
    orders {
      get(id: $id) {
        id
        total {
          net
          gross
          currency
        }
        payment {
          ... on StripePayment {
            paymentMethod
          }
        }
        cart {
          sku
          name
          quantity
          price {
            net
            gross
            currency
          }
        }
        customer {
          firstName
          lastName
          addresses {
            type
            email
          }
        }
      }
    }
  }
`;
