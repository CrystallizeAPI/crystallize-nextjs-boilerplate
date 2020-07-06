import React from 'react';

import { useSettings } from 'components/settings-context';
import { useBasket } from 'components/basket';
import Layout from 'components/layout';
import OrderItems from 'components/order-items';

import Payment from './payment';
import { Outer, Inner, SectionHeader, Container } from './styles';

function Checkout() {
  const basket = useBasket();
  const settings = useSettings();

  if (!basket.state.ready) {
    return <Outer center>Hold on. Retrieving your basket...</Outer>;
  }

  const { items } = basket.state;
  const { currency } = settings;

  if (!items.length) {
    return <Outer center>Basket is empty</Outer>;
  }

  return (
    <Outer>
      <Inner>
        <Container>
          <SectionHeader>Checkout</SectionHeader>
          <Payment items={items} currency={currency} />
        </Container>
        <Container>
          <SectionHeader>Basket</SectionHeader>
          <OrderItems items={items} currency={currency} />
        </Container>
      </Inner>
    </Outer>
  );
}

export default function CheckoutWithLayout(props) {
  return (
    <Layout title="Checkout" simple>
      <Checkout {...props} />
    </Layout>
  );
}
