import React, { useState, useEffect, useContext } from 'react';

import ServiceApi from 'lib/service-api';

export const AuthContext = React.createContext();

export function logout() {
  return fetch(`${process.env.NEXT_PUBLIC_SERVICE_API_URL}/api/user/logout`, {
    credentials: 'include'
  });
}

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        const response = await ServiceApi({
          query: `
            {
              user {
                isLoggedIn
              }
            }
          `
        });

        setIsLoggedIn(response.data.user.isLoggedIn);
      } catch (error) {
        console.log(error);
      }
    }
    checkIfLoggedIn();
  }, []);

  function doLogout() {
    logout();
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logout: doLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
