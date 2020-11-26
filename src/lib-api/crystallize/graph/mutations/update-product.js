export default `
  mutation updateProductStock(
    $id: ID!
    $language: String!
    $variants: [UpdateProductVariantInput!]
  ) {
    product {
        update(
            id: $id,
            language: $language
            input: {
            variants: $variants
            }
      ) {
        id
      }
    }
  }
`;
