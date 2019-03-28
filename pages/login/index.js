import React from 'react';
import Layout from 'components/layout';
import { Button } from 'ui';
import { loginUser } from 'lib/rest-api';
import { LoginStyle, Outer } from './styles';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
      message: null,
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { value } = this.state;
    const response = await loginUser(value);
    if (response) {
      this.setState({ message: response.message, loading: false });
    } else {
      this.setState({ errorMessage: response.message, loading: false });
    }
  }

  render() {
    const { loading, message, errorMessage } = this.state;
    const { router } = this.props;

    return (
      <Layout router={router} title="Log In">
        <Outer>
          <LoginStyle>
            <h1>Login in with email</h1>
            <h4>
              Enter your email address and we’ll send a magic login link to your
              inbox.
            </h4>
            <form onSubmit={e => this.handleSubmit(e)}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={this.handleChange}
              />
              <Button loading={loading} primary type="submit" value="Submit">
                Continue
              </Button>
            </form>
            {message ? <p>{message}</p> : ''}
            {errorMessage ? <p>Please enter a valid email address</p> : ''}
          </LoginStyle>
        </Outer>
      </Layout>
    );
  }
}

export default LoginPage;
