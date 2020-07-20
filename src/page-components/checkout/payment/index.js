/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styled from 'styled-components';

import appConfig, { useLocale } from 'lib/app-config';
import { useT } from 'lib/i18n';

import {
  Input,
  InputGroup,
  Label,
  PaymentSelector,
  PaymentProviders,
  PaymentButton,
  PaymentProvider,
  SectionHeader
} from '../styles';

// {{#if payment-provider-stripe}}
const StripeCheckout = dynamic(() => import('./stripe'));
// {{/if}}
// {{#if payment-provider-klarna}}
const KlarnaCheckout = dynamic(() => import('./klarna'));
// {{/if}}
// {{#if payment-provider-vipps}}
const VippsCheckout = dynamic(() => import('./vipps'));
// {{/if}}

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Inner = styled.div``;

export default function Payment({ items, currency }) {
  const t = useT();
  const locale = useLocale();
  const router = useRouter();
  const [paymentProvider, setPaymentProvider] = useState('stripe');
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
      <form noValidate>
        <Row>
          <InputGroup>
            <Label htmlFor="firstname">{t('customer.firstName')}</Label>
            <Input
              name="firstname"
              type="text"
              value={firstName}
              onChange={(e) =>
                setState({ ...state, firstName: e.target.value })
              }
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="lastname">{t('customer.lastName')}</Label>
            <Input
              name="lastname"
              type="text"
              value={lastName}
              onChange={(e) => setState({ ...state, lastName: e.target.value })}
              required
            />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <Label htmlFor="email">{t('customer.email')}</Label>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              required
            />
          </InputGroup>
        </Row>
      </form>

      <div>
        <SectionHeader>{t('checkout.choosePaymentMethod')}</SectionHeader>
        {appConfig.paymentProviders.length === 0 ? (
          <i>{t('checkout.noPaymentProvidersConfigured')}</i>
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
                      {t('checkout.paymentProviderNotConfigured', {
                        name: paymentProviderFromConfig
                      })}
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
                      alt={t('checkout.paymentProviderLogoAlt', {
                        name: paymentProvider.name
                      })}
                    />
                  </PaymentButton>
                );
              })}
            </PaymentSelector>

            {paymentProviders.find((p) => p.name === paymentProvider)?.render()}
          </PaymentProviders>
        )}
      </div>
    </Inner>
  );
}
