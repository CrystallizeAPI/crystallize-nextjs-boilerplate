import React from 'react';
import styled from 'styled-components';
import { IconStock } from 'ui/icons';
import { useT } from 'lib/i18n';

const Outer = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center;
  font-size: var(--font-size-secondary);
  font-weight: 600;
  svg {
    margin-right: 10px;
  }
`;

const StockIndicator = styled.span`
  width: 10px;
  height: 10px;
  background: ${(p) => p.color};
  border-radius: 50%;
  margin-left: 10px;
`;
const Stock = ({ selectedVariant }) => {
  const t = useT();

  const stockCount = selectedVariant?.stock;
  const stockColor =
    stockCount > 0 ? (stockCount > 20 ? '#DAF5CB' : '#FFD23F') : 'red';

  return (
    <Outer>
      <IconStock />
      {stockCount > 1 ? (
        <span>
          {t('product.stock', {
            stockCount: stockCount > 20 ? `20+` : stockCount
          })}
        </span>
      ) : (
        <span>{t('product.outOfStock')}</span>
      )}
      <StockIndicator color={stockColor} />
    </Outer>
  );
};

export default Stock;
