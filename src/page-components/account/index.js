import React, { useState } from 'react';

import { H1, Button } from 'ui';
import Layout from 'components/layout';
import { useAuth, loginWithMagicLink } from 'components/auth';
import { useTranslation } from 'next-i18next';

import { LoginStyle, Outer, Fields } from './styles';

export default function Login() {
  const { t } = useTranslation('customer');
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
      const { success, error } = await loginWithMagicLink(email);

      setUserData(
        Object.assign({}, userData, {
          loading: false,
          message: success
            ? 'Check your mail inbox for a login link'
            : t(`login.error_${error}`) ||
              'Could not send the login link email =('
        })
      );
    } catch (error) {
      console.error(error);

      setUserData(
        Object.assign({}, userData, {
          loading: false,
          error: 'Could not send a magic link email =('
        })
      );
    }
  }

  if (auth.isLoggedIn) {
    return (
      <PageLayout title={t('login.title')}>
        <div>
          <H1>{t('login.loggedIn')}</H1>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={t('login.title')}>
      <Outer>
        <LoginStyle>
          <H1>{t('login.title')}</H1>
          <form onSubmit={handleSubmit} action="/api/loging" method="post">
            <h4>{t('login.instructions')}</h4>
            <Fields>
              <input
                type="email"
                name="email"
                placeholder={t('email')}
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
                {t('login.sendMagicLink')}
              </Button>
            </Fields>
          </form>
          {userData.message ? <p>{userData.message}</p> : null}
          {userData.error ? <p>{t('login.emailAddressInvalid')}</p> : null}
        </LoginStyle>
      </Outer>
    </PageLayout>
  );
}

function PageLayout({ title, children }) {
  return (
    <Layout title={title}>
      <Outer>{children}</Outer>
    </Layout>
  );
}
