import fragments from 'lib/graph/fragments';

export const QUERY_DOCUMENT = `
  query DOCUMENT_PAGE($language: String!, $path: String, $version: VersionLabel! ) {

    document: catalogue(language: $language, path: $path, version: $version) {
      ...item
      ...product
      publishedAt
      topics {
        id
        name
        parent {
          name
        }
        items(first:2){
          edges{
            node{
              ...item
              ...product
              id
              topics {
                id
                name
              }
            }
          }
        }
      }
     }
  }

  ${fragments}
`;
