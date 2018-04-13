/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { BasketConsumer } from '@crystallize/react-basket';

import withData from 'lib/with-data';
import Layout from 'cmp/layout';

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

class CheckoutConfirmation extends React.Component {
  static async getInitialProps(ctx) {
    return { order: ctx.req.crystallizeKlarnaOrder };
  }

  render() {
    return (
      <Layout title="Checkout">
        <BasketConsumer>
          {props => <Inner {...props} order={this.props.order} />}
        </BasketConsumer>
      </Layout>
    );
  }
}

export default withData(CheckoutConfirmation);
