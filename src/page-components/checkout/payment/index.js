/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';

import appConfig, { useLocale } from 'lib/app-config';

// {{#if payment-provider-stripe}}
import StripeCheckout from './stripe';
// {{/if}}

// {{#if payment-provider-klarna}}
import KlarnaCheckout from './klarna';
// {{/if}}

// {{#if payment-provider-vipps}}
import VippsCheckout from './vipps';
// {{/if}}

import {
  Form,
  Input,
  InputGroup,
  Label,
  PaymentSelector,
  PaymentProviders,
  PaymentButton,
  PaymentProvider,
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
  const [paymentProvider, setPaymentProvider] = useState(null);
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

  const paymentProviders = [
    // {{#if payment-provider-stripe}}
    {
      name: 'stripe',
      color: '#6773E6',
      logo: '/static/stripe-logo.png',
      render: () => (
        <PaymentProvider>
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
        </PaymentProvider>
      )
    },
    // {{/if}}
    // {{#if payment-provider-klarna}}
    {
      name: 'klarna',
      color: '#F8AEC2',
      logo: '/static/klarna-logo.png',
      render: () => (
        <PaymentProvider>
          <KlarnaCheckout
            personalDetails={personalDetails}
            items={items}
            currency={currency}
          />
        </PaymentProvider>
      )
    },
    // {{/if}}
    // {{#if payment-provider-vipps}}
    {
      name: 'vipps',
      color: '#fff',
      logo: '/static/vipps-logo.png',
      render: () => (
        <PaymentProvider>
          <VippsCheckout
            personalDetails={personalDetails}
            items={items}
            currency={currency}
            onSuccess={(url) => {
              if (url) window.location = url;
            }}
          />
        </PaymentProvider>
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
        {appConfig.paymentProviders.length === 0 ? (
          <i>No payment providers have been configured</i>
        ) : (
          <PaymentProviders>
            <PaymentSelector>
              {appConfig.paymentProviders.map((paymentProviderFromConfig) => {
                const paymentProvider = paymentProviders.find(
                  (p) => p.name === paymentProviderFromConfig
                );
                if (!paymentProvider) {
                  return (
                    <small>
                      Payment method {paymentProviderFromConfig} is not
                      configured
                    </small>
                  );
                }

                return (
                  <PaymentButton
                    key={paymentProvider.name}
                    color={paymentProvider.color}
                    type="button"
                    active={paymentProvider === paymentProvider.name}
                    onClick={() => setPaymentProvider(paymentProvider.name)}
                  >
                    <img
                      src={paymentProvider.logo}
                      alt={`Logo for ${paymentProvider.name}`}
                    />
                  </PaymentButton>
                );
              })}
            </PaymentSelector>

            {paymentProviders.find((p) => p.name === paymentProvider)?.render()}
          </PaymentProviders>
        )}
      </Form>
    </Inner>
  );
}
