import styled from 'styled-components';

import { useT } from 'lib/i18n';
import { orderByOptions } from 'lib/search';

const Outer = styled.select`
  padding: 10px 0;
  outline: none;
  border: none;
  width: 160px;
  margin-top: 15px;
`;

export default function OrderBy({ orderBy, onChange }) {
  const t = useT();

  return (
    <Outer
      value={orderBy?.value}
      onChange={(e) => {
        onChange(orderByOptions.find((o) => o.value === e.target.value));
      }}
    >
      {orderByOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {t(`search.order.${option.value}`)}
        </option>
      ))}
    </Outer>
  );
}
