import React from 'react';

import { useT } from 'lib/i18n';
import { useBasket } from '../index';

import { Outer, Row, Rows } from './styles';

export const Totals = () => {
  const t = useT();
  const { total } = useBasket();

  return (
    <Outer>
      <Rows>
        <Row modifier="total-price">
          <span>{t('basket.totalPrice')}:</span>
          <span>{t('common.price', { value: total.net })}</span>
        </Row>
        {/* {discount && (
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
        )} */}

        <Row modifier="total-vat">
          <span>{t('basket.vat')}:</span>
          <span>{t('common.price', { value: total.vat })}</span>
        </Row>
        <Row modifier="to-pay">
          <span>{t('basket.totalToPay')}:</span>
          <span>{t('common.price', { value: total.gross })}</span>
        </Row>
      </Rows>
    </Outer>
  );
};
