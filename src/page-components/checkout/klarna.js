import React from 'react';

export default class KlarnaCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
    };
  }

  async componentDidMount() {
    const { items, currency } = this.props;

    this.setState({ loading: true });
    // Create order within Crystallize
    try {
      const response = await fetch('/api/klarna/render-checkout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency,
          lineItems: items.map((item) => ({
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
            product_tax_amount: item.vatAmount,
          })),
        }),
      });

      this.setState({ loading: false });

      // https://developers.klarna.com/documentation/klarna-checkout/integration-guide/render-the-checkout/
      const klarnaResponse = await response.json();
      if (!klarnaResponse.success) {
        this.setState({
          loading: false,
          error: 'Could not load Klarna checkout',
        });
        return;
      }
      const checkoutContainer = document.getElementById(
        'klarna-checkout-container'
      );
      checkoutContainer.innerHTML = klarnaResponse.html;

      const scriptsTags = checkoutContainer.getElementsByTagName('script');

      // This is necessary otherwise the scripts tags are not going to be evaluated
      for (let i = 0; i < scriptsTags.length; i++) {
        const { parentNode } = scriptsTags[i];
        const newScriptTag = document.createElement('script');
        newScriptTag.type = 'text/javascript';
        newScriptTag.text = scriptsTags[i].text;
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  }

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Unable to initialise Klarna payment!</p>;
    }

    return <div id="klarna-checkout-container" />;
  }
}
