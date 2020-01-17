import React from 'react';
import { FormattedNumber } from 'react-intl';

import { useSettings } from 'components/settings-context';

export const CurrencyValue = ({ value }) => {
  const { currency } = useSettings();

  return <FormattedNumber style="currency" currency={currency} value={value} />;
};
