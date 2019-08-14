import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { parseCookie } from 'cookie';
import cookie from 'js-cookie';

import withData from 'lib/with-data';
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

export default withData(MyApp);
