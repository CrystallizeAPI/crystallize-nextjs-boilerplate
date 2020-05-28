import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import StripeCheckout from './stripe-checkout';

class StripeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientSecret: null,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const { items, currency } = this.props;

    const lineItems = items.map((item) => ({
      id: item.variant_id,
      path: item.path,
      quantity: item.quantity,
    }));

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    const { client_secret } = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currency,
        lineItems,
      }),
    }).then((res) => res.json());

    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(publishableKey),
        clientSecret: client_secret,
        loading: false,
      });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(publishableKey),
          clientSecret: client_secret,
          loading: false,
        });
      });
    }
  }

  render() {
    const { personalDetails, items, onSuccess } = this.props;
    const { loading, cardElementStyle, clientSecret, stripe } = this.state;

    if (loading || !clientSecret) return <p>Loading...</p>;

    return stripe ? (
      <StripeProvider stripe={stripe}>
        <Elements>
          <StripeCheckout
            cardElementStyle={cardElementStyle}
            clientSecret={clientSecret}
            handleCardChange={this.handleCardChange}
            onSuccess={onSuccess}
            items={items}
            personalDetails={personalDetails}
          />
        </Elements>
      </StripeProvider>
    ) : (
      <p>Initialising payment gateway...</p>
    );
  }
}

export default StripeWrapper;
