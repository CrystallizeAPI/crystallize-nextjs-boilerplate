import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit() {
    const { stripe } = this.props;
    const { token } = await stripe.createToken({ name: 'Name' });
    const response = await fetch('/api/pay-with-stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id
    });

    if (response.ok) this.setState({ complete: true });
  }

  render() {
    const { complete } = this.state;
    if (complete) return <h1>Purchase Complete</h1>;

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
