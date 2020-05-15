import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import StripeCheckout from './stripe';
import KlarnaCheckout from './klarna';

import {
  Form,
  Input,
  InputGroup,
  Label,
  PaymentSelector,
  PaymentMethods,
  PaymentButton,
  PaymentMethod,
  SectionHeader
} from './styles';

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 0.2rem;
`;

export default class PaymentGateway extends React.Component {
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
      <Inner>
        <Form noValidate>
          <Row>
            <InputGroup>
              <Label htmlFor="firstname"> First Name</Label>
              <Input
                name="firstname"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="lastname"> Last Name</Label>
              <Input
                name="lastname"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
                required
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup>
              <Label htmlFor="email"> Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
            </InputGroup>
          </Row>

          <SectionHeader>Choose payment method</SectionHeader>
          <PaymentMethods>
            <PaymentSelector>
              <PaymentButton
                color="#6773E6"
                type="button"
                active={paymentMethod === 'stripe'}
                onClick={() => this.setState({ paymentMethod: 'stripe' })}
              >
                <img src="/static/stripe-logo.png" alt="stripe logo" />
              </PaymentButton>
              <PaymentButton
                color="#F8AEC2"
                type="button"
                active={paymentMethod === 'klarna'}
                onClick={() => this.setState({ paymentMethod: 'klarna' })}
              >
                <img src="/static/klarna-logo.png" alt="Klarna logo" />
              </PaymentButton>
            </PaymentSelector>
            {paymentMethod === 'stripe' && (
              <PaymentMethod>
                <StripeCheckout
                  personalDetails={personalDetails}
                  items={items}
                  currency={currency}
                  onSuccess={orderId =>
                    Router.push(
                      '/confirmation/stripe/[orderId]',
                      `/confirmation/stripe/${orderId}`
                    )
                  }
                />
              </PaymentMethod>
            )}

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
    );
  }
}
