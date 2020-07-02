import React, { useState, useEffect } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import StripeCheckout from './stripe-checkout';

export default function StripeWrapper({
  items,
  currency,
  personalDetails,
  onSuccess
}) {
  const [state, setState] = useState('loading');
  const [clientSecret, setClientSecret] = useState(null);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    async function load() {
      setState('loading');

      const lineItems = items.map((item) => ({
        id: item.variant_id,
        path: item.path,
        quantity: item.quantity
      }));

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      const { client_secret } = await fetch(
        '/api/stripe/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currency,
            lineItems
          })
        }
      ).then((res) => res.json());

      function init() {
        setState('loaded');
        setClientSecret(client_secret);
        setStripe(window.Stripe(publishableKey));
      }

      if (window.Stripe) {
        init();
      } else {
        document.querySelector('#stripe-js').addEventListener('load', init);
      }
    }

    load();
  }, [currency, items]);

  if (state === 'loading' || !clientSecret) return <p>Loading...</p>;

  return stripe ? (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeCheckout
          clientSecret={clientSecret}
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
