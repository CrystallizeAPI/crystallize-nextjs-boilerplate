export default `
  mutation updateOrder(
    $id: ID!
    $customer: CustomerInput
    $payment: [PaymentInput!]
    $additionalInformation: String
  ) {
    order {
        update(
        id: $id,
        input: {
          customer: $customer
          payment: $payment
          additionalInformation: $additionalInformation
        }
      ) {
        id
      }
    }
  }
`;
