import React from 'react';

import { useT } from 'lib/i18n';
import { Spinner } from 'ui/spinner';

import { useBasket } from '../index';

import { Outer, Rows, Row, RowValue, SpinnerWrap } from './styles';

export default function Totals() {
  const t = useT();
  const { cart, total, status } = useBasket();

  if (cart.length === 0) {
    return null;
  }

  const { currency } = total;
  function printCurrencyAmount(value) {
    return t('common.price', { value, currency });
  }

  const hasDiscount = total?.discount > 0;
  const isLoading = status === 'server-state-is-stale';
  return (
    <Outer>
      <Rows>
        {isLoading && (
          <SpinnerWrap>
            <Spinner />
          </SpinnerWrap>
        )}
        <Row modifier="total-price">
          <span>{t('basket.totalPrice')}:</span>
          <RowValue hide={isLoading}>{printCurrencyAmount(total.net)}</RowValue>
        </Row>
        <Row modifier="total-tax">
          <span>{t('basket.tax')}:</span>
          <RowValue hide={isLoading}>
            {printCurrencyAmount(
              parseInt((total.gross - total.net) * 100, 10) / 100
            )}
          </RowValue>
        </Row>
        {hasDiscount && (
          <Row modifier="total-discout">
            <span>{t('basket.discount')}:</span>
            <RowValue hide={isLoading}>
              {printCurrencyAmount(total.discount)}
            </RowValue>
          </Row>
        )}
        <Row modifier="to-pay">
          <span>{t('basket.totalToPay')}:</span>
          <RowValue hide={isLoading}>
            {printCurrencyAmount(total.gross)}
          </RowValue>
        </Row>
      </Rows>
    </Outer>
  );
}
