import React, { useState, useEffect, useContext } from 'react';

import { authenticate } from 'lib/rest-api';
import { logout } from 'lib/auth';

export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        const response = await authenticate();

        const loggedIn = !!response.loggedIn;
        setIsLoggedIn(loggedIn);
        window.isLoggedIn = loggedIn;
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
