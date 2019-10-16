import React from 'react';
import App from 'next/app';
import { IntlProvider } from 'react-intl';
import { Provider } from 'urql';

import withUrqlClient from 'lib/with-urql-client';
import { useMenuAndTenantQuery } from 'lib/graph';
import AuthGate from 'components/auth-context';
import UrqlOrderProvider from 'components/urql-order-context';
import BasketProvider from 'components/basket-provider';
import GlobalStyle from 'ui/global';

const AppWithIntl = ({ children }) => {
  const { fetching, error, data } = useMenuAndTenantQuery();

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
        <UrqlOrderProvider>
          <GlobalStyle />
          <AppWithIntl>
            <BasketProvider>
              <AuthGate>
                <Component {...pageProps} />
              </AuthGate>
            </BasketProvider>
          </AppWithIntl>
        </UrqlOrderProvider>
      </Provider>
    );
  }
}

export default withUrqlClient(MyApp);
