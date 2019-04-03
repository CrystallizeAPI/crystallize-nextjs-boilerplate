import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { BasketProvider } from '@crystallize/react-basket';
import AuthGate from 'components/layout/auth-context';

import withData from 'lib/with-data';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, isLoggedIn } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <BasketProvider
            shippingCost="199"
            freeShippingMinimumPurchaseAmount="800"
            validateEndpoint="/checkout/validate-basket"
          >
            <AuthGate isLoggedIn={isLoggedIn}>
              <Component {...pageProps} />
            </AuthGate>
          </BasketProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
