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

  return (
    <Outer>
      <Rows>
        {status === 'server-state-is-stale' && (
          <SpinnerWrap>
            <Spinner />
          </SpinnerWrap>
        )}
        <Row modifier="total-price">
          <span>{t('basket.totalPrice')}:</span>
          <RowValue hide={status === 'server-state-is-stale'}>
            {t('common.price', { value: total.net, currency: total.currency })}
          </RowValue>
        </Row>
        <Row modifier="total-tax">
          <span>{t('basket.tax')}:</span>
          <RowValue hide={status === 'server-state-is-stale'}>
            {t('common.price', {
              value: parseInt((total.gross - total.net) * 100, 10) / 100,
              currency: total.currency
            })}
          </RowValue>
        </Row>
        <Row modifier="to-pay">
          <span>{t('basket.totalToPay')}:</span>
          <RowValue hide={status === 'server-state-is-stale'}>
            {t('common.price', {
              value: total.gross,
              currency: total.currency
            })}
          </RowValue>
        </Row>
      </Rows>
    </Outer>
  );
}
