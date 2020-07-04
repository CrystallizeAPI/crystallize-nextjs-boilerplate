import React, { useState, useEffect } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { useRouter } from 'next/router';

import { defaultLanguage } from 'lib/language';

import Form from './form';

export default function StripeWrapper({
  items,
  currency,
  personalDetails,
  onSuccess
}) {
  const [state, setState] = useState('loading');
  const [clientSecret, setClientSecret] = useState(null);
  const [stripe, setStripe] = useState(null);
  const router = useRouter();
  const {
    query: { language = defaultLanguage }
  } = router;

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
        '/api/payment-providers/stripe/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currency,
            lineItems,
            language
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
  }, [currency, items, language]);

  if (state === 'loading' || !clientSecret) return <p>Loading...</p>;

  return stripe ? (
    <StripeProvider stripe={stripe}>
      <Elements>
        <Form
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
