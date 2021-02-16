import React from 'react';
import { IconStock } from 'ui/icons';
import { useT } from 'lib/i18n';
import { Outer, StockIndicator } from './styles';

const STOCK_LIMIT = 20;

const Stock = ({ selectedVariant }) => {
  const stockCount = selectedVariant?.stock;
  const hasStock = stockCount > 1;
  const hasMoreStockThanLimit = stockCount > STOCK_LIMIT;

  let stockColor;
  if (!hasStock) {
    stockColor = 'red';
  } else if (hasMoreStockThanLimit) {
    stockColor = '#DAF5CB';
  } else {
    stockColor = '#FFD23F';
  }

  return (
    <Outer>
      <IconStock />
      {hasStock ? <StockCount count={stockCount} /> : <OutOfStock />}
      <StockIndicator color={stockColor} />
    </Outer>
  );
};

export default Stock;

function OutOfStock() {
  const t = useT();

  return <span>{t('product.outOfStock')}</span>;
}

function StockCount({ count }) {
  const t = useT();
  const stockCountToDisplay = count > STOCK_LIMIT ? `${STOCK_LIMIT}+` : count;

  return <span>{t('product.stock', { stockCount: stockCountToDisplay })}</span>;
}
