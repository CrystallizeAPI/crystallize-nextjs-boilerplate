import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider, Query } from 'react-apollo';
import { IntlProvider } from 'react-intl';

import withData from 'lib/with-data';
import { appWithTranslation } from 'lib/i18n';
import { FETCH_TENANT } from 'lib/graph';
import AuthGate from 'components/auth-context';
import BasketProvider from 'components/basket-provider';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, isLoggedIn } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Query query={FETCH_TENANT}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return null;
              return (
                <IntlProvider locale={data.tenant.defaults.language}>
                  <BasketProvider>
                    <AuthGate isLoggedIn={isLoggedIn}>
                      <Component {...pageProps} />;
                    </AuthGate>
                  </BasketProvider>
                </IntlProvider>
              );
            }}
          </Query>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(appWithTranslation(MyApp));
