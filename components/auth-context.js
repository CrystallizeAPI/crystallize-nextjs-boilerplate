import React from 'react';
import cookie from 'js-cookie';
import { login, logout } from 'utils/auth';

export const AuthContext = React.createContext();

const verifyLogin = async () => {
  const token = cookie.get('token');
  const apiUrl = `http://localhost:3000/api/verify`;

  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token })
      }
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export default class AuthGate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const isLoggedIn = await verifyLogin();
    window.isLoggedIn = isLoggedIn;
    this.setState({ isLoggedIn });
  }

  login(token) {
    login({ token });
    this.setState({ isLoggedIn: true });
  }

  logout() {
    logout();
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { children } = this.props;
    const { isLoggedIn } = this.state;

    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          actions: { login: this.login, logout: this.logout }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
