import React from 'react';
import queryString from 'query-string';
import styled from 'styled-components';

import Layout from 'components/layout';
import { BasketContext } from 'components/basket';
import BillingDetails from 'components/billing-details';
import OrderItems from 'components/order-items';
import { H1, Outer, Header, responsive } from 'ui';

export const Inner = styled.div`
  display: flex;

  ${responsive.xs} {
    flex-direction: column;
  }
`;

class Confirmation extends React.Component {
  state = {
    emptied: false,
    orderData: null
  };

  static async getInitialProps({ req }) {
    const { query } = queryString.parseUrl(req.url);
    return { orderId: query.order_id, paymentMethod: query.payment_method };
  }

  componentDidMount() {
    const { orderId, paymentMethod } = this.props;
    this.empty();

    let url = `/api/order-confirmation?order_id=${orderId}`;
    if (paymentMethod) url = `${url}&payment_method=${paymentMethod}`;
    fetch(url)
      .then(res => res.json())
      .then(orderData => this.setState({ orderData }));
  }

  static contextType = BasketContext;

  empty() {
    const { emptied } = this.state;
    const { actions } = this.context;
    if (!emptied) {
      actions.empty();
      this.setState({ emptied: true });
    }
  }

  render() {
    const { orderId } = this.props;
    const { orderData } = this.state;

    if (!orderData || !orderData.data) {
      return <Layout loading />;
    }

    const order = orderData.data.orders.get;
    const { email } = order.customer.addresses[0];

    const items = order.cart.map(item => ({
      ...item,
      image: {
        url: item.imageUrl
      },
      price: item.price.net
    }));

    return (
      <Layout title="Order Summary">
        <Outer>
          <Header>
            <H1>Order Summary</H1>
            <p>
              Your order (<strong>#{orderId}</strong>) has been confirmed. A
              copy of your order has been sent to <strong>{email}</strong>.
            </p>
          </Header>
          <Inner>
            <OrderItems items={items} />
            <BillingDetails order={order} />
          </Inner>
        </Outer>
      </Layout>
    );
  }
}

export default Confirmation;
