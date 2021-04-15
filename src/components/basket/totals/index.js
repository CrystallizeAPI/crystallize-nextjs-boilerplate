import React from 'react';

import { useTranslation } from 'next-i18next';
import { Spinner } from 'ui/spinner';

import { useBasket } from '../index';

import { Outer, Rows, Row, RowValue, SpinnerWrap } from './styles';

export default function Totals(props) {
  const { t } = useTranslation(['common', 'basket']);
  const { cart, total, status } = useBasket();

  if (cart.length === 0) {
    return null;
  }

  const { currency } = total;
  function printCurrencyAmount(value) {
    return t('price', { value, currency });
  }

  const hasDiscount = total?.discount > 0;
  const isLoading = status === 'server-basket-is-stale';

  return (
    <Outer {...props}>
      <Rows>
        {isLoading && (
          <SpinnerWrap>
            <Spinner />
          </SpinnerWrap>
        )}
        <Row modifier="total-price">
          <span>{t('basket:totalPrice')}:</span>
          <RowValue hide={isLoading}>
            {printCurrencyAmount(total.gross + total.discount)}
          </RowValue>
        </Row>
        {hasDiscount && (
          <Row modifier="total-discout">
            <span>{t('basket:discount')}:</span>
            <RowValue hide={isLoading}>
              {printCurrencyAmount(total.discount * -1)}
            </RowValue>
          </Row>
        )}
        <Row modifier="total-tax">
          <span>{t('basket:tax')}:</span>
          <RowValue hide={isLoading}>
            {printCurrencyAmount(
              parseInt((total.gross - total.net) * 100, 10) / 100
            )}
          </RowValue>
        </Row>
        <Row modifier="to-pay">
          <span>{t('basket:totalToPay')}:</span>
          <RowValue hide={isLoading}>
            {printCurrencyAmount(total.gross)}
          </RowValue>
        </Row>
      </Rows>
    </Outer>
  );
}
