import React from 'react';
import styled from 'styled-components';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { Spinner } from 'ui';
import StripeCheckout from './stripe';

// You can get this from https://dashboard.stripe.com/test/apikeys in test mode
const stripeClientSecret = 'stripe';

// const Outer = styled.div`
//   flex-grow: 1;
//   flex: 0 1 500px;
//   background: #eee;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.5rem;
//   min-height: 500px;
// `;

const Outer = styled.div`
  flex-grow: 1;
`;

const InitiatingText = styled.div`
  margin-right: 15px;
`;

class PaymentGateway extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: null,
      clientSecret: null
    };
  }

  async componentWillMount() {
    const { items } = this.props;
    const amount =
      items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;

    const { clientSecret } = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({
        amount
      })
    }).then(res => res.json());

    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(stripeClientSecret),
        clientSecret
      });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(stripeClientSecret),
          clientSecret
        });
      });
    }
  }

  render() {
    const { stripe, clientSecret } = this.state;

    return (
      <Outer>
        {!stripe ? (
          <>
            <InitiatingText>Initiating payment gateway...</InitiatingText>
            <Spinner />
          </>
        ) : (
          <StripeProvider stripe={stripe}>
            <Elements>
              <StripeCheckout clientSecret={clientSecret} />
            </Elements>
          </StripeProvider>
        )}
      </Outer>
    );
  }
}

export default PaymentGateway;
