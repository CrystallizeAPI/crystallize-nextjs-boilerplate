import React, { useState } from 'react';

import Layout from 'components/layout';
import { Button } from 'ui';
import { loginRequest } from 'lib/rest-api';
import { AuthContext } from 'components/auth-context';

import { LoginStyle, Outer } from './styles';

const Login = ({ router }) => {
  const [userData, setUserData] = useState({ username: '', error: '' });

  async function handleSubmit(event, state) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));
    const { username } = userData;

    try {
      const response = await loginRequest({
        body: JSON.stringify({ username })
      });
      const { token, error } = response;

      if (error) {
        console.error('Login failed');
        throw error;
      }

      state.actions.login(token);
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      const { response } = error;
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      );
    }
  }

  return (
    <Layout router={router} title="Login">
      <Outer>
        <AuthContext.Consumer>
          {state =>
            state && state.isLoggedIn === true ? (
              <div>
                <h1>You are logged in</h1>
              </div>
            ) : (
              <LoginStyle>
                <h1>Login in with email</h1>
                <h4>
                  Enter your email address and we’ll send a magic login link to
                  your inbox.
                </h4>
                <form onSubmit={e => handleSubmit(e, state)}>
                  <input
                    // type="email"
                    placeholder="Enter your email"
                    required
                    onChange={event =>
                      setUserData(
                        Object.assign({}, userData, {
                          username: event.target.value
                        })
                      )
                    }
                  />
                  <Button
                    // loading={loading}
                    primary
                    type="submit"
                    value="Submit"
                  >
                    Continue
                  </Button>
                </form>
                {userData.username ? <p>{userData.username}</p> : ''}
                {userData.error ? (
                  <p>Please enter a valid email address</p>
                ) : (
                  ''
                )}
              </LoginStyle>
            )
          }
        </AuthContext.Consumer>
      </Outer>
    </Layout>
  );
};

export default Login;
