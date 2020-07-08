import React, { useState } from 'react';

import Layout from 'components/layout';
import { H1, Button } from 'ui';
import { sendMagicLink } from 'lib/rest-api';
import { useAuth } from 'components/auth-context';
import { useT } from 'lib/i18n';

import { LoginStyle, Outer, Fields } from './styles';

export default function Login() {
  const t = useT();
  const auth = useAuth();
  const [userData, setUserData] = useState({
    loading: false,
    email: '',
    message: '',
    error: ''
  });

  async function handleSubmit(event) {
    event.preventDefault();

    setUserData(Object.assign({}, userData, { loading: true, error: '' }));
    const { email } = userData;

    try {
      const { error, message } = await sendMagicLink(email);

      if (error) {
        console.error('Login failed');
        throw error;
      }

      setUserData(
        Object.assign({}, userData, {
          loading: false,
          message: message
        })
      );
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      const { response } = error;
      setUserData(
        Object.assign({}, userData, {
          loading: false,
          error: response ? response.statusText : error.message
        })
      );
    }
  }

  return (
    <Layout title={t('customer.login.title')}>
      <Outer>
        {auth.isLoggedIn ? (
          <div>
            <H1>{t('customer.login.loggedIn')}</H1>
          </div>
        ) : (
          <LoginStyle>
            <H1>{t('customer.login.title')}</H1>

            <form onSubmit={handleSubmit} action="/api/loging" method="post">
              <h4>{t('customer.login.instructions')}</h4>
              <Fields>
                <input
                  type="email"
                  name="email"
                  placeholder={t('customer.email')}
                  required
                  onChange={(event) =>
                    setUserData(
                      Object.assign({}, userData, {
                        email: event.target.value
                      })
                    )
                  }
                />
                <Button
                  state={userData.loading ? 'loading' : null}
                  type="submit"
                  value="Submit"
                >
                  {t('customer.login.sendMagicLink')}
                </Button>
              </Fields>
            </form>
            {userData.message ? <p>{userData.message}</p> : ''}
            {userData.error ? (
              <p>{t('customer.login.emailAddressInvalid')}</p>
            ) : (
              ''
            )}
          </LoginStyle>
        )}
      </Outer>
    </Layout>
  );
}
