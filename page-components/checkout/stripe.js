import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      firstname: '',
      lastname: ''
    };
    this.submit = this.submit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  async submit(event) {
    event.preventDefault();
    const { firstname, lastname } = this.state;

    const { stripe, clientSecret, items } = this.props;
    const paymentIntent = await stripe.handleCardPayment(clientSecret, {
      payment_method_data: {
        billing_details: { name: `${firstname} ${lastname}` }
      }
    });

    const { error } = paymentIntent;
    if (error) {
      return this.setState({ error });
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
          paymentIntent,
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

    return this.setState({ success: true });
  }

  handleFirstNameChange(event) {
    this.setState({ firstname: event.target.value });
  }

  handleLastNameChange(event) {
    this.setState({ lastname: event.target.value });
  }

  render() {
    const { error, success, firstname, lastname } = this.state;
    if (success) return <h1>Purchase Complete</h1>;
    if (error) return <h1>Error: {error.message}</h1>;

    return (
      <form onSubmit={this.submit}>
        <label htmlFor="firstname">
          First name:
          <input
            id="firstname"
            type="text"
            value={firstname}
            onChange={this.handleFirstNameChange}
          />
        </label>
        <label htmlFor="lastname">
          Last name:
          <input
            id="lastname"
            type="text"
            value={lastname}
            onChange={this.handleLastNameChange}
          />
        </label>
        <CardElement />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default injectStripe(StripeCheckout);
