import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { IntlProvider } from 'react-intl';
import App, { Container } from 'next/app';
import dynamic from 'next/dynamic';

import withData from 'lib/with-data';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';
import BasketProvider from 'components/basket-provider';

const AuthGate = dynamic(() => import('components/auth-context'), {
  ssr: false
});

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
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
      </Container>
    );
  }
}

export default withData(MyApp);
