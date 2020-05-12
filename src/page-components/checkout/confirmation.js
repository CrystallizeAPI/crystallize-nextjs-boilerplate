import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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

export default function Confirmation() {
  const router = useRouter();
  const basket = useBasket();

  const { orderId, paymentMethod } = router.query;

  const [emptied, setEmptied] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!emptied) {
      basket.actions.empty();
      setEmptied(true);
    }

    let url = `/api/order-confirmation?order_id=${orderId}`;
    if (paymentMethod) url = `${url}&payment_method=${paymentMethod}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrderData(data));
  }, [emptied, paymentMethod, basket.actions, orderId]);

  if (!orderData || !orderData.data) {
    return <Layout loading>Please wait. Getting receipt...</Layout>;
  }

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
            Your order (<strong>#{orderId}</strong>) has been confirmed. A copy
            of your order has been sent to <strong>{email}</strong>.
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
