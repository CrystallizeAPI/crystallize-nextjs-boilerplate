export default `
  query getServerBasket($basketModel: BasketModelInput!) {
    basket(basketModel: $basketModel) {
      total {
        gross
        net
        tax {
          name
          percent
        }
        currency
        discount
      }
      cart {
        id
        name
        sku
        path
        quantity
        attributes {
          attribute
          value
        }
        price {
          gross
          net
          tax {
            name
            percent
          }
          currency
        }
        images {
          url
          variants {
            url
            width
            height
          }
        }
      }
    }
  }
`;
