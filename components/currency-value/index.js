import React from 'react';
import { Query } from 'react-apollo';
import { FormattedNumber } from 'react-intl';
import { FETCH_TENANT } from 'lib/graph';

export const CurrencyValue = ({ value }) => (
  <Query query={FETCH_TENANT}>
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
