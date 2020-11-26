export default `
query{
    product{
      get(id:"5dc3fceb43b90166bc9edaee", language:"en"){
        externalReference
        variants{
          id
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
