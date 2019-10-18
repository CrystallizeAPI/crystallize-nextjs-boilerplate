import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Router from 'next/router';
import styled from 'styled-components';

import { responsive } from 'ui';
import StripeCheckout from './stripe';

// You can get this from https://dashboard.stripe.com/test/apikeys in test mode
const stripeClientSecret = process.env.STRIPE_PUBLISHABLE_KEY;

const Outer = styled.div`
  width: 300px;

  ${responsive.xs} {
    width: 100%;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: white;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 0.2rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
`;

class PaymentGateway extends React.Component {
  state = {
    // chosenPaymentMethod: null,
    clientSecret: null,
    stripe: null
  };

  async componentDidMount() {
    const { items } = this.props;

    const lineItems = items.map(item => ({
      id: item.id,
      path: item.path,
      quantity: item.quantity
    }));

    const { client_secret } = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({
        lineItems
      })
    }).then(res => res.json());

    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(stripeClientSecret),
        clientSecret: client_secret
      });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(stripeClientSecret),
          clientSecret: client_secret
        });
      });
    }
  }

  render() {
    const { items } = this.props;
    const { clientSecret, stripe } = this.state;

    return (
      <Outer>
        <Inner>
          {stripe ? (
            <StripeProvider stripe={stripe}>
              <Elements>
                <StripeCheckout
                  clientSecret={clientSecret}
                  items={items}
                  onSuccess={orderId => Router.push(`/confirmation/${orderId}`)}
                />
              </Elements>
            </StripeProvider>
          ) : (
            <p>Initialising payment gateway...</p>
          )}
        </Inner>
      </Outer>
    );
  }
}

export default PaymentGateway;
