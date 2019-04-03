import React from 'react';
import { logoutUser } from 'lib/rest-api';

export const AuthContext = React.createContext();

const authState = {};
export function getAuthState() {
  return authState;
}

export default class AuthGate extends React.PureComponent {
  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn === true) {
      window.isLoggedIn = true;
    } else {
      window.isLoggedIn = false;
    }
  }

  logout = async () => {
    const response = await logoutUser();
    if (response && response.message === 'OK') {
      window.location.reload();
    }
  };

  render() {
    const { children, isLoggedIn } = this.props;

    return (
      <AuthContext.Provider
        value={{ isLoggedIn, actions: { logout: this.logout } }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
