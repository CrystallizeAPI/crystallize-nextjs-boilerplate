import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Getting the top level categories
export const query = gql`
  query LAYOUT_QUERY($url: String!, $id: String!) {
    tenant(tenantID: $id) {
      company_name
      logo_url
    }

    catalogue(url: $url, tenantID: $id) {
      children {
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
      id: __crystallizeConfig.TENANT_ID
    }
  }),
  props: ({ data }) => {
    if (!data || data.loading) {
      return data;
    }
    return {
      categories: data.catalogue.children,
      tenant: data.tenant
    };
  }
});
