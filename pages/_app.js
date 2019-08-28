import React from 'react';
import App from 'next/app';
import { IntlProvider } from 'react-intl';
import { Provider } from 'urql';

import AuthGate from 'components/auth-context';
import withUrqlClient from 'lib/with-urql-client';
import BasketProvider from 'components/basket-provider';

class MyApp extends App {
  render() {
    const { Component, pageProps, urqlClient } = this.props;

    return (
      <Provider value={urqlClient}>
        <IntlProvider locale="en">
          <BasketProvider>
            <AuthGate>
              <Component {...pageProps} />
            </AuthGate>
          </BasketProvider>
        </IntlProvider>
      </Provider>
    );
  }
}

export default withUrqlClient(MyApp);
