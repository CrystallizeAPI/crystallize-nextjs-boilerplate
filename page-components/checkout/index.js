/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';

import { useBasket } from 'components/basket';
import { CurrencyValue } from 'components/currency-value';
import Layout from 'components/layout';

import PaymentGateway from './payment-gateway';
import {
  Outer,
  Inner,
  Item,
  ItemImage,
  ItemName,
  Items,
  ItemQuantity,
  ItemPrice
} from './styles';

const Checkout = () => {
  const basket = useBasket();

  if (!basket.state.ready) {
    return (
      <Layout title="Checkout" simple loading>
        Getting basket...
      </Layout>
    );
  }

  const { items } = basket.state;

  if (!items.length) {
    return (
      <Layout title="Checkout" simple>
        <Outer>Basket is empty</Outer>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout" simple>
      <Outer>
        <Inner>
          <Items>
            {items.map(item => (
              <Item key={item.id}>
                <ItemImage {...item.image} alt={item.name} />
                <ItemName>{item.name}</ItemName>
                <ItemQuantity>
                  {item.quantity}
                  pcs
                </ItemQuantity>
                <ItemPrice>
                  <CurrencyValue value={item.price * item.quantity} />
                </ItemPrice>
              </Item>
            ))}
          </Items>
        </Inner>
        <PaymentGateway />
      </Outer>
    </Layout>
  );
};

export default Checkout;
