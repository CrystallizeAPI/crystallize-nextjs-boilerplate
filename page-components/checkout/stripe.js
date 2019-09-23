import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      firstname: null,
      lastname: null
    };
    this.submit = this.submit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  async submit() {
    const { firstname, lastname } = this.state;

    const { stripe, clientSecret } = this.props;
    const { error } = await stripe.handleCardPayment(clientSecret, {
      payment_method_data: {
        billing_details: { name: `${firstname} ${lastname}` }
      }
    });

    if (error) {
      return this.setState({ error });
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
