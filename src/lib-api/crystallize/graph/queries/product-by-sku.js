export default `
  query getProduct($id: ID!){
    product {
      get(id: $id, language: "en") {
        externalReference
        variants {
          externalReference
          id
          name
          sku
          stock
          price
          attributes {
            value
            attribute
          }
        }
      }
    }
  }
`;
