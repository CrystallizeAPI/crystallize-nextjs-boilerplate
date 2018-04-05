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
        sku
        name
        product_image
        product_image_resized
        price
        price_from
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
      id: __crystallizeConfig.TENANT_ID
    }
  }),
  props: ({ data }) => {
    if (!data || data.loading) {
      return data;
    }

    return {
      data: data.category
    };
  }
});
