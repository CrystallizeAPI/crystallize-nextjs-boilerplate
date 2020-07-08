import { useT } from 'lib/i18n';

export const CurrencyValue = ({ value }) => {
  const t = useT();

  return t('common.price', { value });
};
