import React, { useState, useEffect, useContext } from 'react';

import ServiceApi from 'lib/service-api';

export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export async function loginWithMagicLink(email) {
  const response = await ServiceApi({
    query: `
      mutation {
        user {
          sendMagicLink(
            email: "${email}"
            redirectURLAfterLogin: "${location.protocol}//${location.host}/account"
          ) {
            success
            error
          }
        }
      }
    `
  });

  const { success, error } = response.data.user.sendMagicLink;

  return {
    success,
    error
  };
}

export function AuthProvider({ children }) {
  const [status, setStatus] = useState({});

  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        const response = await ServiceApi({
          query: `
            {
              user {
                isLoggedIn
                logoutLink
                email
              }
            }
          `
        });

        const { user } = response.data;

        /**
         * Specify where the user should land after logging out
         * ?redirect=http://example.com
         */
        const redirectToPath = '/';
        const logoutLinkWithRedirect = new URL(user.logoutLink);
        logoutLinkWithRedirect.searchParams.append(
          'redirect',
          encodeURIComponent(
            `${location.protocol}//${location.host}${redirectToPath}`
          )
        );

        setStatus({
          ...user,
          logoutLink: logoutLinkWithRedirect
        });
      } catch (error) {
        console.log(error);
      }
    }
    checkIfLoggedIn();
  }, []);

  return <AuthContext.Provider value={status}>{children}</AuthContext.Provider>;
}
