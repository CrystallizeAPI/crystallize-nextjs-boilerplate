import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Getting the top level categories
export const query = gql`
  query {
    tree(language: "en", path: "/") {
      ...itemProp
    }
  }
  fragment itemProp on Item {
    id
    name
    type
    path
  }
`;

export default graphql(query, {
  props: ({ data }) => {
    if (!data || data.loading) {
      return data;
    }
    return {
      categories: data.tree,
      tenant: data.tenant
    };
  }
});
