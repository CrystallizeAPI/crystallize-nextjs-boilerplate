import React from 'react';
import { Query } from 'react-apollo';
import { FormattedNumber } from 'react-intl';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';

export const CurrencyValue = ({ value }) => (
  <Query
    variables={{ path: '/', language: 'en' }}
    query={FETCH_TREE_NODE_AND_MENU}
  >
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;
      return (
        <FormattedNumber
          style="currency"
          currency={data.tenant.defaults.currency}
          value={value}
        />
      );
    }}
  </Query>
);
