import React from 'react';
import Link from 'next/link';
import { IconLogo } from 'ui';
import BasketButton from './basket-button';

import { Outer, Nav, Logo, NavActions } from './styles';

export default class Header extends React.Component {
  render() {
    const { categories, simple } = this.props;

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
          {categories &&
            categories.map(
              category =>
                category.path !== '/shipping' && (
                  <Link
                    href="/category"
                    as={category.path}
                    key={category.path}
                    prefetch
                  >
                    <a>{category.name}</a>
                  </Link>
                )
            )}
        </Nav>
        <NavActions>
          <Link href="/login" prefetch>
            <a role="button" tabIndex="0">
              Login
            </a>
          </Link>
        </NavActions>
        <BasketButton />
      </Outer>
    );
  }
}
