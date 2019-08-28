import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { IntlProvider } from 'react-intl';
import App from 'next/app';

import AuthGate from 'components/auth-context';
import withData from 'lib/with-data';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';
import BasketProvider from 'components/basket-provider';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Query
          variables={{ path: '/', language: 'en' }}
          query={FETCH_TREE_NODE_AND_MENU}
        >
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return null;
            return (
              <IntlProvider locale={data.tenant.defaults.language}>
                <BasketProvider>
                  <AuthGate>
                    <Component {...pageProps} />;
                  </AuthGate>
                </BasketProvider>
              </IntlProvider>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
