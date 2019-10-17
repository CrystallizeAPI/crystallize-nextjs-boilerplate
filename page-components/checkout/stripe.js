import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { H2, Button, colors } from 'ui';
import {
  Form,
  Input,
  CardElementWrapper,
  ErrorMessage,
  StripeWrapper
} from './styles';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      processing: false,
      error: null,
      firstName: '',
      lastName: '',
      email: '',
      cardElementStyle: null
    };
    this.submit = this.submit.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  async submit(event) {
    event.preventDefault();
    this.setState({ processing: true });
    const { firstName, lastName, email } = this.state;

    const { stripe, clientSecret, items, onSuccess } = this.props;
    const { paymentIntent, error } = await stripe.handleCardPayment(
      clientSecret,
      {
        payment_method_data: {
          billing_details: { name: `${firstName} ${lastName}` }
        },
        receipt_email: email
      }
    );

    if (error) {
      return this.setState({ error, processing: false });
    }

    // Create order within Crystallize
    try {
      const response = await fetch('/api/order-confirmation', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          lineItems: items.map(item => ({
            name: item.name,
            sku: item.sku,
            net: item.price,
            gross: item.priceWithoutVat,
            quantity: item.quantity,
            subscription: item.subscription
          }))
        })
      });

      const { data } = await response.json();
      onSuccess(data.orders.create.id);
    } catch (err) {
      console.log('ERROR', err);
    }

    return this.setState({ success: true, processing: false });
  }

  handleCardChange(event) {
    let borderColor = colors.frost;
    if (event.complete) borderColor = colors.glacier;
    else if (event.error) borderColor = colors.error;

    return this.setState({
      cardElementStyle: {
        borderBottom: `1px solid ${borderColor}`
      }
    });
  }

  render() {
    const {
      error,
      processing,
      success,
      firstName,
      lastName,
      email,
      cardElementStyle
    } = this.state;

    return (
      <StripeWrapper>
        <H2>Pay with Stripe</H2>
        {success ? (
          <p>Payment successful!</p>
        ) : (
          <Form onSubmit={this.submit} noValidate>
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              required
            />
            <CardElementWrapper style={cardElementStyle}>
              <CardElement
                style={{
                  base: {
                    color: colors.darkText,
                    fontSize: '16px'
                  },
                  invalid: {
                    color: colors.error
                  }
                }}
                onChange={this.handleCardChange}
              />
            </CardElementWrapper>
            <Button type="submit" loading={processing} disabled={processing}>
              Pay Now
            </Button>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </Form>
        )}
      </StripeWrapper>
    );
  }
}

export default injectStripe(StripeCheckout);
