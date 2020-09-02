import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

import { doPost } from 'lib/rest-api/helpers';
import { Button } from 'ui';
import { useT } from 'lib/i18n';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Persist by create order in Crystallize
async function persistOrder({ paymentIntent, paymentModel }) {
  const { data } = await doPost(
    '/api/payment-providers/stripe/order-persistence',
    {
      body: JSON.stringify({
        paymentIntentId: paymentIntent.id,
        paymentModel
      })
    }
  );

  return data.orders.create.id;
}

function Form({ clientSecret, paymentModel, onSuccess }) {
  const t = useT();
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('idle');

  function handleSubmit(event) {
    event.preventDefault();

    setStatus('confirming');

    go();

    async function go() {
      if (!stripe || !elements) {
        setTimeout(go, 100);
        return;
      }

      const { customer } = paymentModel;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${customer.firstName} ${customer.lastName}`
            }
          }
        }
      );
      if (error) {
        setStatus({ error });
      } else {
        // The payment has been processed!
        if (paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
          const orderId = await persistOrder({
            paymentIntent,
            paymentModel
          });
          if (orderId) {
            onSuccess(orderId);
          }
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <div style={{ marginTop: 25 }}>
        <Button
          type="submit"
          state={status === 'confirming' ? 'loading' : null}
          disabled={status === 'confirming'}
        >
          {t('checkout.payNow')}
        </Button>
      </div>
    </form>
  );
}

export default function StripeWrapper({ paymentModel, ...props }) {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    async function getClientSecret() {
      const { client_secret } = await doPost(
        '/api/payment-providers/stripe/create-payment-intent',
        {
          body: JSON.stringify({
            paymentModel
          })
        }
      );

      setClientSecret(client_secret);
    }

    getClientSecret();
  }, [paymentModel]);

  return (
    <Elements locale="en" stripe={stripePromise}>
      <Form
        {...props}
        paymentModel={paymentModel}
        clientSecret={clientSecret}
      />
    </Elements>
  );
}
