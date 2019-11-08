import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import { responsive, H3 } from 'ui';
import StripeCheckout from './stripe';
import KlarnaCheckout from './klarna';

import {
  Form,
  Input,
  PaymentMethods,
  PaymentButton,
  PaymentMethod
} from './styles';

const Outer = styled.div`
  width: 500px;

  ${responsive.xs} {
    width: 100%;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: white;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 0.2rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
`;

class PaymentGateway extends React.Component {
  state = {
    paymentMethod: null,
    firstName: '',
    lastName: '',
    email: ''
  };

  render() {
    const { items, currency } = this.props;
    const { paymentMethod, firstName, lastName, email } = this.state;

    const personalDetails = {
      firstName,
      lastName,
      email
    };

    return (
      <Outer>
        <Inner>
          <Form noValidate>
            <H3>Personal Details</H3>
            <Input
              name="firstname"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
              required
            />
            <Input
              name="lastname"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              required
            />

            <H3>Payment Method</H3>

            <PaymentMethods>
              <PaymentButton
                type="button"
                active={paymentMethod === 'stripe'}
                onClick={() => this.setState({ paymentMethod: 'stripe' })}
              >
                Stripe
              </PaymentButton>
              {paymentMethod === 'stripe' && (
                <PaymentMethod>
                  <StripeCheckout
                    personalDetails={personalDetails}
                    items={items}
                    currency={currency}
                    onSuccess={orderId =>
                      Router.push(`/confirmation/${orderId}`)
                    }
                  />
                </PaymentMethod>
              )}
              <PaymentButton
                type="button"
                active={paymentMethod === 'klarna'}
                onClick={() => this.setState({ paymentMethod: 'klarna' })}
              >
                Klarna
              </PaymentButton>
              {paymentMethod === 'klarna' && (
                <PaymentMethod>
                  <KlarnaCheckout
                    personalDetails={personalDetails}
                    items={items}
                    currency={currency}
                  />
                </PaymentMethod>
              )}
            </PaymentMethods>
          </Form>
        </Inner>
      </Outer>
    );
  }
}

export default PaymentGateway;
