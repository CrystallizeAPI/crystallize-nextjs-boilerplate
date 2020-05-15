import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import styled from 'styled-components';

import { Button, colors } from 'ui';

import { CardElementWrapper, ErrorMessage } from './styles';

import { Input, InputGroup, Label } from '../styles';

const ShippingDetails = styled.div`
  display: flex;
`;

class StripeCheckout extends React.Component {
  state = {
    address: '',
    postCode: '',
    cardElementStyle: null,
    error: null,
    processing: false,
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  async submit() {
    this.setState({ processing: true });

    const { address, postCode } = this.state;

    const {
      clientSecret,
      items,
      onSuccess,
      personalDetails,
      stripe,
    } = this.props;
    const { firstName, lastName, email } = personalDetails;
    const { paymentIntent, error } = await stripe.handleCardPayment(
      clientSecret,
      {
        payment_method_data: {
          billing_details: {
            name: `${firstName} ${lastName}`,
            address: {
              line1: address,
              postal_code: postCode,
            },
          },
        },
        receipt_email: email,
      }
    );

    if (error) {
      return this.setState({ error, processing: false });
    }

    // Create order within Crystallize
    try {
      const response = await fetch('/api/stripe/order-persistence', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
            product_tax_amount: item.vatAmount,
          })),
        }),
      });

      const { data } = await response.json();
      return onSuccess(data.orders.create.id);
    } catch (err) {
      return this.setState({ processing: false, error: err.message });
    }
  }

  handleCardChange(event) {
    let borderColor = colors.frost;
    if (event.complete) borderColor = '#000';
    else if (event.error) borderColor = colors.error;

    return this.setState({
      cardElementStyle: {
        borderBottom: `1px solid ${borderColor}`,
      },
    });
  }

  render() {
    const {
      address,
      cardElementStyle,
      error,
      postCode,
      processing,
    } = this.state;

    return (
      <>
        <ShippingDetails>
          <InputGroup>
            <Label htmlFor="address">Street Address</Label>
            <Input
              name="address"
              type="text"
              placeholder="Street address"
              value={address}
              onChange={(e) => this.setState({ address: e.target.value })}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="postCode">Postal Code</Label>
            <Input
              name="postCode"
              type="text"
              placeholder="Postal code"
              value={postCode}
              onChange={(e) => this.setState({ postCode: e.target.value })}
              required
            />
          </InputGroup>
        </ShippingDetails>
        <CardElementWrapper style={cardElementStyle}>
          <CardElement
            style={{
              base: {
                color: colors.darkText,
                fontSize: '16px',
              },
              invalid: {
                color: colors.error,
              },
            }}
            onChange={this.handleCardChange}
          />
        </CardElementWrapper>
        <Button
          type="button"
          state={processing ? 'loading' : null}
          disabled={processing}
          onClick={() => this.submit()}
        >
          Pay Now
        </Button>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </>
    );
  }
}

export default injectStripe(StripeCheckout);
