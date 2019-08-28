import React from 'react';
import { FormattedNumber } from 'react-intl';
import { useTreeNodeAndMenuQuery } from 'lib/graph';

export const CurrencyValue = ({ value }) => {
  const { loading, error, data } = useTreeNodeAndMenuQuery();

  if (loading || error || !data) {
    return null;
  }

  return (
    <FormattedNumber
      style="currency"
      currency={data.tenant.defaults.currency}
      value={value}
    />
  );
};
