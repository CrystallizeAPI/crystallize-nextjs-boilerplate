import { useT } from 'lib/i18n';
import { orderByOptions } from 'lib/search';
import { Outer } from './styles';

export default function OrderBy({ orderBy, onChange }) {
  const t = useT();

  const handleOnChange = (e) => {
    const index = orderByOptions.findIndex(
      ({ value }) => value === e.target.value
    );
    onChange(orderByOptions[index], index);
  };

  return (
    <Outer
      value={orderBy?.value}
      onChange={handleOnChange}
      aria-label={t('search.orderTitle')}
    >
      {orderByOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {t(`search.order.${option.value}`)}
        </option>
      ))}
    </Outer>
  );
}
