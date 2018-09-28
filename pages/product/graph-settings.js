import gql from 'graphql-tag';

import { normalizeContentFields } from 'lib/normalizers';

export default {
  query: gql`
    query PRODUCT_QUERY($url: String!, $id: String!) {
      catalogue(url: $url, tenantID: $id) {
        id
        content_fields
        product {
          id
          name
          product_image
          product_image_resized
          sku
          price
          price_from
          fields
          default_variation_id
          vat {
            id
            percentage
            name
          }
          dimensions {
            id
            name
            values {
              id
              name
            }
          }

          variations {
            variation_sku
            price_ex_vat
            image
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
    }
  `,

  options: ctx => {
    const { router } = ctx;
    return {
      variables: {
        url: router.asPath || router.pathname,
        id: __crystallizeConfig.TENANT_ID
      }
    };
  },

  props: props => {
    const { data } = props;

    return {
      data: {
        ...data,
        catalogue: normalizeContentFields(data.catalogue)
      }
    };
  }
};
