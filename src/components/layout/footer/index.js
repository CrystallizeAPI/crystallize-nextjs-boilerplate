import React from 'react';

import Link from 'components/link';
import LogoShop from 'ui/icons/logo-shop';
import LogoCrystallize from 'ui/icons/logo-crystallize';

import { useSettings } from 'components/settings-context';

import { Outer, Logo, NavList, Powered } from './styles';

export default function Footer() {
  const { mainNavigation } = useSettings();

  return (
    <Outer>
      <Link href="/">
        <a>
          <Logo>
            <LogoShop />
          </Logo>
        </a>
      </Link>
      <NavList>
        <h5>Menu</h5>
        {mainNavigation.map((category) => (
          <li key={category.path}>
            <Link as={category.path} href="/[...catalogue]">
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </NavList>
      <Powered>
        <p>eCommerce by</p>
        <a href="https://crystallize.com" aria-label="crystallize.com">
          <LogoCrystallize size={10} />
        </a>
      </Powered>
    </Outer>
  );
}
