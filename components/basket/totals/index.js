import React, { Fragment } from 'react';

import { useTranslation } from 'lib/i18n';
import { useBasket } from '../context';

import { Outer, Row, StrikeThrough, Rows } from './styles';

export const Totals = () => {
  const { t } = useTranslation(['common', 'basket']);
  const { state } = useBasket();

  const {
    discount,
    totalPrice,
    totalPriceMinusDiscount,
    totalToPay,
    totalVatAmount,
    shipping,
    freeShipping
  } = state;

  return (
    <Outer>
      <Rows>
        <Row modifier="total-price">
          <span>{t('basket:totalPrice', state)}:</span>
          <span>{t('currency', { amount: totalPrice })}</span>
        </Row>
        {discount && (
          <Fragment>
            <Row modifier="discount">
              <span>{t('basket:discount', state)}:</span>
              <span>{t('currency', { amount: discount })}</span>
            </Row>
            <Row modifier="total-after-discount">
              <span>{t('basket:totalAfterDiscount', state)}:</span>
              <span>{t('currency', { amount: totalPriceMinusDiscount })}</span>
            </Row>
          </Fragment>
        )}
        <Row modifier="shipping">
          <span>{t('basket:shipping', state)}:</span>
          {freeShipping ? (
            <span>
              {shipping && shipping.unit_price > 0 && (
                <StrikeThrough>
                  {t('currency', { amount: shipping.unit_price })}
                </StrikeThrough>
              )}{' '}
              {t('currency', { amount: 0 })}
            </span>
          ) : (
            <span>
              {t('currency', { amount: shipping ? shipping.unit_price : 0 })}
            </span>
          )}
        </Row>

        <Row modifier="total-vat">
          <span>{t('basket:totalVatAmount', state)}:</span>
          <span>{t('currency', { amount: totalVatAmount.toFixed(2) })}</span>
        </Row>
        <Row modifier="to-pay">
          <span>{t('basket:amountToPay', state)}:</span>
          <span>{t('currency', { amount: totalToPay })}</span>
        </Row>
      </Rows>
    </Outer>
  );
};
