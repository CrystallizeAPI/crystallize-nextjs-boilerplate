import React from 'react';
import Link from 'next/link';
import { IconLogo, Button } from 'ui';
import { loginUser } from 'lib/rest-api';
import { showDialog } from '@crystallize/react-dialog';
import BasketButton from './basket-button';

import { Outer, Nav, Logo, NavActions, DialogStyle } from './styles';

export default class Header extends React.Component {
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
    const { categories, simple } = this.props;
    const { loading, message, errorMessage } = this.state;

    const DialogContent = () => (
      <DialogStyle>
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
      </DialogStyle>
    );

    const showLoginDialog = async () => {
      await showDialog({
        body: <DialogContent />
      });
    };

    if (simple) {
      return (
        <Outer simple={simple}>
          <Logo>
            <IconLogo />
          </Logo>
        </Outer>
      );
    }

    return (
      <Outer simple={simple}>
        <Link href="/">
          <a>
            <Logo>
              <IconLogo />
            </Logo>
          </a>
        </Link>
        <Nav>
          {categories &&
            categories.map(
              category =>
                category.link !== '/shipping' && (
                  <Link
                    href="/category"
                    as={category.link}
                    key={category.link}
                    prefetch
                  >
                    <a>{category.name}</a>
                  </Link>
                )
            )}
        </Nav>
        <NavActions>
          <a
            role="button"
            tabIndex="0"
            onKeyPress={this.handleKeyPress}
            onClick={() => showLoginDialog()}
          >
            Login
          </a>
        </NavActions>
        <BasketButton />
      </Outer>
    );
  }
}
