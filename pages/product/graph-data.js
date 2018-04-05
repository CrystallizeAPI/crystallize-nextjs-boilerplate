import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Get sub categories, products and breadcrumbs for the category
export const query = gql`
  query PRODUCT_QUERY($url: String!, $id: String!) {
    product(url: $url, tenantID: $id) {
      id
      name
      vat
      product_image
      product_image_resized
      sku
      link
      price
      price_from
      fields

      variations {
        variation_sku
        price_ex_vat
        stock_count
        attributes {
          attribute_key
          attribute_value
        }
        variation_plans {
          name
          initial_price
          renewal_price
          initial_period_unit
          initial_period
          duration
          duration_unit
          renewal_term
          cancellation_term
          variationplan_id
        }
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
      data: data.product
    };
  }
});
