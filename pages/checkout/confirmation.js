/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { BasketConsumer } from '@crystallize/react-basket';

import withData from 'lib/with-data';
import Layout from 'cmp/layout';

class Inner extends React.Component {
  state = {
    emptied: false
  };

  componentDidMount() {
    this.empty();
  }

  empty() {
    if (!this.state.emptied) {
      this.props.actions.empty();
      this.setState({ emptied: true });
    }
  }

  render() {
    const { order } = this.props;
    console.log(order);
    return (
      <div>
        <h1>Thank you for the purchase!</h1>
        <br />
        <div>Order id {order.id}</div>
        <div>
          Total price incl. tax: {order.cart.total_price_including_tax / 100},-
        </div>
        <div>Metadata {order.merchant_order_data.comment}</div>
        <div dangerouslySetInnerHTML={{ __html: order.gui.snippet }} />
      </div>
    );
  }
}

class CheckoutConfirmation extends React.Component {
  static async getInitialProps(ctx) {
    return { order: ctx.req.crystallizeKlarnaOrder };
  }

  render() {
    return (
      <Layout title="confirmation">
        <BasketConsumer>
          {props => <Inner {...props} order={this.props.order} />}
        </BasketConsumer>
      </Layout>
    );
  }
}

export default withData(CheckoutConfirmation);
