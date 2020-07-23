import fragments from 'lib/graph/fragments';

export default `
  query FOLDER_PAGE($language: String!, $path: String) {
    document: catalogue(language: $language, path: $path) {
      ...item
      ...product
    }
  }

  ${fragments}
`;
