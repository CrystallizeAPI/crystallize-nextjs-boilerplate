import React from 'react';

class StripeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const { personalDetails, items, currency } = this.props;

    const lineItems = items.map(item => ({
      name: item.name,
      sku: item.sku,
      net: item.price,
      gross: item.priceWithoutVat,
      quantity: item.quantity,
      product_id: item.id,
      product_variant_id: item.variant_id,
      image_url: item.image.url,
      subscription: item.subscription,
      tax_group: item.taxGroup,
      product_tax_amount: item.vatAmount
    }));

    const response = await fetch('/api/vipps/initiate-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalDetails,
        currency,
        lineItems
      })
    }).then(res => res.json());

    this.setState({ loading: false });

    // handle response
    console.log(response);
  }

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Unable to initialise Vipps payment!</p>;
    }

    return <div id="vipps-checkout-container" />;
  }
}

export default StripeWrapper;
