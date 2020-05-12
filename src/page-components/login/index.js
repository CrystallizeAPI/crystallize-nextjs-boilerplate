import React, { useState } from 'react';

import Layout from 'components/layout';
import { Button } from 'ui';
import { sendMagicLink } from 'lib/rest-api';
import { useAuth } from 'components/auth-context';

import { LoginStyle, Outer } from './styles';

export default function Login() {
  const auth = useAuth();
  const [userData, setUserData] = useState({
    loading: false,
    email: '',
    message: '',
    error: '',
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
          message: message,
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
          error: response ? response.statusText : error.message,
        })
      );
    }
  }

  return (
    <Layout title="Login">
      <Outer>
        {auth.isLoggedIn ? (
          <div>
            <h1>You are logged in</h1>
          </div>
        ) : (
          <LoginStyle>
            <h1>Login in with email</h1>
            <h4>
              Enter your email address and we’ll send a magic login link to your
              inbox.
            </h4>
            <form onSubmit={handleSubmit} action="/api/loging" method="post">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={(event) =>
                  setUserData(
                    Object.assign({}, userData, {
                      email: event.target.value,
                    })
                  )
                }
              />
              <Button
                state={userData.loading ? 'loading' : null}
                type="submit"
                value="Submit"
              >
                Continue
              </Button>
            </form>
            {userData.message ? <p>{userData.message}</p> : ''}
            {userData.error ? <p>Please enter a valid email address</p> : ''}
          </LoginStyle>
        )}
      </Outer>
    </Layout>
  );
}
