import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button, colors } from 'ui';
import { CardElementWrapper, ErrorMessage } from './styles';

class StripeCheckout extends React.Component {
  state = {
    cardElementStyle: null,
    error: null,
    processing: false
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  async submit() {
    this.setState({ processing: true });

    const {
      clientSecret,
      items,
      onSuccess,
      personalDetails,
      stripe
    } = this.props;
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
      const response = await fetch('/api/order-persistence', {
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
            subscription: item.subscription,
            tax_rate: item.taxGroup.percent,
            tax_group: item.taxGroup,
            product_tax_amount: item.vatAmount
          }))
        })
      });

      const { data } = await response.json();
      return onSuccess(data.orders.create.id);
    } catch (err) {
      return this.setState({ processing: false, error: err.message });
    }
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
    const { cardElementStyle, error, processing } = this.state;

    return (
      <>
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
        <Button
          type="button"
          loading={processing}
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
