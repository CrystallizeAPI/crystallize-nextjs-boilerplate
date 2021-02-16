import fragments from 'lib/graph/fragments';

export const QUERY_PRODUCT = `
  query PRODUCT_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    product: catalogue(language: $language, path: $path, version: $version) {
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

  ${fragments}
`;
