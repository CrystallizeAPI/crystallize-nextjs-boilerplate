import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import StripeCheckout from './stripe';
import KlarnaCheckout from './klarna';
import VippsCheckout from './vipps';

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

export default function Payment({ items, currency }) {
  const router = useRouter();
  const [state, setState] = useState({
    paymentMethod: null,
    firstName: '',
    lastName: '',
    email: ''
  });

  const { paymentMethod, firstName, lastName, email } = state;

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
              onChange={(e) =>
                setState({ ...state, firstName: e.target.value })
              }
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
            <PaymentButton
              color="#6773E6"
              type="button"
              active={paymentMethod === 'stripe'}
              onClick={() => setState({ ...state, paymentMethod: 'stripe' })}
            >
              <img src="/static/stripe-logo.png" alt="stripe logo" />
            </PaymentButton>
            <PaymentButton
              color="#F8AEC2"
              type="button"
              active={paymentMethod === 'klarna'}
              onClick={() => setState({ ...state, paymentMethod: 'klarna' })}
            >
              <img src="/static/klarna-logo.png" alt="Klarna logo" />
            </PaymentButton>
            <PaymentButton
              color="#FFFFFF"
              type="button"
              active={paymentMethod === 'vipps'}
              onClick={() => setState({ ...state, paymentMethod: 'vipps' })}
            >
              <img src="/static/vipps-logo.png" alt="Vipps logo" />
            </PaymentButton>
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
