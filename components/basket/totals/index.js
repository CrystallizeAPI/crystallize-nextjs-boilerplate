import React from 'react';

import { CurrencyValue } from 'components/currency-value';
import { useBasket } from '../context';

import { Outer, Row, StrikeThrough, Rows } from './styles';

export const Totals = () => {
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
          <span>Total price:</span>
          <span>
            <CurrencyValue value={totalPrice} />
          </span>
        </Row>
        {discount && (
          <>
            <Row modifier="discount">
              <span>Discount:</span>
              <span>
                <CurrencyValue value={discount} />
              </span>
            </Row>
            <Row modifier="total-after-discount">
              <span>Total after discount:</span>
              <span>
                <CurrencyValue value={totalPriceMinusDiscount} />
              </span>
            </Row>
          </>
        )}
        <Row modifier="shipping">
          <span>Shipping:</span>
          {freeShipping ? (
            <span>
              {shipping && shipping.unit_price > 0 && (
                <StrikeThrough>
                  <CurrencyValue value={shipping.unit_price} />
                </StrikeThrough>
              )}{' '}
              <CurrencyValue value="0" />
            </span>
          ) : (
            <span>
              <CurrencyValue value={shipping ? shipping.unit_price : 0} />
            </span>
          )}
        </Row>

        <Row modifier="total-vat">
          <span>TAX amount:</span>
          <span>
            <CurrencyValue value={totalVatAmount} />
          </span>
        </Row>
        <Row modifier="to-pay">
          <span>To pay:</span>
          <span>
            <CurrencyValue value={totalToPay} />
          </span>
        </Row>
      </Rows>
    </Outer>
  );
};
