import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';

import { Button } from 'ui';
import { useT } from 'lib/i18n';

import { CardElementWrapper, ErrorMessage } from './styles';
import { Input, InputGroup, Label } from '../../../styles';

const ShippingDetails = styled.div`
  display: flex;
`;

export default function StripeCheckoutForm({
  clientSecret,
  items,
  onSuccess,
  personalDetails
}) {
  const stripe = useStripe();
  const elements = useElements();

  const t = useT();
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [status, setStatus] = useState('idle');

  async function submit(evt) {
    evt.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setStatus('processing');

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    if (error) {
      setStatus({ error });
    } else {
      console.log(paymentMethod);
      setStatus({ paymentMethod });
    }

    return;

    // const { firstName, lastName, email } = personalDetails;
    // const { paymentIntent, error } = await stripe.handleCardPayment(
    //   clientSecret,
    //   {
    //     payment_method_data: {
    //       billing_details: {
    //         name: `${firstName} ${lastName}`,
    //         address: {
    //           line1: address,
    //           postal_code: postCode
    //         }
    //       }
    //     },
    //     receipt_email: email
    //   }
    // );

    // if (error) {
    //   return setStatus('error');
    // }

    // // Create order within Crystallize
    // try {
    //   const response = await fetch(
    //     '/api/payment-providers/stripe/order-persistence',
    //     {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         paymentIntentId: paymentIntent.id,
    //         lineItems: items.map((item) => ({
    //           name: item.name,
    //           sku: item.sku,
    //           net: item.price,
    //           gross: item.priceWithoutVat,
    //           quantity: item.quantity,
    //           product_id: item.productId,
    //           product_variant_id: item.productVariantId,
    //           image_url: item.image ? item.image.url : null,
    //           subscription: item.subscription,
    //           tax_rate: item.taxGroup.percent,
    //           tax_group: item.taxGroup,
    //           product_tax_amount: item.vatAmount
    //         }))
    //       })
    //     }
    //   );

    //   const { data } = await response.json();
    //   return onSuccess(data.orders.create.id);
    // } catch (err) {
    //   return setStatus({ error: err.message });
    // }
  }

  function handleCardChange(event) {
    let newStatus = 'idle';

    if (event.complete) {
      newStatus = 'card-ok';
    } else if (event.error) {
      newStatus = 'card-error';
    }

    setStatus(newStatus);
  }

  if (status.paymentMethod) {
    return (
      <pre style={{ fontSize: '12px' }}>
        {JSON.stringify(status.paymentMethod, null, 3)}
      </pre>
    );
  }

  return (
    <form onSubmit={submit}>
      <ShippingDetails>
        <InputGroup>
          <Label htmlFor="address">{t('customer.streetAddress')}</Label>
          <Input
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="postCode">{t('customer.postalCode')}</Label>
          <Input
            name="postCode"
            type="text"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            required
          />
        </InputGroup>
      </ShippingDetails>
      <CardElementWrapper status={status}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '1rem'
              }
            }
          }}
          onChange={handleCardChange}
        />
      </CardElementWrapper>
      <Button
        type="submit"
        state={status === 'processing' ? 'loading' : null}
        disabled={['processing', 'card-error'].includes(status) || !stripe}
      >
        {t('checkout.payNow')}
      </Button>
      {status.error && <ErrorMessage>{status.error}</ErrorMessage>}
    </form>
  );
}
