import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Get sub categories, products and breadcrumbs for the category
export const query = gql`
  query CATEGORY_QUERY($url: String!, $id: String!) {
    category(url: $url, tenantID: $id) {
      subCategories {
        name
        link
      }
      products {
        id
        name
        product_image
        product_image_resized
        price
        link
      }
      breadcrumbs {
        name
        breadcrumb
      }
    }
  }
`;

export default graphql(query, {
  options: ({ router }) => ({
    variables: {
      url: router.asPath || router.pathname,
      id: 'demo'
    }
  }),
  props: ({ data }) => ({
    data: data.category
  })
});
