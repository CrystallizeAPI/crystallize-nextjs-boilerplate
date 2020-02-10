import React from 'react';
import Head from 'next/head';

import { useSettings } from 'components/settings-context';
import { useBasket } from 'components/basket';
import Layout from 'components/layout';
import OrderItems from 'components/order-items';
import { H1, Outer } from 'ui';
import PaymentGateway from './payment-gateway';
import { Inner, OrderItemsWrapper } from './styles';

const Checkout = () => {
  const basket = useBasket();
  const settings = useSettings();

  if (!basket.state.ready) {
    return 'Getting basket...';
  }

  const { items } = basket.state;
  const { currency } = settings;

  if (!items.length) {
    return <Outer>Basket is empty</Outer>;
  }

  return (
    <Outer>
      <H1>Checkout</H1>
      <Inner>
        <PaymentGateway items={items} currency={currency} />
        <OrderItemsWrapper>
          <OrderItems items={items} currency={currency} />
        </OrderItemsWrapper>
      </Inner>
    </Outer>
  );
};

export default function CheckoutLoader(props) {
  return (
    <Layout title="Checkout" simple>
      <Head>
        <script id="stripe-js" src="https://js.stripe.com/v3/" async />
      </Head>
      <Checkout {...props} />
    </Layout>
  );
}
