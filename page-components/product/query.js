import itemFragment from 'lib/graph/fragments/item';
import productFragment from 'lib/graph/fragments/product';

export default `
  query PRODUCT_PAGE($language: String!, $path: String) {
    product: catalogue(language: $language, path: $path) {
      ...item
      ...product

      topics {
        id
        name
        items(first: 4) {
          edges {
            node {
              ...item
              ...product
            }
          }
        }
      }
    }
  }

  ${itemFragment}
  ${productFragment}
`;
