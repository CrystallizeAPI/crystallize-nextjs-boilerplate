import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from 'components/layout';
import { useBasket } from 'components/basket';
import OrderItems from 'components/order-items';
import { H1, H3, Outer, Header, colors } from 'ui';

import BillingDetails from './billing-details';

const CustomHeader = styled(Header)`
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Line = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.light};
`;

export default function Confirmation({ order: orderData }) {
  const basket = useBasket();

  const [emptied, setEmptied] = useState(false);

  useEffect(() => {
    if (!emptied) {
      basket.actions.empty();
      setEmptied(true);
    }
  }, [emptied, basket.actions]);

  const order = orderData.data.orders.get;
  const { email } = order.customer.addresses[0];

  const items = order.cart.map((item) => ({
    ...item,
    image: {
      url: item.imageUrl,
    },
    price: item.price.net,
  }));

  return (
    <Layout title="Order Summary">
      <Outer>
        <CustomHeader>
          <H1>Order Summary</H1>
          <p>
            Your order has been confirmed. A copy of your order has been sent to{' '}
            <strong>{email}</strong>.
          </p>
          <Line />
          <BillingDetails order={order} />
          <Line />
          <H3>Order Items</H3>
          <OrderItems items={items} />
        </CustomHeader>
      </Outer>
    </Layout>
  );
}
