import React from 'react';
import Link from 'next/link';

import { IconLogo } from 'ui';
import { AuthContext } from 'components/auth-context';
import { useTreeNodeAndMenuQuery } from 'lib/graph';

import BasketButton from './basket-button';
import { Outer, Nav, Logo, NavActions, NavList, NavListItem } from './styles';

const Header = ({ simple }) => {
  const { loading, error, data } = useTreeNodeAndMenuQuery();

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
};

export default Header;
