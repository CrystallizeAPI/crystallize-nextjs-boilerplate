import React from 'react';
import {
  Elements,
  StripeProvider,
  CardElement,
  injectStripe
} from 'react-stripe-elements';
import { Button, colors } from 'ui';
import { CardElementWrapper, ErrorMessage } from './styles';

const { STRIPE_PUBLISHABLE_KEY } = process.env;

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientSecret: null,
      processing: false,
      error: null,
      cardElementStyle: null
    };
    this.submit = this.submit.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

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
        stripe: window.Stripe(STRIPE_PUBLISHABLE_KEY),
        clientSecret: client_secret
      });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(STRIPE_PUBLISHABLE_KEY),
          clientSecret: client_secret
        });
      });
    }
  }

  async submit(event) {
    event.preventDefault();
    this.setState({ processing: true });
    const { clientSecret } = this.state;

    const { stripe, items, onSuccess, personalDetails } = this.props;
    const { firstName, lastName, email } = personalDetails;
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
            product_id: item.productId,
            product_variant_id: item.productVariantId,
            image_url: item.imageUrl,
            subscription: item.subscription
          }))
        })
      });

      const { data } = await response.json();
      onSuccess(data.orders.create.id);
    } catch (err) {
      console.log('ERROR', err);
    }

    return this.setState({ processing: false });
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
    const { error, processing, cardElementStyle, stripe } = this.state;

    return stripe ? (
      <StripeProvider stripe={stripe}>
        <Elements>
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
        </Elements>
      </StripeProvider>
    ) : (
      <p>Initialising payment gateway...</p>
    );
  }
}

export default injectStripe(StripeCheckout);
