import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';

import Layout from 'components/layout';
import BillingDetails from 'components/billing-details';
import OrderItems from 'components/order-items';
import { H1, Outer, Header, responsive } from 'ui';

export const Inner = styled.div`
  display: flex;

  ${responsive.xs} {
    flex-direction: column;
  }
`;

const Confirmation = ({ orderId, paymentMethod }) => {
  const [orderData, setOrder] = useState({});

  useEffect(() => {
    async function fetchData() {
      let url = `/api/order-confirmation?order_id=${orderId}`;
      if (paymentMethod) url = `${url}&payment_method=${paymentMethod}`;
      const response = await fetch(url);
      const order = await response.json();

      return setOrder(order);
    }
    fetchData();
  }, [orderId, paymentMethod]);

  if (!orderData.data) {
    return <Layout loading />;
  }

  const order = orderData.data.orders.get;
  const { email } = order.customer.addresses[0];

  const items = order.cart.map(item => ({
    ...item,
    price: item.price.net
  }));

  return (
    <Layout title="Order Summary">
      <Outer>
        <Header>
          <H1>Order Summary</H1>
          <p>
            Your order (<strong>#{orderId}</strong>) has been confirmed. A copy
            of your order has been sent to <strong>{email}</strong>.
          </p>
        </Header>
        <Inner>
          <OrderItems items={items} />
          <BillingDetails order={order} />
        </Inner>
      </Outer>
    </Layout>
  );
};

Confirmation.getInitialProps = async ({ req }) => {
  const { query } = queryString.parseUrl(req.url);
  return { orderId: query.order_id, paymentMethod: query.payment_method };
};

export default Confirmation;
