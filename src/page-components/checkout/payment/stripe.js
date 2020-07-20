import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

import { Button } from 'ui';
import { useT } from 'lib/i18n';
import { useLocale } from 'lib/app-config';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Persist by create order in Crystallize
async function persistOrder({ paymentIntent, items }) {
  const response = await fetch(
    '/api/payment-providers/stripe/order-persistence',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentIntentId: paymentIntent.id,
        lineItems: items.map((item) => ({
          name: item.name,
          sku: item.sku,
          net: item.price,
          gross: item.priceWithoutVat,
          quantity: item.quantity,
          product_id: item.productId,
          product_variant_id: item.productVariantId,
          image_url: item.image?.url,
          subscription: item.subscription,
          tax_rate: item.taxGroup.percent,
          tax_group: item.taxGroup,
          product_tax_amount: item.vatAmount
        }))
      })
    }
  );

  const { data } = await response.json();
  return data.orders.create.id;
}

function Form({ clientSecret, personalDetails, items, onSuccess }) {
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

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${personalDetails.firstName} ${personalDetails.lastName}`
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

          const orderId = await persistOrder({ paymentIntent, items });
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

export default function StripeWrapper({ currency, items, ...props }) {
  const [clientSecret, setClientSecret] = useState(null);
  const locale = useLocale();

  useEffect(() => {
    async function getClientSecret() {
      const lineItems = items.map((item) => ({
        id: item.variant_id,
        path: item.path,
        quantity: item.quantity
      }));

      const { client_secret } = await fetch(
        '/api/payment-providers/stripe/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currency,
            lineItems,
            language: locale.crystallizeCatalogueLanguage
          })
        }
      ).then((res) => res.json());

      setClientSecret(client_secret);
    }

    getClientSecret();
  }, [currency, items, locale]);

  return (
    <Elements locale="en" stripe={stripePromise}>
      <Form {...props} items={items} clientSecret={clientSecret} />
    </Elements>
  );
}
