/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';

import Layout from 'components/layout';

export default class Checkout extends React.Component {
  static async getInitialProps(ctx) {
    return { order: ctx.req.klarnaOrder };
  }

  render() {
    const { order } = this.props;

    if (!order) {
      return null;
    }

    return (
      <Layout title="Checkout">
        <div dangerouslySetInnerHTML={{ __html: order.gui.snippet }} />
      </Layout>
    );
  }
}
