import React, { useState } from 'react';
import Link from 'next/link';

import { IconLogo } from 'ui';
import { useAuth } from 'components/auth-context';
import { useSettings } from 'components/settings-context';

import BurgerButton from './burger-button';
import BasketButton from './basket-button';
import { Outer, Nav, Logo, NavActions, NavList, NavListItem } from './styles';

export default function Header({ simple }) {
  const { topNavigation } = useSettings();
  const auth = useAuth();

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
          {topNavigation.map(category => (
            <NavListItem key={category.path}>
              <Link as={category.path} href="/[...catalogue]">
                <a onClick={() => setNavOpen(false)}>{category.name}</a>
              </Link>
            </NavListItem>
          ))}
        </NavList>
      </Nav>
      <NavActions open={navOpen}>
        {auth.isLoggedIn ? (
          <button type="button" onClick={auth.logout}>
            Logout
          </button>
        ) : (
          <Link href="/login">
            <a>Login</a>
          </Link>
        )}
      </NavActions>
      <BasketButton />
      <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
    </Outer>
  );
}
