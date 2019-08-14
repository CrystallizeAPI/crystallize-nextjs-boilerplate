import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { IntlProvider } from 'react-intl';
import App, { Container } from 'next/app';
import { parseCookie } from 'cookie';
import cookie from 'js-cookie';

import withData from 'lib/with-data';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';
import AuthGate from 'components/auth-context';
import BasketProvider from 'components/basket-provider';

const getToken = ctx => {
  if (ctx.req) {
    const { token } = parseCookie(ctx.req.headers.cookie);
    return token;
  }

  return cookie.get('token');
};

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { pageProps } = ctx;
    const token = getToken(ctx);
    const apiUrl = `http://localhost:3000/api/verify`;

    try {
      const response = await fetch(apiUrl, {
        credentials: 'include',
        headers: {
          Authorization: JSON.stringify({ token })
        }
      });

      if (!response.ok) {
        return null;
      }

      return { isLoggedIn: true, pageProps };
    } catch (error) {
      return null;
    }
  }

  render() {
    const { Component, pageProps, apolloClient, isLoggedIn } = this.props;

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

export default withData(MyApp);
