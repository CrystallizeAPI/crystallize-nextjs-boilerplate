import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import withData from 'lib/with-data';
import { appWithTranslation } from 'lib/i18n';
import AuthGate from 'components/auth-context';
import BasketProvider from 'components/basket-provider';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, isLoggedIn } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <BasketProvider>
            <AuthGate isLoggedIn={isLoggedIn}>
              <Component {...pageProps} />
            </AuthGate>
          </BasketProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(appWithTranslation(MyApp));
