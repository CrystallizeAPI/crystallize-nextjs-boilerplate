import itemFragment from 'lib/graph/fragments/item';

export default `
  query FOLDER_PAGE($language: String!, $path: String) {
    document: catalogue(language: $language, path: $path) {
      ...item
    }
  }

  ${itemFragment}
`;
