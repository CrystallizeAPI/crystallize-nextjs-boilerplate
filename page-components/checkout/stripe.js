import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { H3, Button, colors } from 'ui';
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
      firstname: '',
      lastname: '',
      email: '',
      cardElementStyle: null
    };
    this.submit = this.submit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  async submit(event) {
    event.preventDefault();
    this.setState({ processing: true });
    const { firstname, lastname } = this.state;

    const { stripe, clientSecret, items } = this.props;
    const { paymentIntent, error } = await stripe.handleCardPayment(
      clientSecret,
      {
        payment_method_data: {
          billing_details: { name: `${firstname} ${lastname}` }
        }
      }
    );

    if (error) {
      return this.setState({ error, processing: false });
    }

    // Create order within Crystallize
    try {
      await fetch('/api/order-confirmation', {
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
            quantity: item.quantity,
            subscription: item.subscription
          }))
        })
      });
    } catch (err) {
      console.log('ERROR', err);
    }

    return this.setState({ success: true, processing: false });
  }

  handleFirstNameChange(event) {
    this.setState({ firstname: event.target.value });
  }

  handleLastNameChange(event) {
    this.setState({ lastname: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
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
      firstname,
      lastname,
      email,
      cardElementStyle
    } = this.state;

    return (
      <div>
        <StripeWrapper>
          <H3>Pay with Stripe</H3>
          {success ? (
            <p>Payment successful!</p>
          ) : (
            <Form onSubmit={this.submit} noValidate>
              <Input
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={this.handleFirstNameChange}
                required
              />
              <Input
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={this.handleLastNameChange}
                required
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={this.handleEmailChange}
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
      </div>
    );
  }
}

export default injectStripe(StripeCheckout);
