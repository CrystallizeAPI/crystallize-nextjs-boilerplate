import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'components/auth-context';
import { useSettings } from 'components/settings-context';
import Link from 'components/link';
import { useT } from 'lib/i18n';

import BurgerButton from './burger-button';
import BasketButton from './basket-button';
import LocaleSwitcher from './locale-switcher';
import {
  Outer,
  Nav,
  Logo,
  NavActions,
  NavList,
  NavListItem,
  PreviewBar
} from './styles';

export default function Header({ simple, preview }) {
  const t = useT();
  const { mainNavigation } = useSettings();
  const auth = useAuth();
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      {preview && (
        <PreviewBar>
          You are in preview mode (
          <a href={'/api/preview?leave=' + encodeURIComponent(router.asPath)}>
            leave
          </a>
          )
        </PreviewBar>
      )}
      <Outer simple={simple}>
        <Link href="/">
          <a>
            <Logo>
              <img src="/static/shop-logo.svg" alt="" />
            </Logo>
          </a>
        </Link>
        <Nav open={navOpen}>
          <NavList>
            {mainNavigation.map((category) => (
              <NavListItem key={category.path}>
                <Link as={category.path} href="/[...catalogue]">
                  <a onClick={() => setNavOpen(false)}>{category.name}</a>
                </Link>
              </NavListItem>
            ))}
          </NavList>
        </Nav>
        <NavActions open={navOpen}>
          <LocaleSwitcher />
          {auth.isLoggedIn ? (
            <button type="button" onClick={auth.logout}>
              Logout
            </button>
          ) : (
            <Link href="/login">
              <a>{t('customer.login.title')}</a>
            </Link>
          )}
        </NavActions>
        {!simple && <BasketButton />}
        <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
      </Outer>
    </>
  );
}
