/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';

import appConfig, { useLocale } from 'lib/app-config';

// {{#if payment-method-stripe}}
import StripeCheckout from './stripe';
// {{/if}}

// {{#if payment-method-klarna}}
import KlarnaCheckout from './klarna';
// {{/if}}

// {{#if payment-method-vipps}}
import VippsCheckout from './vipps';
// {{/if}}

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
  const locale = useLocale();
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

  const paymentMethods = [
    // {{#if payment-method-stripe}}
    {
      name: 'stripe',
      color: '#6773E6',
      logo: '/static/stripe-logo.png',
      render: () => (
        <PaymentMethod>
          <Head>
            <script key="stripe-js" src="https://js.stripe.com/v3/" async />
          </Head>
          <StripeCheckout
            personalDetails={personalDetails}
            items={items}
            currency={currency}
            onSuccess={(orderId) => {
              if (locale.urlPrefix) {
                router.push(
                  '/[locale]/confirmation/stripe/[orderId]',
                  `/${locale.urlPrefix}/confirmation/stripe/${orderId}`
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
      )
    },
    // {{/if}}
    // {{#if payment-method-klarna}}
    {
      name: 'klarna',
      color: '#F8AEC2',
      logo: '/static/klarna-logo.png',
      render: () => (
        <PaymentMethod>
          <KlarnaCheckout
            personalDetails={personalDetails}
            items={items}
            currency={currency}
          />
        </PaymentMethod>
      )
    },
    // {{/if}}
    // {{#if payment-method-vipps}}
    {
      name: 'vipps',
      color: '#fff',
      logo: '/static/vipps-logo.png',
      render: () => (
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
      )
    }
    // {{/if}}
  ];

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
            {appConfig.paymentMethods.map((paymentMethodFromConfig) => {
              const paymentMethod = paymentMethods.find(
                (p) => p.name === paymentMethodFromConfig
              );
              if (!paymentMethod) {
                return (
                  <small>
                    Payment method
                    {paymentMethodFromConfig}
                    is not configured
                  </small>
                );
              }

              return (
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
              );
            })}
          </PaymentSelector>

          {paymentMethods.find((p) => p.name === paymentMethod)?.render()}
        </PaymentMethods>
      </Form>
    </Inner>
  );
}
