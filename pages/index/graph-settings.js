import gql from 'graphql-tag';

// import { normalizeContentFields } from 'lib/normalizers';

export default {
  query: gql`
    query CATEGORY_QUERY($url: String!, $id: String!) {
      catalogue(url: $url, tenantID: $id) {
        ...stuff
      }
      bikes: catalogue(url: "/bikes", tenantID: $id) {
        ...stuff
      }
      illustrations: catalogue(url: "/illustrations", tenantID: $id) {
        ...stuff
      }
      furniture: catalogue(url: "/furniture", tenantID: $id) {
        ...stuff
      }
    }
    fragment stuff on Catalogue {
      id
      children {
        id
        name
        link
        product {
          id
          sku
          name
          product_image
          product_image_resized
          price
          price_from
          link
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
    const { bikes, furniture, illustrations } = data;
    return {
      data: {
        ...data,
        products: !bikes
          ? []
          : [
              ...bikes.children,
              ...furniture.children,
              ...illustrations.children
            ]
      }
    };
  }
};
