import React from 'react';

import { useT } from 'lib/i18n';

import { useBasket } from '../context';

import { Outer, Row, StrikeThrough, Rows } from './styles';

export const Totals = () => {
  const t = useT();
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
          <span>{t('basket.totalPrice')}:</span>
          <span>{t('common.price', { value: totalPrice })}</span>
        </Row>
        {discount && (
          <>
            <Row modifier="discount">
              <span>{t('basket.discount')}:</span>
              <span>{t('common.price', { value: discount })}</span>
            </Row>
            <Row modifier="total-after-discount">
              <span>{t('common.totalPriceAfterDiscount')}:</span>
              <span>
                {t('common.price', { value: totalPriceMinusDiscount })}
              </span>
            </Row>
          </>
        )}
        <Row modifier="shipping">
          <span>{t('basket.shippingPrice')}:</span>
          {freeShipping ? (
            <span>
              {shipping && shipping.unit_price > 0 && (
                <StrikeThrough>
                  {t('common.price', { value: shipping.unit_price })}
                </StrikeThrough>
              )}{' '}
              {t('common.price', { value: 0 })}
            </span>
          ) : (
            <span>
              {t('common.price', { value: shipping ? shipping.unit_price : 0 })}
            </span>
          )}
        </Row>

        <Row modifier="total-vat">
          <span>{t('basket.vat')}:</span>
          <span>{t('common.price', { value: totalVatAmount })}</span>
        </Row>
        <Row modifier="to-pay">
          <span>{t('basket.totalToPay')}:</span>
          <span>{t('common.price', { value: totalToPay })}</span>
        </Row>
      </Rows>
    </Outer>
  );
};
