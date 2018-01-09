import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Getting the top level categories
export const query = gql`
  query LAYOUT_QUERY($url: String!, $id: String!) {
    category(url: $url, tenantID: $id) {
      subCategories {
        name
        link
      }
    }
  }
`;

export default graphql(query, {
  options: () => ({
    variables: {
      url: '/',
      id: 'demo'
    }
  }),
  props: ({ data }) => ({
    categories: data.category.subCategories
  })
});
