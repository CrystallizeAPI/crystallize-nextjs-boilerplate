import React from 'react';
import queryString from 'query-string';

import Layout from 'components/layout';
import BillingDetails from 'components/billing-details';
import OrderItems from 'components/order-items';
import { useOrderByIdQuery } from 'lib/graph';
import { H1, Outer, Header } from 'ui';

import { Inner } from './styles';

const Confirmation = ({ orderId }) => {
  const { fetching, error, data } = useOrderByIdQuery({
    id: orderId
  });

  if (error) {
    return <Layout error />;
  }

  if (fetching || !data) {
    return <Layout loading />;
  }

  const order = data.orders.get;
  const { email } = order.customer.addresses[0];

  const items = order.cart.map(item => ({
    ...item,
    price: item.price.net
  }));

  return (
    <Layout title="Order Sumary">
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
  return { orderId: query.id };
};

export default Confirmation;
