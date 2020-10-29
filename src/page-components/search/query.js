import fragments from 'lib/graph/fragments';

export default `
  query SEARCH_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    searchPage: catalogue(language: $language, path: $path, version: $version) {
      ...item

      children {
        ...item
        ...product
      }
    }
  }

  ${fragments}
`;
