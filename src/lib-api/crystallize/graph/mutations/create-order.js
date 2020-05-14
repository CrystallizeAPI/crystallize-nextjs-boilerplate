export default `
  mutation createOrder(
    $customer: CustomerInput!
    $cart: [OrderItemInput!]!
    $payment: [PaymentInput!]
    $total: PriceInput
  ) {
    orders {
      create(
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
