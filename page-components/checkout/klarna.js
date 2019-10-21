import React from 'react';
import { Button } from 'ui';

export default class KlarnaCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.onRenderKlarnaCheckout = this.onRenderKlarnaCheckout.bind(this);
  }

  onRenderKlarnaCheckout = async () => {
    const { items } = this.props;
    // Create order within Crystallize
    let response;
    try {
      response = await fetch('/api/klarna/render-checkout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lineItems: items.map(item => ({
            name: item.name,
            sku: item.sku,
            net: item.price,
            gross: item.priceWithoutVat,
            quantity: item.quantity,
            subscription: item.subscription
          }))
        })
      });
    } catch (err) {
      console.log('ERROR', err);
    }

    return response || <h2>${response}</h2>;
  };

  render() {
    return (
      <Button onClick={this.onRenderKlarnaCheckout}>Klarna checkout</Button>
    );
  }
}
