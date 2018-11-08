import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { BasketProvider } from '@crystallize/react-basket';

import withData from 'lib/with-data';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <BasketProvider
            shippingCost="199"
            freeShippingMinimumPurchaseAmount="800"
            validateEndpoint="/checkout/validate-basket"
          >
            <Component {...pageProps} />
          </BasketProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
