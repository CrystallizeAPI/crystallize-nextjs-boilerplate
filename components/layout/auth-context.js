import React from 'react';
import { validateLogin, logoutUser } from 'lib/rest-api';

export const AuthContext = React.createContext();

const authState = {};
export function getAuthState() {
  return authState;
}

export default class AuthGate extends React.PureComponent {
  state = { isLoggedIn: false };

  async componentDidMount() {
    const response = await validateLogin(
      /* eslint-disable */
      (document.cookie.match('(^|;) *' + 'token' + '=([^;]*)') || '')[2]
      /* eslint-enable */
    );
    if (response && response.message === 'OK') {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  render() {
    const logout = async () => {
      const response = await logoutUser();
      if (response && response.message === 'OK') {
        this.setState({ isLoggedIn: false });
        window.location.reload();
      } else {
        this.setState({ isLoggedIn: true });
      }
    };

    const { isLoggedIn } = this.state;
    const { children } = this.props;

    return (
      <AuthContext.Provider value={{ isLoggedIn, actions: { logout } }}>
        {children}
      </AuthContext.Provider>
    );
  }
}
