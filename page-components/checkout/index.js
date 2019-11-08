/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';

import { useBasket } from 'components/basket';
import Layout from 'components/layout';
import OrderItems from 'components/order-items';
import { H1, Outer } from 'ui';
import PaymentGateway from './payment-gateway';
import { Inner } from './styles';

const Checkout = () => {
  const basket = useBasket();

  if (!basket.state.ready) {
    return (
      <Layout title="Checkout" simple loading>
        Getting basket...
      </Layout>
    );
  }

  const { items, currency } = basket.state;

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
        <H1>Checkout</H1>
        <Inner>
          <OrderItems items={items} currency={currency} />
          <PaymentGateway items={items} currency={currency} />
        </Inner>
      </Outer>
    </Layout>
  );
};

export default Checkout;
