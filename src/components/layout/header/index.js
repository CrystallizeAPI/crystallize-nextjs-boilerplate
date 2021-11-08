import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSettings } from 'components/settings-context';
import IconUser from 'ui/icons/user';

import BurgerButton from './burger-button';
import BasketButton from './basket-button';
import LocaleSwitcher from './locale-switcher';
import Search from './search';
import {
  Outer,
  Nav,
  Btn,
  Logo,
  NavList,
  NavListItem,
  PreviewBar,
  IconBar
} from './styles';

export default function Header({ simple, preview }) {
  const { mainNavigation } = useSettings();
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
        <Link href="/" passHref>
          <Logo aria-label="Logo">
            <img src="/static/shop-logo.svg" alt="" width="207" height="35" />
          </Logo>
        </Link>
        <Nav open={navOpen}>
          <NavList>
            {mainNavigation?.map((category) => (
              <NavListItem key={category.path}>
                <Link href={category.path}>
                  <a onClick={() => setNavOpen(false)}>{category.name}</a>
                </Link>
              </NavListItem>
            ))}
          </NavList>
        </Nav>
        <IconBar>
          <LocaleSwitcher navOpen={navOpen} />
          <Link href="/account" passHref>
            <Btn as="a" aria-label="User area">
              <IconUser />
            </Btn>
          </Link>
          <Search />
          <BasketButton />
        </IconBar>
        <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
      </Outer>
    </>
  );
}
