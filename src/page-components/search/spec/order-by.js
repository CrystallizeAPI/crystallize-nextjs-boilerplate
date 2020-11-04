import styled from 'styled-components';

import { useT } from 'lib/i18n';
import { orderByOptions } from 'lib/search';
import { responsive } from 'ui';

const Outer = styled.select`
  padding: 10px 15px;
  outline: none;
  border: none;
  font-size: 1rem;

  ${responsive.smPlus} {
    margin-top: 15px;
  }
`;

export default function OrderBy({ orderBy, onChange }) {
  const t = useT();

  return (
    <Outer
      value={orderBy?.value}
      onChange={(e) => {
        const index = orderByOptions.findIndex(
          (o) => o.value === e.target.value
        );
        onChange(orderByOptions[index], index);
      }}
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
