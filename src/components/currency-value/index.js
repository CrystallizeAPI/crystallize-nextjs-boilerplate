import { formatCurrency } from 'lib/currency';
import { useSettings } from 'components/settings-context';

export const CurrencyValue = ({ value }) => {
  const { currency } = useSettings();

  return formatCurrency({ amount: value, currency });
};
