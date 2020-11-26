export default `
query fetchProduct($id: ID!, $language:String!){
    product{
      get(id:$id, language:$language){
        defaultVariant{
          id
          sku
          name
          externalReference
          price
          images{
            key
            url
          }
          stock
          isDefault
          attributes{
            attribute
            value
          }
        }
      }
    }
  }
`;
