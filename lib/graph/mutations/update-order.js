// const order = require('./fragments/order');

module.exports = `
  mutation updateOrder(
    $id: ID!
    $customer: CustomerInput!
    $cart: [OrderItemInput!]!
    $payment: [PaymentInput!]
    $total: PriceInput
  ) {
    orders {
        update(
        id: $id,
        input: {
          customer: $customer
          cart: $cart
          payment: $payment
          total: $total
        }
      ) {
        id
      }
    }
  }
`;
