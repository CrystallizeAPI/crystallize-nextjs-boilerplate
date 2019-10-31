module.exports = `
  query getOrder($id: String!){
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
