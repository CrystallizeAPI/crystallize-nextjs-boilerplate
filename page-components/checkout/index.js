/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';
import Head from 'next/head';
import { useBasket } from 'components/basket';
import Layout from 'components/layout';
import OrderItems from 'components/order-items';
import { H1, Outer } from 'ui';
import PaymentGateway from './payment-gateway';
import { Inner, OrderItemsWrapper } from './styles';

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
      <Head>
        <script id="stripe-js" src="https://js.stripe.com/v3/" async />
      </Head>

      <Outer>
        <H1>Checkout</H1>
        <Inner>
          <PaymentGateway items={items} currency={currency} />
          <OrderItemsWrapper>
            <OrderItems items={items} currency={currency} />
          </OrderItemsWrapper>
        </Inner>
      </Outer>
    </Layout>
  );
};

export default Checkout;
