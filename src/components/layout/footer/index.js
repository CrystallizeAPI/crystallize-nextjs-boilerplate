import React from 'react';

import Link from 'components/link';
import LogoCrystallize from 'ui/icons/logo-crystallize';
import { useT } from 'lib/i18n';

import { useSettings } from 'components/settings-context';

import { Outer, Logo, NavList, Powered } from './styles';

export default function Footer() {
  const t = useT();
  const { mainNavigation } = useSettings();

  return (
    <Outer>
      <Link href="/">
        <a>
          <Logo>
            <img src="/static/shop-logo.svg" alt="" />
          </Logo>
        </a>
      </Link>
      <NavList>
        <h5>{t('layout.menu')}</h5>
        {mainNavigation.map((category) => (
          <li key={category.path}>
            <Link as={category.path} href="/[...catalogue]">
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </NavList>
      <Powered>
        <p>{t('layout.ecomBy')}</p>
        <a href="https://crystallize.com" aria-label="crystallize.com">
          <LogoCrystallize size={10} />
        </a>
      </Powered>
    </Outer>
  );
}
