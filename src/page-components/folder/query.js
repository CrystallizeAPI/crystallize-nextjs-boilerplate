import fragments from 'lib/graph/fragments';

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

  ${fragments}
`;
