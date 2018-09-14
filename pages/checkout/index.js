/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';
import { BasketConsumer } from '@crystallize/react-basket';

import Layout from 'components/layout';

class Inner extends React.Component {
  render() {
    const { order } = this.props;
    // console.log(order);

    if (!order) {
      return null;
    }

    return <div dangerouslySetInnerHTML={{ __html: order.gui.snippet }} />;
  }
}

export default class CheckoutConfirmation extends React.Component {
  static async getInitialProps(ctx) {
    return { order: ctx.req.crystallizeKlarnaOrder };
  }

  render() {
    const { order } = this.props;
    return (
      <Layout title="Checkout">
        <BasketConsumer>
          {props => <Inner {...props} order={order} />}
        </BasketConsumer>
      </Layout>
    );
  }
}
