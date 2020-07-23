import fragments from 'lib/graph/fragments';

export default `
  query FOLDER_PAGE($language: String!, $path: String, $version: VersionLabel! ) {
    document: catalogue(language: $language, path: $path, version: $version) {
      ...item
      ...product
    }
  }

  ${fragments}
`;
