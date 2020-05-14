import React from 'react';
import Link from 'next/link';

import { IconLogo } from 'ui';
import { useSettings } from 'components/settings-context';

import { Outer, Logo, NavList, Powered } from './styles';

export default function Footer() {
  const { mainNavigation } = useSettings();

  return (
    <Outer>
      <Link href="/">
        <a>
          <Logo>
            <img src="/static/frntr-logo.svg" alt="logo" />
          </Logo>
        </a>
      </Link>
      <NavList>
        <h5>Menu</h5>
        {mainNavigation.map(category => (
          <li key={category.path}>
            <Link as={category.path} href={`/${category.type}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </NavList>
      <Powered>
        <p>eCommerce by</p>
        <IconLogo size={10} />
      </Powered>
    </Outer>
  );
}
