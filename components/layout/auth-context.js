import React from 'react';
import { logoutUser } from 'lib/rest-api';

export const AuthContext = React.createContext();

export default class AuthGate extends React.PureComponent {
  componentDidMount() {
    const { isLoggedIn } = this.props;
    window.isLoggedIn = false;
    if (isLoggedIn === true) window.isLoggedIn = true;
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
