import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const StripeCheckout = dynamic(() => import('./stripe'));
const KlarnaCheckout = dynamic(() => import('./klarna'));
const VippsCheckout = dynamic(() => import('./vipps'));

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
} from '../styles';

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

const paymentMethodsFromConfig = (
  process.env.NEXT_PUBLIC_PAYMENT_METHODS || 'stripe,vipps,klarna'
).split(',');

const paymentMethods = [
  {
    name: 'stripe',
    color: '#6773E6',
    logo: '/static/stripe-logo.png'
  },
  {
    name: 'klarna',
    color: '#F8AEC2',
    logo: '/static/klarna-logo.png'
  },
  {
    name: 'vipps',
    color: '#fff',
    logo: '/static/vipps-logo.png'
  }
].map((paymentMethod) => ({
  ...paymentMethod,
  active: paymentMethodsFromConfig.includes(paymentMethod.name)
}));

export default function Payment({ items, currency }) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const { firstName, lastName, email } = state;

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
            <Label htmlFor="firstname">First Name</Label>
            <Input
              name="firstname"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) =>
                setState({ ...state, firstName: e.target.value })
              }
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              name="lastname"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setState({ ...state, lastName: e.target.value })}
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
              onChange={(e) => setState({ ...state, email: e.target.value })}
              required
            />
          </InputGroup>
        </Row>

        <SectionHeader>Choose payment method</SectionHeader>
        <PaymentMethods>
          <PaymentSelector>
            {paymentMethods
              .filter((p) => p.active)
              .map((paymentMethod) => (
                <PaymentButton
                  key={paymentMethod.name}
                  color={paymentMethod.color}
                  type="button"
                  active={paymentMethod === paymentMethod.name}
                  onClick={() => setPaymentMethod(paymentMethod.name)}
                >
                  <img
                    src={paymentMethod.logo}
                    alt={`Logo for ${paymentMethod.name}`}
                  />
                </PaymentButton>
              ))}
          </PaymentSelector>
          {paymentMethod === 'stripe' && (
            <PaymentMethod>
              <StripeCheckout
                personalDetails={personalDetails}
                items={items}
                currency={currency}
                onSuccess={(orderId) => {
                  const { language } = router.query;
                  if (language) {
                    router.push(
                      '/[language]/confirmation/stripe/[orderId]',
                      `/${language}/confirmation/stripe/${orderId}`
                    );
                  } else {
                    router.push(
                      '/confirmation/stripe/[orderId]',
                      `/confirmation/stripe/${orderId}`
                    );
                  }
                  scrollTo(0, 0);
                }}
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

          {paymentMethod === 'vipps' && (
            <PaymentMethod>
              <VippsCheckout
                personalDetails={personalDetails}
                items={items}
                currency={currency}
                onSuccess={(url) => {
                  if (url) window.location = url;
                }}
              />
            </PaymentMethod>
          )}
        </PaymentMethods>
      </Form>
    </Inner>
  );
}
