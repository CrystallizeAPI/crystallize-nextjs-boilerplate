import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { parse } from 'cookie';

import withData from 'lib/with-data';
import AuthGate from 'components/auth-context';
import BasketProvider from 'components/basket-provider';

class MyApp extends App {
  static async getInitialProps(props) {
    const { pageProps } = props;
    const { token } = parse(props.ctx.req.headers.cookie);
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
