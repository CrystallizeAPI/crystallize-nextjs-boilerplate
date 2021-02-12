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
        sku
        name
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
