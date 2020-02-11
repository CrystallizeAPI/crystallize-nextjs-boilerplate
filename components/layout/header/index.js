import React, { useState } from 'react';
import Link from 'next/link';

import { IconLogo } from 'ui';
import { AuthContext } from 'components/auth-context';

import BurgerButton from './burger-button';
import BasketButton from './basket-button';
import { Outer, Nav, Logo, NavActions, NavList, NavListItem } from './styles';

const Header = ({ simple, menuItems }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Outer simple={simple}>
      <Link href="/">
        <a>
          <Logo>
            <IconLogo />
          </Logo>
        </a>
      </Link>
      <Nav open={navOpen}>
        <NavList>
          {menuItems.map(category => (
            <NavListItem key={category.path}>
              <Link as={category.path} href={`/${category.type}`}>
                <a onClick={() => setNavOpen(false)}>{category.name}</a>
              </Link>
            </NavListItem>
          ))}
        </NavList>
      </Nav>
      <NavActions open={navOpen}>
        <AuthContext.Consumer>
          {state =>
            state && state.isLoggedIn === true ? (
              <button type="button" onClick={state.actions.logout}>
                Logout
              </button>
            ) : (
              <Link href="/login">
                <a>Login</a>
              </Link>
            )
          }
        </AuthContext.Consumer>
      </NavActions>
      <BasketButton />
      <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
    </Outer>
  );
};

export default Header;
