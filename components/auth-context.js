import React from 'react';
import { authenticate } from 'lib/rest-api';
import { logout } from 'lib/auth';

export const AuthContext = React.createContext();

const verifyLogin = async () => {
  try {
    const response = await authenticate();
    if (!response.loggedIn) {
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

    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const isLoggedIn = await verifyLogin();
    window.isLoggedIn = isLoggedIn;
    this.setState({ isLoggedIn });
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
          actions: { logout: this.logout }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
