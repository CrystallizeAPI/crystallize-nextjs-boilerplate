/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';

import { CurrencyValue } from 'components/currency-value';
import { BasketContext } from 'components/basket';
import Layout from 'components/layout';

class Inner extends React.Component {
  state = {
    emptied: false
  };

  componentDidMount() {
    this.empty();
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
    const { order } = this.props;
    if (!order) {
      return null;
    }

    return (
      <div>
        <h1>Thank you for the purchase!</h1>
        <br />
        <div>
          Order id
          {order.id}
        </div>
        <div>
          Total price incl. tax:
          <CurrencyValue value={order.cart.total_price_including_tax / 100} />
        </div>
      </div>
    );
  }
}

class CheckoutConfirmation extends React.Component {
  static async getInitialProps(ctx) {
    return { order: ctx.req.klarnaOrder };
  }

  render() {
    return (
      <Layout title="confirmation">
        <Inner {...this.props} />
      </Layout>
    );
  }
}

export default CheckoutConfirmation;
