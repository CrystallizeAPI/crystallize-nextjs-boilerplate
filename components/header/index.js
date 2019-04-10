import React from 'react';
import Link from 'next/link';
import { IconLogo } from 'ui';
import { AuthContext } from 'components/layout/auth-context';
import BasketButton from './basket-button';

import { Outer, Nav, Logo, NavActions } from './styles';

export default class Header extends React.Component {
  render() {
    const { topLevelFolders, simple } = this.props;

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
          {topLevelFolders &&
            topLevelFolders.map(category => (
              <Link
                href="/category"
                as={category.path}
                key={category.path}
                prefetch
              >
                <a>{category.name}</a>
              </Link>
            ))}
        </Nav>
        <NavActions>
          <AuthContext.Consumer>
            {state =>
              state && state.isLoggedIn === true ? (
                <a
                  onClick={() => state.actions.logout()}
                  role="button"
                  tabIndex="0"
                  onKeyPress={this.handleKeyPress}
                >
                  Logout
                </a>
              ) : (
                <Link href="/login" prefetch>
                  <a role="button" tabIndex="0">
                    Login
                  </a>
                </Link>
              )
            }
          </AuthContext.Consumer>
        </NavActions>
        <BasketButton />
      </Outer>
    );
  }
}
