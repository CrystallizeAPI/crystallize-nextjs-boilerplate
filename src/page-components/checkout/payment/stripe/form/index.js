import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import styled from 'styled-components';

import { Button } from 'ui';
import { useT } from 'lib/i18n';

import { CardElementWrapper, ErrorMessage } from './styles';
import { Input, InputGroup, Label } from '../../../styles';

const ShippingDetails = styled.div`
  display: flex;
`;

function StripeCheckout({
  clientSecret,
  items,
  onSuccess,
  personalDetails,
  stripe,
  elements
}) {
  const t = useT();
  const [state, setState] = useState({
    address: '',
    postCode: '',
    cardElementStyle: null,
    error: null,
    processing: false
  });

  async function submit() {
    console.log('element', elements.getElement('card'));
    setState({ ...state, processing: true });

    const { address, postCode } = state;

    const { firstName, lastName, email } = personalDetails;
    const { paymentIntent, error } = await stripe.handleCardPayment(
      clientSecret,
      {
        payment_method_data: {
          billing_details: {
            name: `${firstName} ${lastName}`,
            address: {
              line1: address,
              postal_code: postCode
            }
          }
        },
        receipt_email: email
      }
    );

    if (error) {
      return setState({ ...state, error, processing: false });
    }

    // Create order within Crystallize
    try {
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
              image_url: item.image ? item.image.url : null,
              subscription: item.subscription,
              tax_rate: item.taxGroup.percent,
              tax_group: item.taxGroup,
              product_tax_amount: item.vatAmount
            }))
          })
        }
      );

      const { data } = await response.json();
      return onSuccess(data.orders.create.id);
    } catch (err) {
      return setState({ ...state, processing: false, error: err.message });
    }
  }

  function handleCardChange(event) {
    let borderColor = 'var(--color-box-background)';
    if (event.complete) borderColor = 'var(--color-text-main)';
    else if (event.error) borderColor = 'var(--color-error)';

    return setState({
      ...state,
      cardElementStyle: {
        borderBottom: `1px solid ${borderColor}`
      }
    });
  }

  const { address, cardElementStyle, error, postCode, processing } = state;

  return (
    <>
      <ShippingDetails>
        <InputGroup>
          <Label htmlFor="address">{t('customer.streetAddress')}</Label>
          <Input
            name="address"
            type="text"
            value={address}
            onChange={(e) => setState({ ...state, address: e.target.value })}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="postCode">{t('customer.postalCode')}</Label>
          <Input
            name="postCode"
            type="text"
            value={postCode}
            onChange={(e) => setState({ ...state, postCode: e.target.value })}
            required
          />
        </InputGroup>
      </ShippingDetails>
      <CardElementWrapper style={cardElementStyle}>
        <CardElement
          style={{
            base: {
              fontSize: '16px'
            },
            invalid: {}
          }}
          onChange={handleCardChange}
        />
      </CardElementWrapper>
      <Button
        type="button"
        state={processing ? 'loading' : null}
        disabled={processing}
        onClick={submit}
      >
        {t('checkout.payNow')}
      </Button>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  );
}

export default injectStripe(StripeCheckout);
