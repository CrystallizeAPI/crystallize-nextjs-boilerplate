import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success: false, error: null };
    this.submit = this.submit.bind(this);
  }

  async submit() {
    const { stripe, clientSecret } = this.props;
    const { error } = await stripe.handleCardPayment(clientSecret, {
      payment_method_data: {
        billing_details: { name: 'John Smith' }
      }
    });

    if (error) {
      return this.setState({ error });
    }

    return this.setState({ success: true });
  }

  render() {
    const { error, success } = this.state;
    if (success) return <h1>Purchase Complete</h1>;
    if (error) return <h1>Error: {error.message}</h1>;

    return (
      <>
        <CardElement />
        <button type="button" onClick={this.submit}>
          Send
        </button>
      </>
    );
  }
}

export default injectStripe(StripeCheckout);
