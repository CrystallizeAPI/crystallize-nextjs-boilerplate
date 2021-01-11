import React from 'react';

import Layout from 'components/layout';
import { H1 } from 'ui';
// import ServiceApi from 'lib/service-api';
import { useAuth } from 'components/auth-context';
import { useT } from 'lib/i18n';

import { Outer } from './styles';

export default function MyAccount() {
  const t = useT();
  const auth = useAuth();

  return (
    <Layout title={t('customer.account.title')}>
      <Outer>
        {auth.isLoggedIn === true && (
          <div>
            <H1>Hi {auth.email}!</H1>
            <a href={auth.logoutLink}>Logout</a>
          </div>
        )}
        {auth.isLoggedIn === false && <div>You are not logged in</div>}
      </Outer>
    </Layout>
  );
}
