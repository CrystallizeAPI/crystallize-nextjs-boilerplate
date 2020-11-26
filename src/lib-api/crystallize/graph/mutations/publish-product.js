export default `
  mutation publishProduct(
    $id: ID!
    $language: String!
  ) {
    product {
        publish(
            id: $id,
            language: $language
      ) {
        id
      }
    }
  }
`;
