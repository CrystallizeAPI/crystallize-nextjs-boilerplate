import itemFragment from 'lib/graph/fragments/item';
import productFragment from 'lib/graph/fragments/product';

export default `
  query FOLDER_PAGE($language: String!, $path: String) {
    folder: catalogue(language: $language, path: $path) {
      ...item

      children {
        ...item
        ...product
      }
    }
  }

  ${itemFragment}
  ${productFragment}
`;
