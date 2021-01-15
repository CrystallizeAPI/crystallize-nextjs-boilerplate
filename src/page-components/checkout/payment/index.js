/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import ServiceApi from 'lib/service-api';
import { useLocale } from 'lib/app-config';
import { useT } from 'lib/i18n';
import { useBasket } from 'components/basket';
import { Spinner } from 'ui/spinner';

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

const StripeCheckout = dynamic(() => import('./stripe'));
const KlarnaCheckout = dynamic(() => import('./klarna'));
const VippsCheckout = dynamic(() => import('./vipps'));
const MollieCheckout = dynamic(() => import('./mollie'));

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Inner = styled.div``;

export default function Payment() {
  const t = useT();
  const locale = useLocale();
  const router = useRouter();
  const { cartModel, actions, metadata } = useBasket();
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState(null);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const paymentConfig = useQuery('paymentConfig', () =>
    ServiceApi({
      query: `
      {
        paymentProviders {
          stripe {
            enabled
          }
          klarna {
            enabled
          }
          mollie {
            enabled
          }
          vipps {
            enabled
          }
        }
      }
    `
    })
  );

  // Handle locale with sub-path routing
  let multilingualUrlPrefix = '';
  if (window.location.pathname.startsWith(`/${router.locale}/`)) {
    multilingualUrlPrefix = router.locale;
  }

  const { firstName, lastName, email } = state;

  // Define the shared payment model for all payment providers
  const paymentModel = {
    cartModel,
    multilingualUrlPrefix,
    locale,
    metadata,
    customer: {
      firstName,
      lastName,
      addresses: [
        {
          type: 'billing',
          email
        }
      ]
    }
  };

  const checkoutModel = {
    cartModel,
    customer: {
      firstName,
      lastName,
      addresses: [
        {
          type: 'billing',
          email
        }
      ]
    },
    metadata
  };

  const paymentProviders = [
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
            checkoutModel={checkoutModel}
            onSuccess={(orderId) => {
              if (multilingualUrlPrefix) {
                router.push(
                  `/${multilingualUrlPrefix}/confirmation/${orderId}`
                );
              } else {
                router.push(`/confirmation/${orderId}`);
              }
              scrollTo(0, 0);
            }}
          />
        </PaymentProvider>
      )
    },
    {
      name: 'klarna',
      color: '#F8AEC2',
      logo: '/static/klarna-logo.png',
      render: () => (
        <PaymentProvider>
          <KlarnaCheckout paymentModel={paymentModel} basketActions={actions} />
        </PaymentProvider>
      )
    },
    {
      name: 'vipps',
      color: '#fff',
      logo: '/static/vipps-logo.png',
      render: () => (
        <PaymentProvider>
          <VippsCheckout
            paymentModel={paymentModel}
            onSuccess={(url) => {
              if (url) window.location = url;
            }}
          />
        </PaymentProvider>
      )
    },
    {
      name: 'mollie',
      color: '#fff',
      logo: '/static/mollie-vector-logo.png',
      render: () => (
        <PaymentProvider>
          <MollieCheckout
            paymentModel={paymentModel}
            onSuccess={(url) => {
              if (url) window.location = url;
            }}
          />
        </PaymentProvider>
      )
    }
  ];

  const enabledPaymentProviders = [];
  if (!paymentConfig.loading && paymentConfig.data) {
    const { paymentProviders } = paymentConfig.data.data;
    if (paymentProviders.klarna.enabled) {
      enabledPaymentProviders.push('klarna');
    }
    if (paymentProviders.mollie.enabled) {
      enabledPaymentProviders.push('mollie');
    }
    if (paymentProviders.vipps.enabled) {
      enabledPaymentProviders.push('vipps');
    }
    if (paymentProviders.stripe.enabled) {
      enabledPaymentProviders.push('stripe');
    }
  }

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
        {paymentConfig.loading ? (
          <Spinner />
        ) : (
          <div>
            {enabledPaymentProviders.length === 0 ? (
              <i>{t('checkout.noPaymentProvidersConfigured')}</i>
            ) : (
              <PaymentProviders>
                <PaymentSelector>
                  {enabledPaymentProviders.map((paymentProviderName) => {
                    const paymentProvider = paymentProviders.find(
                      (p) => p.name === paymentProviderName
                    );
                    if (!paymentProvider) {
                      return (
                        <small>
                          {t('checkout.paymentProviderNotConfigured', {
                            name: paymentProviderName
                          })}
                        </small>
                      );
                    }

                    return (
                      <PaymentButton
                        key={paymentProvider.name}
                        color={paymentProvider.color}
                        type="button"
                        selected={
                          selectedPaymentProvider === paymentProvider.name
                        }
                        onClick={() =>
                          setSelectedPaymentProvider(paymentProvider.name)
                        }
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

                {paymentProviders
                  .find((p) => p.name === selectedPaymentProvider)
                  ?.render()}
              </PaymentProviders>
            )}
          </div>
        )}
      </div>
    </Inner>
  );
}
