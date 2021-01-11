import React, { useState, useEffect, useContext } from 'react';

import ServiceApi from 'lib/service-api';

export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

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

        const logoutLinkWithRedirect = new URL(user.logoutLink);
        logoutLinkWithRedirect.searchParams.append(
          'redirect',
          encodeURIComponent(location.href)
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
