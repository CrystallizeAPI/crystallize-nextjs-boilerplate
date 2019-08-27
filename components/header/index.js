import React from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';

import { IconLogo } from 'ui';
import { AuthContext } from 'components/auth-context';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';

import BasketButton from './basket-button';
import { Outer, Nav, Logo, NavActions, NavList, NavListItem } from './styles';

const Header = ({ simple }) => {
  if (simple) {
    return (
      <Outer simple={simple}>
        <Link href="/">
          <a>
            <Logo>
              <IconLogo />
            </Logo>
          </a>
        </Link>
      </Outer>
    );
  }

  return (
    <Query
      query={FETCH_TREE_NODE_AND_MENU}
      variables={{ language: 'en', path: '/' }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <Outer>...</Outer>;
        }

        if (error) {
          return <Outer>Could not fetch menu</Outer>;
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
              <NavList>
                {data.menu.map(category => (
                  <NavListItem key={category.path}>
                    <Link as={category.path} href="/catalog">
                      <a>{category.name}</a>
                    </Link>
                  </NavListItem>
                ))}
              </NavList>
            </Nav>
            <NavActions>
              <AuthContext.Consumer>
                {state =>
                  state && state.isLoggedIn === true ? (
                    <button type="button" onClick={state.actions.logout}>
                      Logout
                    </button>
                  ) : (
                    <Link href="/login">
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
      }}
    </Query>
  );
};

export default Header;
