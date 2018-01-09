import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PropTypeCategory from 'lib/prop-types/category';
import { Outer, Nav } from './styles';

export default class Header extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypeCategory)
  };

  render() {
    const { categories } = this.props;
    return (
      <Outer>
        <Nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          {categories &&
            categories.map(category => (
              <Link href="/category" as={category.link} key={category.link}>
                <a>{category.name}</a>
              </Link>
            ))}
          <Link href="/user" prefetch>
            <a>User profile</a>
          </Link>
        </Nav>
      </Outer>
    );
  }
}
