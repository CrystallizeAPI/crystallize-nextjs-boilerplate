import React from 'react';
import Link from 'next/link';
import { IconUser, IconLogo } from 'ui';
import BasketButton from './basket-button';

import { Outer, Nav, Logo } from './styles';

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
            categories.map(category => (
              <Link
                href="/category"
                as={category.link}
                key={category.link}
                prefetch
              >
                <a>{category.name}</a>
              </Link>
            ))}
          <Link href="/user" prefetch>
            <a>
              <IconUser />
            </a>
          </Link>
        </Nav>
        <BasketButton />
      </Outer>
    );
  }
}
