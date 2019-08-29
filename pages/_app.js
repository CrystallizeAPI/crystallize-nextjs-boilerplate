import React from 'react';
import App from 'next/app';
import { IntlProvider } from 'react-intl';
import { Provider } from 'urql';

import withUrqlClient from 'lib/with-urql-client';
import { useTreeNodeAndMenuQuery } from 'lib/graph';
import AuthGate from 'components/auth-context';
import BasketProvider from 'components/basket-provider';

const AppWithIntl = ({ children }) => {
  const { fetching, error, data } = useTreeNodeAndMenuQuery();

  if (fetching || error || !data) {
    return null;
  }

  return (
    <IntlProvider locale={data.tenant.defaults.language}>
      {children}
    </IntlProvider>
  );
};

class MyApp extends App {
  render() {
    const { Component, pageProps, urqlClient } = this.props;

    return (
      <Provider value={urqlClient}>
        <AppWithIntl>
          <BasketProvider>
            <AuthGate>
              <Component {...pageProps} />
            </AuthGate>
          </BasketProvider>
        </AppWithIntl>
      </Provider>
    );
  }
}

export default withUrqlClient(MyApp);
