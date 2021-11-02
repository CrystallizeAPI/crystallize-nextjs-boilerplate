import React from 'react';
import { useTranslation } from 'next-i18next';
import { Outer, StockColorIndicator, Row, Location } from './styles';

const STOCK_LIMIT = 20;
const STOCK_COLOR_INDICATOR = {
  NO_STOCK: '#FF7ECE',
  ABOVE_LIMIT: '#67EACE',
  BETWEEN_ZERO_AND_LIMIT: '#FFF081'
};

const Stock = ({ selectedVariant }) => {
  return (
    <Outer>
      {selectedVariant.stockLocations?.map(({ identifier, name, stock }) => {
        const hasStock = stock >= 1;
        const hasMoreStockThanLimit = stock > STOCK_LIMIT;

        let stockColor;
        if (!hasStock) {
          stockColor = STOCK_COLOR_INDICATOR.NO_STOCK;
        } else if (hasMoreStockThanLimit) {
          stockColor = STOCK_COLOR_INDICATOR.ABOVE_LIMIT;
        } else {
          stockColor = STOCK_COLOR_INDICATOR.BETWEEN_ZERO_AND_LIMIT;
        }

        return (
          <Row key={identifier}>
            <Location>{name}</Location>
            <div>
              <StockColorIndicator color={stockColor} />
              {hasStock ? <StockCount count={stock} /> : <OutOfStock />}
            </div>
          </Row>
        );
      })}
    </Outer>
  );
};

export default Stock;

function OutOfStock() {
  const { t } = useTranslation('product');

  return <span>{t('outOfStock')}</span>;
}

function StockCount({ count }) {
  const { t } = useTranslation('product');
  const stockCountToDisplay = count > STOCK_LIMIT ? `${STOCK_LIMIT}+` : count;

  return <span>{t('stock', { stockCount: stockCountToDisplay })}</span>;
}
